// ==UserScript==
// @name         IbaraMarkYourCurrentLocation
// @namespace    https://twitter.com/11powder
// @version      0.1.3
// @description  マップ上にあなたの現在位置を表示します。
// @include      /^http:\/\/lisge\.com\/ib\/k\/now\/map\d{1,2}\.html$/
// @updateURL    https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraMarkYourCurrentLocation.user.js
// @downloadURL  https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraMarkYourCurrentLocation.user.js
// @grant        none
// ==/UserScript==
(async ($) => {
    "use strict";

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
            this.x = x;
            this.y = y;
        };

        fn.parse = function(locationText) {
            const m = /(^[^ ]+)区? ?([A-Z])-(\d{1,2})$/.exec(locationText);
            if (m === null) {
                throw new Error("位置情報テキストが正常に解析できませんでした。");
            }

            return new fn(m[1], m[2].charCodeAt(0) - 65, parseInt(m[3], 10) - 1);
        };


        fn.prototype.toString = function(loc) {
            return `${loc.div}区${String.fromCharCode(loc.x + 65)}-${loc.y + 1}`;
        };

        return fn;

    })();

    async function downloadLocationOfCharacter() {
        const yourEno = extractENoFromCookie();
        if (yourEno === -1) {
            return null;
        }

        const html = await $.ajax({ type: "GET", dataType: "text", url: `http://lisge.com/ib/k/now/r${yourEno}.html` });
        const virtualDocument = document.implementation.createHTMLDocument();
        return Location.parse($(html, virtualDocument).find("div.CIMGNM4").text());
    }


    const loc = await downloadLocationOfCharacter();

    const shownDivIndex = parseInt(/map(\d{1,2})\.html$/.exec(document.location.href)[1], 10);
    if (shownDivIndex !== loc.divIdx) {
        return;
    }

    $(`table[width='500']:eq(1) tr:nth-of-type(${loc.y + 1})>td:nth-of-type(${loc.x + 1})>div`).text("★").css({ "color": "yellow", "font-size": "25px", "line-height": "100%" });
})(jQuery);
