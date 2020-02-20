// ==UserScript==
// @name         IbaraCrossRoseSengenReviewer
// @namespace    https://twitter.com/11powder
// @version      0.1.3
// @description  CrossRoseのHomeでの宣言確認を可能にします。
// @author       pejuta
// @include      http://lisge.com/ib/act_index.php*
// @updateURL    https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraCrossRoseSengenReviewer.user.js
// @downloadURL  https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraCrossRoseSengenReviewer.user.js
// @grant        none
// ==/UserScript==
(($) => {
    "use strict";

    const DATANAME_SENGEN_INDEX = "idx";
    const DATANAME_HAS_SENGEN = "has_sengen";

    const _vdoc = document.implementation.createHTMLDocument();

    const sengenHtmls = [];

    const $table = $("div.SMIGI > table:last");
    const sengenCount = $table.find("tr").length;

    async function appendSengenText(sengenIndex) {
        const $trSengen = $table.find("tr").filter((i, e) => e.dataset[DATANAME_SENGEN_INDEX] === sengenIndex.toString());
        const $tdSengen = $trSengen.children("td").eq(2);

        if (sengenHtmls[sengenIndex]) {
            return $trSengen.next("tr.SengenText");
        }

        let url;
        let isAide = false;
        switch (sengenIndex) {
            case 0:
                url = "http://lisge.com/ib/act_main.php";
                break;
            case 1:
                url = "http://lisge.com/ib/act_trade.php";
                break;
            case 2:
                url = "http://lisge.com/ib/act_battle.php";
                break;
            case sengenCount - 1:
                url = "http://lisge.com/ib/act_skill.php";
                break;
            default:
                isAide = true;
                break;
        }

        if (isAide) {
            let aideIndex = sengenIndex - 2;
            let battleHtml = sengenHtmls[2];
            if (!battleHtml) {
                await appendSengenText(2);
                battleHtml = sengenHtmls[2];
            }

            const $aideAnchor = $(battleHtml, _vdoc).find("a[href^='act_se.php'] > span.Y3").nextUntil(":not(a)").eq(aideIndex);
            const aideIdMatch = /(?:\?|&)a=(\d+)/.exec($aideAnchor.attr("href"));
            if (!aideIdMatch) {
                throw new Error("invalid operation: the aide id of " + $tds.get(0).textContent + " has not found.");
            }
            url = "http://lisge.com/ib/act_battle.php?a=" + aideIdMatch[1];
        }

        const sengenHtml = sengenHtmls[sengenIndex] = await (await fetch(url)).text();
        const $sengenText = $(sengenHtml, _vdoc).find("#SENGENTEXT").show();
        const $sengenContainer = $("<tr class='SengenText'><td colspan=3></td></tr>").hide().insertAfter($tdSengen.closest("tr"));
        $sengenContainer.find("td").append($sengenText);
        return $sengenContainer;
    }

    $table.find("tr td:nth-of-type(2)").each((i, e) => {
        const tdSengen = e.nextElementSibling;
        tdSengen.parentElement.dataset[DATANAME_SENGEN_INDEX] = i;
        if (e.innerHTML.indexOf("未宣言") !== -1) {
            return;
        }
        tdSengen.parentElement.dataset[DATANAME_HAS_SENGEN] = true;
        tdSengen.innerHTML += "（▼最新の送信内容をざっくり確認）";
        tdSengen.classList.add("ABO");
    });

    $("div.SMIGI > table:last tr").on("click", async (e) => {
        if (!e.currentTarget.dataset[DATANAME_HAS_SENGEN]) {
            return;
        }

        const sengenIndex = parseInt(e.currentTarget.dataset[DATANAME_SENGEN_INDEX], 10);
        const $sengenContainer = await appendSengenText(sengenIndex);
        $sengenContainer.toggle();
    });

})(jQuery);
