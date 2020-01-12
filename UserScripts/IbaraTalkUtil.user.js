// ==UserScript==
// @name        IbaraTalkUtil
// @namespace   https://twitter.com/11powder
// @description 交流ってスバラシティ
// @include     http://lisge.com/ib/talk.php*
// @version     1.0.8
// @updateURL   https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraTalkUtil.user.js
// @downloadURL https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraTalkUtil.user.js
// @grant       none
// ==/UserScript==
(function ($) {
    "use strict";

    var ScriptName = "IbaraTalkUtil";

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
        return "<div class='Preview'><div class='Y3 PreviewHeader'>《{PREVIEW_TYPE}プレビュー》 <a href='#'> [Help] </a></div>{INNER_HTML}</div>";
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

    var OrnamentTagMap = Object.freeze({
        "F": {
            tagName: "span",
            pattern: "F(?=\\d)"
        },
        "B": {
            tagName: "b",
            pattern: "B"
        },
        "I": {
            tagName: "i",
            pattern: "I"
        },
        "S": {
            tagName: "s",
            pattern: "S"
        },
        "U": {
            tagName: "u",
            pattern: "U"
        }
    });

    var MaxOrnamentTagNameChars = 4; //ornamentTagNamePatternにマッチする最大文字数+2
    var OrnamentTagNamePattern;
    var OrnamentTagNamePatternToCapture;
    (function() {
        var ornamentTagPatterns = [];
        for (var key in OrnamentTagMap) {
            ornamentTagPatterns.push(OrnamentTagMap[key].pattern);
        }

        var tagPattern = ornamentTagPatterns.join("|");
        OrnamentTagNamePattern          = "(?:" + tagPattern + ")[1-7]?";
        OrnamentTagNamePatternToCapture = "(" + tagPattern + ")([1-7]?)";
    })();


    //更新不要
    //
    //HTMLをシステム上正しい表現に置き換える。
    var HtmlToCorrectExpr = (function () {
        var replacer = function(match, p1, p2, p3, offset, string){
            var html = "";
            var elemType = OrnamentTagMap[p1.toUpperCase()].tagName;
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


        var reOrnamentTags = new RegExp(escapeHtml("<" + OrnamentTagNamePatternToCapture + ">(.*?)</\\1\\2>"), "ig");
        return function (html) {
            var escapedHtml = escapeHtml(html);

            var replacedHtml = lineBreakToBR(escapedHtml).replace(/&lt;br&gt;/gi, "<BR>");
            for (var i = 0; i < 2; i++) {
                replacedHtml = replacedHtml.replace(/&lt;([1-9][0-9]?D[1-9][0-9]?[0-9]?)&gt;/i, "<span class='DX'>【 <b>$1</b>：[賽の目] 】</span>");
            }
            return replaceLoop(replacedHtml, reOrnamentTags, replacer);
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

    var TalkUtilHelp = (function(){
        var html = "<div class='SE3'><table cellpadding='0' cellspacing='0' class='SE0' style='width:900px;'><tr valign='TOP'>" +
                            "<td width='70'><img src='p/iba_icon.png' class='RE2' alt='RE'></td>" +
                            "<td class='F3'>" +
                                "<a><span class='Y4'>" + ScriptName + "の機能・使い方</span></a><br>" +
                                    "<div style='margin:10px;'>" +
                                    "・入力した発言内容を自動的に解析してプレビューを表示します。<br>" +
                                    "・<b class='O3'>Ctrl+Shift+Enterキー</b>を押すと、送信ボタンを押したのと同様にその発言内容を送信します。<br>" +
                                    "・<b class='O3'>Tab</b>キーを押すと、欠けている装飾閉じタグ(<b class='Y3'>" + escapeHtml("</B>, </f4>") + "</b>など)を自動的に補完します。<br>" +
                                    "・タグ名(<b class='Y3'>i4, S</b>など)を入力してからTabキーを押すと、指定の装飾タグを自動入力します。<br>" +
                                    "　<span class='P3'>例： f5 ⇒ " + escapeHtml("<f5></f5>") + "</span><br>" +
                                    "<br>　(hint) 入力自動補完に対応しているタグ名の一覧（小文字可、半角のみ）：<br><b class='Y3'>　" +
                                         escapeHtml("F[1-7] B B[1-7] I I[1-7] S S[1-7] U U[1-7]") +
                                    "</b>" +
                                    "</div>" +
                            "</td>" +
                        "</tr></table></div>";
        var $container = $("<div></div>").html(html).css({ "position": "absolute", "z-index": 2 });

        var getOnClickHandler = function(_this) {
            return function() {
                if (_this.attachedElement === this) {
                    $container.hide();
                    _this.attachedElement = null;
                }
                else {
                    $container.insertAfter(this).show();
                    _this.attachedElement = this;
                }
            };
        };

        var fn = function() {
            this.attachedElement = null;
            this.onClickHandler = getOnClickHandler(this);
        };

        fn.prototype.Enable = function(elem, selector) {
            if (selector) {
                $(elem).on("click", selector, this.onClickHandler);
            } else {
                $(elem).on("click", this.onClickHandler);
            }
            var _this = this;
            $container.on("click", function() {
                $container.hide();
                _this.attachedElement = null;
            });
        };

        return fn;
    })();

    var EnableSayPreview = (function (){
        //format: "ICON_URL", "SENDER_NAME", "SAY_HTML", "ANKER_INFO", "MAX_CHARS_NUM", "CHARS_NUM"
        var template = "<div class='{CNT_CLASS_NAME}'><table cellpadding='0' cellspacing='0' class='SE0' style='width:{WIDTH_PX};'><tr valign='TOP'>" +
                           "<td width='70'><img src='{ICON_URL}' class='RE2' alt='RE'></td>" +
                           "<td class='F3'>" +
                               "{RESPONSE}" +
                               "<a href='#'><span class='Y3'>{SENDER_NAME}({SENDER_ENO})</span></a><br>{SAY_HTML}" +
                           "</td>" +
                       "</tr></table></div>";
        function GetSayTemplate(senderEno, isResponse, rows) {
            var className;
            var responseHtml;
            if (isResponse) {
                className = "SE4";
                responseHtml = "<a class='F1' href='#'>＞返信 <br></a>";
            } else {
                className = "SE3";
                responseHtml = "";
            }

            var widthPx = "900px";
            if (rows > 1) {
                widthPx = "440px";
            }

            var inner = format(template, {
                "RESPONSE": responseHtml,
                "WIDTH_PX": widthPx,
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
        function SayPreviewEvent(evt) {
            var $parent = $(evt.currentTarget).parent();
            var rows = $("#PLSBN3").text().includes("２列") ? 1 : 2;

            var template = GetSayTemplate(myEno, IsResponseForm($parent), rows);

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

            $("form[name='say']").closest("td").css({ "overflow": "visible", "max-width": "700px" });
            $("form[name='sch']").closest("td").css("vertical-align", "top");

            var $says = $(".SE3,.SE4");
            if ($says.length > 0) {
                $says.css({ "overflow": "visible", "max-width": "calc(100% - 20px)" });
            }
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

        return function (elem, selector, buttonValueFilter){
            var btnSelector = "input[type='submit']" + (buttonValueFilter ? "[value='" + buttonValueFilter + "']" : "");
            var $btns;
            if (selector) {
                $btns = $(elem).find(selector).closest("form").find(btnSelector);
            } else {
                $btns = $(elem).closest("form").find(btnSelector);
            }
            // $btns.after("(Ctrl+Shift+Enter)");

            if (selector) {
                $(elem).on("keydown", selector, { but:btnSelector }, KeydownEvent_FormSubmittion);
            } else {
                $(elem).on("keydown", { but:btnSelector }, KeydownEvent_FormSubmittion);
            }
        };
    })();

    var EnableTagAutocompletion = (function(){

        var _reTagStart  = new RegExp("<(" + OrnamentTagNamePattern + ")>", "gi");
        var _reTagEnd    = new RegExp("</(" + OrnamentTagNamePattern + ")>", "gi");
        var _rePossibleTagStartFoot  = new RegExp("<?(" + OrnamentTagNamePattern + ")>?$", "i");
        var _reTagEndFoot    = new RegExp("</(" + OrnamentTagNamePattern + ")>$", "i");
        var _reTagHead = new RegExp("<[^>]{0," + MaxOrnamentTagNameChars + "}?$");
        var _reTagFoot = new RegExp("^[^<]{0," + MaxOrnamentTagNameChars + "}?>");

        function FindUnclosedTags(valBefore, valAfter){
            var tagStarts = valBefore.match(_reTagStart);
            if (!tagStarts) {
                return [];
            }
            var tagStartNames = tagStarts.map(function(val, i) {
                return val.slice(1, val.length - 1);
            });

            var tagEnds = (valBefore + valAfter).match(_reTagEnd);
            if (!tagEnds) {
                return tagStartNames;
            }
            var tagEndNames = tagEnds.map(function(val, i) {
                return val.slice(2, val.length - 1);
            });

            //tagStartNames配列から「既に閉じられているタグ」を取り除く。
            for (var ei = tagEndNames.length - 1; ei >= 0; ei--) {
                for (var si = tagStartNames.length - 1; si >= 0; si--) {
                    if (tagEndNames[ei] === tagStartNames[si]) {
                        tagStartNames.splice(si, 1);
                        break;
                    }
                }
            }

            //tagStartNames配列に残っている要素が「閉じられていない開始タグ」
            return tagStartNames;
        }

        function InsertOrnamentTags(elem) {
            if (elem.selectionStart !== elem.selectionEnd) {
                //文字列選択中
                return false;
            }

            var sStart = elem.selectionStart;
            var valBefore = elem.value.slice(0, sStart);
            var valAfter = elem.value.slice(sStart);

            var tagMatch = _rePossibleTagStartFoot.exec(valBefore);
            if (!tagMatch) {
                return false;
            }

            var MatchedAsCloseTag = _reTagEndFoot.test(valBefore);
            if (MatchedAsCloseTag) {
                return false;
            }

            var tagIsCompleted = /^<[^<>]+?>$/.test(tagMatch[0]);
            if (tagIsCompleted) {
                //<F1>のように<と>抜けがなく完璧。このメソッドで処理することはない。後続のInsertLastUnclosedTagEndに処理させることになる。
                return false;
            }
            if (_reTagHead.test(valBefore) && _reTagFoot.test(valAfter)) {
                //この記述で<i|7>のように、タグの途中にカーソルが合わされていて、カーソルより手前が構文として成立する状況を処理する。
                return false;
            }

            var tagToInsert = "<" + tagMatch[1] + "></" + tagMatch[1] + ">";
            elem.value = valBefore.slice(0, -tagMatch[0].length) + tagToInsert + valAfter;
            var newSelection = sStart - tagMatch[0].length + tagMatch[1].length + 2;
            elem.setSelectionRange(newSelection, newSelection);

            return true;
        }

        //入れ違いタグ問題などはあるが、"公式の仕様通り"なので対応する必要がない
        function InsertLastUnclosedTagEnd(elem) {
            if (elem.selectionStart !== elem.selectionEnd) {
                //文字列選択中
                return false;
            }

            var sStart = elem.selectionStart;
            var valBefore = elem.value.slice(0, sStart);
            var valAfter = elem.value.slice(sStart);

            var unclosedTags = FindUnclosedTags(valBefore, valAfter);
            if (unclosedTags.length === 0) {
                return false;
            }

            var closeTag = "</" + unclosedTags[unclosedTags.length - 1] + ">";
            elem.value = valBefore + closeTag + valAfter;
            elem.setSelectionRange(sStart, sStart + closeTag.length);

            return true;
        }

        function CompleteLastUnclosedTagEnd(elem) {
            if (elem.selectionStart <= 0 || elem.selectionStart !== elem.selectionEnd) {
                //カーソルが最初にあるか、文字列選択中
                return false;
            }

            var sStart = elem.selectionStart;
            var valBefore = elem.value.slice(0, sStart);
            var valAfter = elem.value.slice(sStart);

            var lastChar = valBefore[sStart - 1];
            if (lastChar !== "<") {
                return false;
            }

            var unclosedTags = FindUnclosedTags(valBefore, valAfter);
            if (unclosedTags.length === 0) {
                return false;
            }
            var closeTagVal =  "/" + unclosedTags[unclosedTags.length - 1] + ">";
            elem.value = valBefore + closeTagVal + valAfter;
            elem.setSelectionRange(sStart + 1, sStart + closeTagVal.length);

            return true;
        }

        function KeydownEvent_AutoCompleteTag(e) {
            if (e.which === 9 /*"\t"*/ ) {
                //ユーザーを混乱させないためタブキー押下は一律でpreventDefaultしておく。
                e.preventDefault();

                if (this.selectionStart !== this.selectionEnd) {
                    //文字列選択中
                    this.setSelectionRange(this.selectionEnd, this.selectionEnd);
                    return;
                }

                if (InsertOrnamentTags(this)) {
                    return;
                }

                InsertLastUnclosedTagEnd(this);

            } else if (e.key === "/") {
                if (CompleteLastUnclosedTagEnd(this)) {
                    e.preventDefault();
                }
            } else {

            }
        }

        return function (elem, selector) {
            if (selector) {
                $(elem).on("keydown", selector, KeydownEvent_AutoCompleteTag);
            } else {
                $(elem).on("keydown", KeydownEvent_AutoCompleteTag);
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
    var help = new TalkUtilHelp();
    help.Enable(document.body, ".PreviewHeader");
})(jQuery);
