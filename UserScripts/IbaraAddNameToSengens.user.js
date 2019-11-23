// ==UserScript==
// @name        IbaraAddNameToSengens
// @namespace   https://twitter.com/11powder
// @description イバラシティの宣言確認に名前の表示を追加する
// @include     http://lisge.com/ib/act_main.php*
// @include     http://lisge.com/ib/act_trade.php*
// @include     http://lisge.com/ib/act_battle.php*
// @include     http://lisge.com/ib/act_skill.php*
// @updateURL   https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraAddNameToSengens.user.js
// @downloadURL https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraAddNameToSengens.user.js
// @version     1.0.1
// @grant       none
// ==/UserScript==
(($) => {
	"use strict";
	$("#SENGENTEXT").prepend(`<b id="NicknameAndENo" class="Y3">${$(".SHIDARI>table:first a:first").text().trim()}</b>`);
})(jQuery);
