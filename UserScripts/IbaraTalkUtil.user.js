// ==UserScript==
// @name        IbaraTalkUtil
// @namespace   pejuta
// @description 交流ってスバラシティ
// @include     http://lisge.com/ib/talk.php*
// @version     1.0.4
// @grant       none;
// ==/UserScript==
//
// リアルタイム交流ページに以下の機能を追加します。
// ・動的プレビュー
// ・tabキー押下時などに綴じタグの自動補完
// ・BRタグの自動置換
// ・Ctrl+Shift+Enterによる発言送信
(function ($) {
    //アイコン一覧の有無で交流ページかどうかを判断する
    if(!document.getElementById("CL1")) return;

    var escapeHtml = (function () {
        var escapeMap = {
            '&': '&amp;',
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;'
        };
        var escapeReg = '[';
        var reg;
        for (var p in escapeMap) {
            if (escapeMap.hasOwnProperty(p)) {
                escapeReg += p;
            }
        }
        escapeReg += ']';
        reg = new RegExp(escapeReg, 'g');
        return function (str) {
            str = str ? "" + str : "";
            return str.replace(reg, function (match) {
                return escapeMap[match];
            });
        };
    })();

    var lineBreakToBR = function (html) {
        if (!html) return html;
        return html.replace(/(?:\r\n|\r|\n)/g, "<BR>");
    };

    var brToLineBreak = function (html) {
        if (!html) return html;
        return html.replace(/<br>/gi, "\r\n");
    };

    //arg: { "label1": "value1", ... }
    //ex: "foo{hoge}".format({"hoge": ",bar"}) => "foo,bar"
    function format(template, arg) {
        var text = template.toString();
        for (var label in arg) {
            if (arg[label] !== undefined && arg[label] !== null) {
                text = text.replace(new RegExp("\{" + label + "\}", "g"), arg[label].toString());
            }
        }
        return text;
    }

    //マッチしなくなるまで置換を繰り返す
    function replaceLoop(text, re, replacer) {
        var str = text.toString();
        for (; ;) {
            if (!re.test(str)) {
                return str;
            }
            str = str.replace(re, replacer);
        }
    }

    var Delayer = (function () {
        var f = function () {
            this.ID = 0;
        };

        f.prototype.setDelay = function (func, delay_ms /*, args[]*/) {
            if (this.ID) {
                clearTimeout(this.ID);
            }
            if (arguments.length >= 3) {
                var args = Array.prototype.slice.call(arguments, 2);
                this.ID = setTimeout(function (args) {
                    func.apply(null, args);
                    this.ID = 0;
                }, delay_ms, args);
            } else {
                this.ID = setTimeout(function () {
                    func.prototype.call(null);
                    this.ID = 0;
                }, delay_ms);
            }
        };

        return f;
    })();

    //更新不要
    //
    function AddStyle(style) {
        $("head").append("<style type='text/css'>" + style + "</style>");
    }

    function ibaraSpecialTrim(str) {
        return /^[ \r\n\t]*([\s\S]*?)\s*$/.exec(str)[1];
    }

    //更新不要
    //
    //CookieからENO文字列を読み取る。読み取りに失敗した場合はnull
    function ReadENoTextByCookie() {
        return (/IBR_KEY=.+?_(\d+)(?:;|$)/.exec(document.cookie) || [])[1] || null;
    }

    /*プレビュー関連メソッド*/
    //format: "{PREVIEW_TYPE}", "CHARS_NUM","MAX_CHARS_NUM" "INNER_HTML"
    function GetPreviewContainerTemplate() {
        return "<div class='Preview'><div class='Y3'>《{PREVIEW_TYPE}プレビュー》</div>{INNER_HTML}</div>";
    }

    //更新不要
    //
    //formatOption: {CharsNum:"", MaxCharsNum:"", PreviewType:"", Values:"" }
    //Valuesのみ省略可能。
    function FormatPreviewHtml(templateHtml, formatOption) {
        var tempVals = formatOption.Values　 || {};
        var formatValues = $.extend(tempVals, {
            "CHARS_NUM": formatOption.CharsNum,
            "MAX_CHARS_NUM": formatOption.MaxCharsNum,
            "PREVIEW_TYPE": formatOption.PreviewType
        });
        return format(templateHtml, formatValues);
    }

    //更新不要
    //
    function InsertPreview($insertAfterThis, parentBlockStyle) {
        var $preview = $insertAfterThis.next(".PreviewParentBlock");
        if ($preview.length === 0) {
            $preview = $("<div class='PreviewParentBlock' name='Preview' />").addClass(parentBlockStyle).insertAfter($insertAfterThis);
        }

        return $preview;
    }

    //更新不要
    //
    function AppendPreview($appendThis, parentBlockStyle) {
        var $preview = $appendThis.find(".PreviewParentBlock");
        if ($preview.length === 0) {
            $preview = $("<div class='PreviewParentBlock' name='Preview' />").addClass(parentBlockStyle).appendTo($appendThis);
        }

        return $preview;
    }

    //更新不要
    //
    //HTMLをシステム上正しい表現に置き換える。
    var HtmlToCorrectExpr = (function () {
        var replacer = function(match, p1, p2, p3, offset, string){
            var html = "",
                elemType;
            switch(p1.toUpperCase()){
                case "F":
                    elemType = "span";
                    break;
                case "I":
                case "S":
                case "U":
                    elemType = p1;
                    break;
            }
            if (p2) {
                return format("<{TYPE} class='F{SIZE}'>{VALUE}</{TYPE}>", {
                    "TYPE": elemType,
                    "SIZE": p2,
                    "VALUE": p3
                });
            } else {
                return format("<{TYPE}>{VALUE}</{TYPE}>", {
                    "TYPE": elemType,
                    "VALUE": p3
                });
            }
        };

        return function (html) {
            var escapedHtml = escapeHtml(html);
            var re_Tag_CharDeco = new RegExp(escapeHtml("<(F(?=\\d)|I|S|U)([1-7]?)>(.*?)</\\1\\2>"), "ig");

            var replacedHtml = lineBreakToBR(escapedHtml).replace(/&lt;br&gt;/gi, "<BR>");
            for (var i = 0; i < 2; i++) {
                replacedHtml = replacedHtml.replace(/&lt;([1-9][0-9]?D[1-9][0-9]?[0-9]?)&gt;/i, "<span class='DX'>【 <b>$1</b>：[賽の目] 】</span>");
            }
            return replaceLoop(replacedHtml, re_Tag_CharDeco, replacer);
        };
    })();



    //発言/メッセージプレビューの更新
    //args: { $InsertAfter, $Text, $Name, $Icon, Template, MaxChars, IconUrlArray, StyleName }
    function UpdateSayPreview(args) {
        var previewType = "発言";
        var $preview = InsertPreview(args.$InsertAfter, args.StyleName);

        var sayHtml = ibaraSpecialTrim(args.$Text.val());
        if (sayHtml.length === 0) {
            $preview.css("display", "none");
            return;
        }

        var charsNum = sayHtml.length;
        if (charsNum > args.MaxChars) {
            $preview.html(
                FormatPreviewHtml(
                    format(GetPreviewContainerTemplate(), { "INNER_HTML": "<div class='SE2'>【ERROR】書き込み内容は{MAX_CHARS_NUM}文字以内です！（現在{CHARS_NUM}文字）</div>" }),
                    { CharsNum: charsNum, MaxCharsNum: args.MaxChars, PreviewType: previewType, }
                )
            ).css("display", "block");
            return;
        }

        var senderName = ibaraSpecialTrim(args.$Name.val());
        if (senderName.length > 8) {
            $preview.html(
                FormatPreviewHtml(
                    format(GetPreviewContainerTemplate(), { "INNER_HTML": "<div class='Preview'><div class='SE2'>【ERROR】発言者名は{MAX_CHARS_NUM}文字以内です！（現在{CHARS_NUM}文字）</div></div>" }),
                    { CharsNum: senderName.length, MaxCharsNum: 8, PreviewType: previewType, }
                )
            ).css("display", "block");
            return;
        }

        var escSenderName = escapeHtml(senderName);

        var nameMatch = /^@([\s\S]*?)@/.exec(sayHtml);
        if (nameMatch) {
            // @@ は名前を変更しない
            if (nameMatch[1]) {
                escSenderName = lineBreakToBR(escapeHtml(nameMatch[1]));
            }
            sayHtml = sayHtml.substring(nameMatch[0].length);
        }

        var sayHtml_Corrected = HtmlToCorrectExpr(sayHtml);
        var strIconIndex = args.$Icon.val();
        var iconUrl = "p/nii.png";
        if (/^\d+$/.test(strIconIndex)) {
            iconUrl = args.IconUrlArray[parseInt(strIconIndex, 10)];
        }

        var previewHtml = FormatPreviewHtml(args.Template, {
            CharsNum: charsNum,
            MaxCharsNum: args.MaxChars,
            PreviewType: previewType,
            Values: {
                "ICON_URL": iconUrl,
                "SENDER_NAME": escSenderName,
                "SAY_HTML": sayHtml_Corrected,
            }
        });

        $preview.html(previewHtml).css("display", "block");
    }



    var EnableSayPreview = (function (){
        //format: "ICON_URL", "SENDER_NAME", "SAY_HTML", "ANKER_INFO", "MAX_CHARS_NUM", "CHARS_NUM"
        function GetSayTemplate(senderEno, isResponse) {
            var inner = "<div class='{CNT_CLASS_NAME}'><table cellpadding='0' cellspacing='0' class='SE0' style='width:440px;'><tr valign='TOP'>" +
                            "<td width='70'><img src='{ICON_URL}' class='RE2' alt='RE'></td>" +
                            "<td class='F3'>" +
                                "{RESPONSE}" +
                                "<a href='#'><span class='Y3'>{SENDER_NAME}({SENDER_ENO})</span></a><br>{SAY_HTML}" +
                            "</td>" +
                        "</tr></table></div>";

            var className;
            if (isResponse) {
                className = "SE4";
                inner = format(inner, { "RESPONSE": "<a href='#' class='F1'>＞{ANKER_INFO} <br></a>" });
            } else {
                className = "SE3";
                inner = format(inner, { "RESPONSE": "" });
            }

            inner = format(inner, {
                "CNT_CLASS_NAME": className,
                "SENDER_ENO": senderEno,
            });

            return format(GetPreviewContainerTemplate(), {
                "INNER_HTML": inner,
            });
        }

        function ExtractOrLoadIconUrlArray() {
            return $("#CL1 img.IC").map(function (index, element) {
                return element.getAttribute("src");
            }).toArray();
        }

        function IsResponseForm($form) {
            if ($form.attr("name") !== "say") {
                return true;
            }
            return false;
        }

        var _iconUrlArray = ExtractOrLoadIconUrlArray();
        var myEno = ReadENoTextByCookie() || "";
        var _template_say = GetSayTemplate(myEno);
        var _templete_res = GetSayTemplate(myEno, true);
        function SayPreviewEvent(evt) {
            var $parent = $(evt.currentTarget).parent();
            var template = "";
            if (IsResponseForm($parent)) {
                template = format(_templete_res, { "ANKER_INFO": "返信" });
            } else {
                template = _template_say;
            }

            var sayArgs = {
                $InsertAfter: $parent,
                $Text: $parent.find(_sayText_Selector),
                $Name: $parent.find(_sayName_Selector),
                $Icon: $parent.find(_sayIcon_Selector),
                Template: template,
                MaxChars: 400,
                IconUrlArray: _iconUrlArray,
                StyleName: "Say"
            };
            UpdateSayPreview(sayArgs);
        }

        var _sayText_Selector = "textarea[name^='dt_mes']";
        var _sayName_Selector = "input[name^='dt_ai']";
        var _sayIcon_Selector = "select[name^='dt_ic']";
        function RegisterFormEvent(previewDelay_ms) {
            var delayer = new Delayer();
            var callback = function (evt) {
                delayer.setDelay(SayPreviewEvent, previewDelay_ms, evt);
            };

            $(document.body)
                .on("keyup input", _sayText_Selector, callback)
                .on("keyup input",_sayName_Selector, callback)
                .on("change", _sayIcon_Selector, callback);
        }

        return RegisterFormEvent;
    })();

    var EnableEasyFormSubmittion = (function(){
         function KeydownEvent_FormSubmittion(e){
            if (e.which === 13 /*"enter"*/ && e.ctrlKey && e.shiftKey) {
                //フォーム送信を発火
                e.preventDefault();
                $(this).closest("form").find(e.data.but).first().click();
            }
        }

        return function (elem, selector, butValueFilter){
            var $buts,
                butSelector = "input[type='submit']" + (butValueFilter ? "[value='" + butValueFilter + "']" : "");

            if (selector) {
                $buts = $(elem).find(selector).closest("form").find(butSelector);
            } else {
                $buts = $(elem).closest("form").find(butSelector);
            }
            // $buts.after("(Ctrl+Shift+Enter)");

            if (selector) {
                $(elem).on("keydown", selector, { but:butSelector }, KeydownEvent_FormSubmittion);
            } else {
                $(elem).on("keydown", { but:butSelector }, KeydownEvent_FormSubmittion);
            }
        };
    })();

    var EnableTagAutocompletion = (function(){
        var re_ornamentTagStart_Footer = /<?((?:F(?=\d)|I|S|U)[1-7]?)>?$/i;
        var re_ornamentTagEnd_Footer = /<?\/((?:F(?=\d)|I|S|U)[1-7]?)>?$/i;
        var re_ornamentTagStart = /<((?:F(?=\d)|I|S|U)[1-7]?)>/gi;
        var re_ornamentTagEnd = /<\/((?:F(?=\d)|I|S|U)[1-7]?)>/gi;
        var re_ornamentTagStart_ForAnalyze = /<(\D\d?)>/;
        var re_ornamentTagEnd_ForAnalyze = /<\/(\D\d?)>/;

        function FindUnclosedTagName(val_before, val_after){
            var starts = val_before.match(re_ornamentTagStart);
            if (!starts) {
                return null;
            }
            var ends = (val_before + val_after).match(re_ornamentTagEnd);
            if (ends) {
                for (var ei = ends.length - 1; ei >= 0; ei--) {
                    var re_targetStart = new RegExp("<" + re_ornamentTagEnd_ForAnalyze.exec(ends[ei])[1] + ">", "i");
                    for (var si = starts.length - 1; si >= 0; si--) {
                        if (re_targetStart.test(starts[si])) {
                            starts.splice(si, 1);
                            break;
                        }
                    }
                    // GM_log("<" + re_ornamentTagEnd_ForAnalyze.exec(ends[ei])[1] + ">" + " has removed. \r\n" + JSON.stringify(starts));
                }
                if (starts.length === 0) {
                    return null;
                }
            }
            return (re_ornamentTagStart_ForAnalyze.exec(starts[starts.length-1]))[1];
        }

        return function (elem, selector) {

            if (selector) {
                $(elem).on("keydown", selector, KeydownEvent_AutoCompleteTag);
            } else {
                $(elem).on("keydown", KeydownEvent_AutoCompleteTag);
            }


            function KeydownEvent_AutoCompleteTag(e) {

                // GM_log("keydownEvent: " + e.which);

                var s = this.selectionStart;
                var val = this.value.slice(0, s);
                var val_after = this.value.slice(s);
                if (e.which === 9 /*"\t"*/ ) {
                    //ユーザーを混乱させないためタブキー押下は一律でpreventDefaultしておく。
                    e.preventDefault();

                    if (this.selectionStart !== this.selectionEnd) {
                        //文字列選択中
                        this.setSelectionRange(this.selectionEnd, this.selectionEnd);
                        return;
                    }

                    //タブキー押下時、閉じタグを補完する
                    var lastChars = val.slice((s >= 4 ? s - 4 : 0), s);
                    // GM_log("tabed: "+ lastChars);

                    var newVal, newSelectPosBegin, newSelectPosStartEnd;
                    var unclosedTagName;
                    var m = re_ornamentTagStart_Footer.exec(lastChars);
                    if (m　&& !(re_ornamentTagEnd_Footer.test(lastChars))) {
                        if (re_ornamentTagStart_ForAnalyze.test(m[0])) {
                            //タグ記述が<>抜けなく完璧。既に閉じタグが記述されてはいないかチェック
                            var unclosedTagName = FindUnclosedTagName(val, val_after);
                            if (!unclosedTagName || unclosedTagName !== m[1]) {
                                //どうやら既に閉じられていたようだ。
                                return;
                            }
                        } else if (re_ornamentTagStart_ForAnalyze.test(lastChars.slice(-3) + val_after.slice(0, 2))) {
                            //この記述で<i 7>とか、<i7 >とかを弾く。
                            return;
                        }
                        newVal = val.slice(0, -(lastChars.length)) + lastChars.replace(re_ornamentTagStart_Footer, "<$1></$1>") + val_after;
                        newSelectPosBegin = newSelectPosStartEnd = s - m[0].length + m[1].length + 2;
                    } else {
                        var unclosedTagName = FindUnclosedTagName(val, val_after);
                        if (!unclosedTagName) {
                            return;
                        }
                        var closeTag = "</" + unclosedTagName + ">";
                        newVal = val + closeTag + val_after;
                        newSelectPosBegin = s;
                        newSelectPosStartEnd = s + closeTag.length;
                    }

                    this.value = newVal;
                    this.setSelectionRange(newSelectPosBegin, newSelectPosStartEnd);

                } else if (e.key === "/") {

                    if (this.selectionStart !== this.selectionEnd) {
                        //文字列選択中
                        return;
                    }

                    //閉じタグの種別判別と自動補完
                    var lastChar = val.slice(s - 1, s);
                    if (lastChar !== "<") {
                        return;
                    }

                    var unclosedTagName = FindUnclosedTagName(val, val_after);
                    if(!unclosedTagName){
                        return;
                    }
                    var closeTagVal =  "/" + unclosedTagName + ">";
                    this.value = val + closeTagVal + val_after;
                    this.setSelectionRange(s + 1, s + closeTagVal.length);

                    e.preventDefault();
                } else {
                    return;
                }
            }
        };
    })();


    function AutoBRTagsToLineBreaks(elem, selector) {
        function handler (e) {
            $(e.currentTarget).val(brToLineBreak($(e.currentTarget).val()));
        }

        if (selector) {
            $(elem).on("keyup input", selector, handler);
        } else {
            $(elem).on("keyup input", handler);
        }
    }

    AutoBRTagsToLineBreaks(document.body, "textarea[name^='dt_mes']");
    EnableEasyFormSubmittion(document.body, "textarea[name^='dt_mes']", "発言する");
    EnableTagAutocompletion(document.body, "textarea[name^='dt_mes']");
    EnableSayPreview(200);
})(jQuery);