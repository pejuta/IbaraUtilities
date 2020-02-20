// ==UserScript==
// @name         IbaraCrossRoseSengenReviewer
// @namespace    https://twitter.com/11powder
// @version      0.1.3.3
// @description  CrossRoseのHomeでの宣言確認を可能にします。
// @author       pejuta
// @include      http://lisge.com/ib/act_index.php*
// @updateURL    https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraCrossRoseSengenReviewer.user.js
// @downloadURL  https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraCrossRoseSengenReviewer.user.js
// @grant        none
// ==/UserScript==
(($) => {
    "use strict";

    function loadPMButtonHandler(targetElem, parentElem, targetUrl) {
        targetElem.classList.remove("ABO");
        const info = extractCharacterInfoInfoFromButtonId(targetElem.id);
        return loadPM(parentElem, targetUrl, info);
    }

    function bindLoadPMButtons(parentElem, targetUrl) {
        $(parentElem).find("[id^=CHKHTML]").filter((i, e) => !e.innerHTML).addClass("ABO").html("クリックで読み込み").one("click", (e) => {
            loadPMButtonHandler(e.currentTarget, parentElem, targetUrl);
        });
    }

    async function loadPM(parentElem, targetUrl, info) {
        const data = await $.post(targetUrl, info);
        const id = "#CHKHTML" + infoToString(info);
        return $(parentElem).find(id).html(data);
    }

    function extractCharacterInfoInfoFromButtonId(id) {
        const infoMatch =  /(\d+)A?(\d*?)$/i.exec(id);
        if (!infoMatch) {
            return;
        }
        const ceno = parseInt(infoMatch[1], 10);
        const ano = infoMatch[2] ? parseInt(infoMatch[2], 10) : void 0;

        return {
            ceno,
            ano
        };
    }

    function infoToString(info) {
        return info.ceno + (typeof info.ano === "number" ? ("A" + info.ano) : "");
    }

    function bindBattle(parentElem, url) {
        $(parentElem).find("[TP='SNBTN']").click(function(){
            const containerId = $(this).attr('ID').replace("BTN","HTML");
            const btnClass = "BUTT" + $(this).attr('BTNNO');
            $(parentElem).find("#" + containerId).toggle();
            $(this).toggleClass("BUTT0").toggleClass(btnClass);
        });

        const battleShown = [];
        battleShown[1] = true; // 遭遇戦は最初から見えてる

        $(parentElem).find("[TP='BTBTN']").click(function(){
            const battleNumber = $(this).attr('NO');
            battleShown[battleNumber] = !battleShown[battleNumber];
            $(this).toggleClass("BUTT0").toggleClass("BUTT3");
            $(parentElem).find(".BTYPE" + battleNumber).toggle();
        });

        $(parentElem).find("[id^=CHKHTML]").filter((i, e) => !e.innerHTML).addClass("ABO").html("クリックで読み込み").one("click", async (e) => {
            const $container = await loadPMButtonHandler(e.currentTarget, parentElem, url);
            battleShown.forEach((e, bi) => {
                const $targetBattle = $container.find(".BTYPE" + bi);
                if (battleShown[bi]) {
                    $targetBattle.show();
                } else {
                    $targetBattle.hide();
                }
            });
        });
    }


    const DATANAME_SENGEN_INDEX = "idx";
    const DATANAME_IS_SENGEN_ROW = "has_sengen";

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
        // let isAide = false;
        switch (sengenIndex) {
            case 0:
                url = "act_main.php";
                break;
            case 1:
                url = "act_trade.php";
                break;
            case 2:
                url = "act_battle.php";
                break;
            case sengenCount - 1:
                url = "act_skill.php";
                break;
            default:
                throw new Error("invalid operation");
                // isAide = true;
                // break;
        }

        // if (isAide) {
        //     return;
        //     let aideIndex = sengenIndex - 2;
        //     let battleHtml = sengenHtmls[2];
        //     if (!battleHtml) {
        //         await appendSengenText(2);
        //         battleHtml = sengenHtmls[2];
        //     }

        //     const $aideAnchor = $(battleHtml, _vdoc).find("a[href^='act_se.php'] > span.Y3").nextUntil(":not(a)").eq(aideIndex);
        //     const aideIdMatch = /(?:\?|&)a=(\d+)/.exec($aideAnchor.attr("href"));
        //     if (!aideIdMatch) {
        //         throw new Error("invalid operation: the aide id of " + $tds.get(0).textContent + " has not found.");
        //     }
        //     url = "http://lisge.com/ib/act_battle.php?a=" + aideIdMatch[1];
        // }

        const sengenHtml = sengenHtmls[sengenIndex] = await (await fetch(url)).text();
        const $sengenText = $(sengenHtml, _vdoc).find("#SENGENTEXT").show();
        const $sengenContainer = $("<tr class='SengenText'><td colspan=3></td></tr>").hide().insertAfter($tdSengen.closest("tr"));
        $sengenContainer.find("td").append($sengenText);

        if (sengenIndex === 2) {
            bindBattle($sengenContainer, url);
        } else {
            bindLoadPMButtons($sengenContainer, url);
        }


        return $sengenContainer;
    }

    $table.find("tr td:nth-of-type(2)").each((i, e) => {
        const tdSengen = e.nextElementSibling;
        tdSengen.parentElement.dataset[DATANAME_SENGEN_INDEX] = i;
        if (i > 2 && i < sengenCount - 1) {
            return;
        }
        if (e.innerHTML.indexOf("未宣言") != -1) {
            tdSengen.classList.add("R3");
        }
        tdSengen.parentElement.dataset[DATANAME_IS_SENGEN_ROW] = true;
        tdSengen.innerHTML += "（▼最新の送信内容をざっくり確認）";
        tdSengen.classList.add("ABO");
    });

    $("div.SMIGI > table:last tr").on("click", async (e) => {
        if (!e.currentTarget.dataset[DATANAME_IS_SENGEN_ROW]) {
            return;
        }

        const sengenIndex = parseInt(e.currentTarget.dataset[DATANAME_SENGEN_INDEX], 10);
        const $sengenContainer = await appendSengenText(sengenIndex);
        $sengenContainer.toggle();
    });

})(jQuery);
