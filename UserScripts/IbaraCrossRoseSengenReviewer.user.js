// ==UserScript==
// @name         IbaraCrossRoseSengenReviewer
// @namespace    https://twitter.com/11powder
// @version      0.1.3.1
// @description  CrossRoseのHomeでの宣言確認を可能にします。
// @author       pejuta
// @include      http://lisge.com/ib/act_index.php*
// @updateURL    https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraCrossRoseSengenReviewer.user.js
// @downloadURL  https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraCrossRoseSengenReviewer.user.js
// @grant        none
// ==/UserScript==
(($) => {
    "use strict";

    function bindBattle(charactersInfo) {
        $("[TP='SNBTN']").click(function(){
          var id = $(this).attr('ID');
          var bn = $(this).attr('BTNNO');
          id = id.replace("BTN","HTML");
          if( $("#"+id).css('display')=='block' ){
            $("#"+id).hide();
            $(this).addClass("BUTT"+bn).removeClass("BUTT0");
          }else{
            $("#"+id).show();
            $(this).addClass("BUTT0").removeClass("BUTT1").removeClass("BUTT2");
          }
        });

        $("[TP='BTBTN']").click(function(){
          var bn = $(this).attr('NO');
          if( $(this).hasClass('BUTT0') ){
            $(this).addClass("BUTT3").removeClass("BUTT0");
            $(".BTYPE"+bn).hide();
          }else{
            $(this).addClass("BUTT0").removeClass("BUTT3");
            $(".BTYPE"+bn).show();
          }
        });

        $("#SNCHK").one("click", function(){
            charactersInfo.forEach((item) => {
                CHKPM(item.eno, item.ano);
            });
        });

      function CHKPM(no,ano){
        $.post("act_battle.php",{ceno:no, a:ano},
          function(data){
            $("#CHKHTML"+no+"A"+ano).html(data);
          }
        );
      }
    }


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
                throw new Error("invalid operation");
                // isAide = true;
                // break;
        }

        if (isAide) {
            return;
            // let aideIndex = sengenIndex - 2;
            // let battleHtml = sengenHtmls[2];
            // if (!battleHtml) {
            //     await appendSengenText(2);
            //     battleHtml = sengenHtmls[2];
            // }

            // const $aideAnchor = $(battleHtml, _vdoc).find("a[href^='act_se.php'] > span.Y3").nextUntil(":not(a)").eq(aideIndex);
            // const aideIdMatch = /(?:\?|&)a=(\d+)/.exec($aideAnchor.attr("href"));
            // if (!aideIdMatch) {
            //     throw new Error("invalid operation: the aide id of " + $tds.get(0).textContent + " has not found.");
            // }
            // url = "http://lisge.com/ib/act_battle.php?a=" + aideIdMatch[1];
        }

        const sengenHtml = sengenHtmls[sengenIndex] = await (await fetch(url)).text();
        const $sengenText = $(sengenHtml, _vdoc).find("#SENGENTEXT").show();
        const $sengenContainer = $("<tr class='SengenText'><td colspan=3></td></tr>").hide().insertAfter($tdSengen.closest("tr"));
        $sengenContainer.find("td").append($sengenText);

        if (sengenIndex === 2) {
            // battle
            const charactersInfo = $("[TP='SNBTN']").get().map((e) => /^CHKBTN(\d+)A(\d+)$/i.exec(e.id)).filter(x => x).map((x) => {
                return { eno: x[1], ano: x[2] };
            });
            bindBattle(charactersInfo);
        }

        return $sengenContainer;
    }

    $table.find("tr td:nth-of-type(2)").each((i, e) => {
        const tdSengen = e.nextElementSibling;
        tdSengen.parentElement.dataset[DATANAME_SENGEN_INDEX] = i;
        if (e.innerHTML.indexOf("未宣言") !== -1) {
            return;
        } else if (i > 2 && i < sengenCount - 1) {
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
