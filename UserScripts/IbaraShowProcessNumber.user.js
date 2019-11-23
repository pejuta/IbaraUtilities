// ==UserScript==
// @name        IbaraShowProcessNumber
// @namespace   https://twitter.com/11powder
// @description 見切りに関する項目に処理順を表示する
// @include     http://lisge.com/ib/act_main.php*
// @include     http://lisge.com/ib/act_trade.php*
// @updateURL   https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraShowProcessNumber.user.js
// @downloadURL https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraShowProcessNumber.user.js
// @version     1.0.1
// @grant       none
// ==/UserScript==

(async ($) => {
    "use strict";

    switch (document.location.pathname)
    {
        case "/ib/act_main.php":
            const $tdp3 = $("td.P3");
            $tdp3.filter((i, e) => e.textContent == "［破棄］").before("<span class='Y2'>1200:</span>");
            $tdp3.filter((i, e) => e.textContent == "［食事］").before("<span class='Y2'>1400:</span>");
            $("b.G3").filter((i, e) => e.textContent == "アイテム購入").before("<span class='Y2'>2200:</span>");
            return;
        case "/ib/act_trade.php":
            const $bg3 = $("b.G3");
            $bg3.filter((i, e) => e.textContent == "アイテム手渡し").before("<span class='Y3'>1300:</span>");
            $bg3.filter((i, e) => e.textContent == "PS送付").before("<span class='Y3'>2000:</span>");
            $bg3.filter((i, e) => e.textContent == "アイテム送付").before("<span class='Y3'>2100:</span>");
            $bg3.filter((i, e) => e.textContent == "各種生産行動").nextUntil("img").last().after("<span class='Y3'>2500:<span class='G3'>合成</span> → 2600:<span class='G3'>作製</span> → 2700:<span class='G3'>料理</span> → 2800:<span class='G3'>付加</span></span>");
            return;
        default:
            break;
    }
})(jQuery);