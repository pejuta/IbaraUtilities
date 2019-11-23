// ==UserScript==
// @name         IbaraMapOverlayer
// @namespace    https://twitter.com/11powder
// @version      0.1.1
// @description  ハザママップにイバラシティマップをオーバーレイして表示する
// @include      /^http:\/\/lisge\.com\/ib\/k\/now\/map\d{1,2}\.html$/
// @updateURL    https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraMapOverlayer.user.js
// @downloadURL  https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraMapOverlayer.user.js
// @grant        none
// ==/UserScript==
(($) => {
    "use strict";

    async function overlayIbaracityMap () {
        const virDoc = document.implementation.createHTMLDocument();
        const idx = parseInt(/map(\d{1,2})\.html$/.exec(document.location.href)[1], 10);
        const html = await $.ajax({ type: "GET", dataType: "text", url: "http://lisge.com/ib/map.php?m=" + idx });
        const mdfHtml = html.replace(/href=("|')/gi, "href=$1../../")
        .replace(/src=("|')/gi, "src=$1../../")
        .replace(/url\(("|')/gi, "url($1../../");
        const $table = $(mdfHtml, virDoc).find("table[width='500']");
        $table.find("img[src$='p/mapz0_off.png']")
            .each((i, e) => e.setAttribute("title", e.getAttribute("alt")))
            .closest("td").css({ "position": "relative" })
            .children("div.MP25").css({ "border": "solid 1px yellow", "position": "absolute", "top": "-1px", "left": "-1px" });
        $table.find("td>div").not($table.find("img[src$='p/mapz0_off.png']").closest("div")).css("background-image", "").empty();
        $table.find("td").removeClass();
        $table.parent("div").css({ "top": "0", "left": "0", "z-index": "40", "background-image": "" }).insertAfter($("table[width='500']:last"));
    }

    let clicked = false;
    $("<button id='OverlayIbaracityMap' class='BUT' style='display: block;margin-top:6px;height:24px;'>表世界を統合</button>").insertAfter($("span.MS5").closest("a")).on("click", async (e) => {
        if(clicked) return;
        clicked = true;
        await overlayIbaracityMap();
        $(e.currentTarget).prop("disabled", true);
    });
})(jQuery);
