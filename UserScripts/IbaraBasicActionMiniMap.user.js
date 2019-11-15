// ==UserScript==
// @name         IbaraBasicActionMiniMap
// @namespace    pejuta
// @version      0.1.7.1
// @description  マップ上にあなたの現在位置を表示します。
// @author       pejuta
// @include      /^http:\/\/lisge\.com\/ib\/act_main\.php.*?$/
// @grant        none
// ==/UserScript==
"use strict";

(async ($) => {

    const htmlFragUrl = "https://pejuta.github.io/IbaraUtilities/UserScripts/src/minimap.html";

    function extractENoFromCookie() {
        const m = /IBR_KEY=.+?_(\d+)(?:;|$)/.exec(document.cookie);
        if (m === null) {
            return -1;
        }
        return parseInt(m[1], 10);
    }

    const Location = (() => {

        const getDivisionIndexByName = (function () {
            const ht = {
                "チナミ": 1,
                "ヒノデ": 2,
                "マガサ": 3,
                "ミナト": 4,
                "カミセイ": 5,
                "ウシ": 6,
                "リュウジン": 7,
                "アライ": 8,
                "オオキタ": 9,
                "カスミ": 10,
                "コヌマ": 11,
                "タニモリ": 12,
                "シモヨメ": 13,
                "ウラド": 14,
                "ツクナミ": 15,
                "マシカ": 16,
            };
            return function (name) {
                return ht[name] || -1;
            };
        })();


        const fn = function(div, x, y) {
            this.div = div;
            this.divIdx = getDivisionIndexByName(div);
            this.x = x.charCodeAt(0) - 65;
            this.y = parseInt(y, 10) - 1;
        };

        fn.parse = function(locationText) {
            const m = /(^.+)区([A-Z])-(\d{1,2})$/.exec(locationText);
            if (m === null) {
                throw new Error("位置情報テキストが正常に解析できませんでした。");
            }

            return new fn(m[1], m[2], m[3]);
        };


        fn.prototype.toString = function(loc) {
            return `${loc.div}区${String.fromCharCode(loc.x + 65)}-${loc.y + 1}`;
        };

        return fn;

    })();

    async function selectLocationOfCharacter() {
        const taxiLocMatch = /^(.+?)区 ([A-Z])(\d{1,2})/.exec($("select[name='dt_taxi']>option:selected").text());

        if (taxiLocMatch !== null) {
            return new Location(taxiLocMatch[1], taxiLocMatch[2], taxiLocMatch[3]);
        }
        return await downloadLocationOfCharacter();
    }

    async function downloadLocationOfCharacter() {
        const yourEno = extractENoFromCookie();
        if (yourEno === -1) {
            return null;
        }

        const html = await $.ajax({ type: "GET", dataType: "text", url: `http://lisge.com/ib/k/now/r${yourEno}.html` });
        const virtualDocument = document.implementation.createHTMLDocument();
        return Location.parse($(html, virtualDocument).find("div.CIMGNM4").text());
    }

    async function updateMiniMap() {
        const loc = await selectLocationOfCharacter();
        if (loc === null) {
            return;
        }

        $("#MiniMap").css({
                left: (150 - 25 * loc.x - 500 * ((loc.divIdx - 1) % 4)) + "px",
                top: (150 - 25 * loc.y - 500 * ((loc.divIdx - 1) >> 2)) + "px"
            });
    }

    function updateCourse() {
        const $moves = $("#IDO > select[name^=dt_ido]");
        const mm = 5; //$moves.length

        const $course = $(".MapCourse").removeClass("Paw Top Right Bottom Left Final");
        const $icons = $(".MapCourseIco").removeClass("Pause Step Taxi");

        if (Math.random() * 32 < 1) {
            $(".MapCourse").addClass("Paw");
        }

        for (let mi = 0; mi < mm; mi++) {
            switch ($moves.get(mi).value) {
                case "0":
                    $icons.eq(mi).addClass("Pause");
                    break;
                case "1":
                    $icons.eq(mi).addClass("Step");
                    $course.eq(mi).addClass("Top");
                    break;
                case "2":
                    $icons.eq(mi).addClass("Step");
                    $course.eq(mi).addClass("Right");
                    break;
                case "3":
                    $icons.eq(mi).addClass("Step");
                    $course.eq(mi).addClass("Bottom");
                    break;
                case "4":
                    $icons.eq(mi).addClass("Step");
                    $course.eq(mi).addClass("Left");
                    break;
                case "5":
                    $icons.eq(mi).addClass("Taxi");
                    $course.eq(mi).addClass("Final");
                    mi = mm;
                    break;
            }
        }
    }

    $("#IDO").after(await $.ajax({
            type: "GET",
            dataType: "text",
            url: htmlFragUrl,
        }));

    $("select[name='dt_taxi']").on("change", updateMiniMap);
    $("select[name^=dt_ido]").on("change", updateCourse);
    await updateMiniMap();
    updateCourse();

})(jQuery);


