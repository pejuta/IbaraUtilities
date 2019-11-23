// ==UserScript==
// @name         IbaraCrossRoseSengenReviewer
// @namespace    https://twitter.com/11powder
// @version      0.1.1
// @description  CrossRoseのHomeでの宣言確認を可能にします。
// @author       pejuta
// @include      http://lisge.com/ib/act_index.php*
// @updateURL    https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraCrossRoseSengenReviewer.user.js
// @downloadURL  https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraCrossRoseSengenReviewer.user.js
// @grant        none
// ==/UserScript==
(($) => {
    "use strict";
    
    const _vdoc = document.implementation.createHTMLDocument();

    $("div.SMIGI > table:last tr td:nth-of-type(3)").each((i, e) => {
        $(e).data("idx", i);
        e.innerHTML = "宣言済み（▼最新の送信内容をざっくり確認）";
        $(e).addClass("ABO");
    });
    $("div.SMIGI > table:last tr td.G3:nth-of-type(3)").on("click", async (e) => {

        if ($(e.currentTarget).data("sengenLoaded")) {
            $(e.currentTarget).closest("tr").next("tr.SengenText").toggle();
            return;
        };

        const idx = $(e.currentTarget).data("idx");
        let url;
        switch (idx) {
            case 0:
                url = "http://lisge.com/ib/act_main.php";
                break;
            case 1:
                url = "http://lisge.com/ib/act_trade.php";
                break;
            case 2:
                url = "http://lisge.com/ib/act_battle.php";
                break;
            case 3:
                url = "http://lisge.com/ib/act_skill.php";
                break;
            default:
                throw new Error("idxがおかしい");
        }

        const sengenHtml = await $.ajax({ type:"GET", dataType:"text", url:url });
        $(sengenHtml, _vdoc).find("#SENGENTEXT").css("display", "block").insertAfter($(e.currentTarget).closest("tr")).wrap("<tr class='SengenText'><td colspan=3></td></tr>");

        $(e.currentTarget).data("sengenLoaded", true);
    });
})(jQuery);
