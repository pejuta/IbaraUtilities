// ==UserScript==
// @name        IbaraAddNameToSengens
// @namespace   Pejuta
// @description イバラシティの宣言確認に名前の表示を追加する
// @include     http://lisge.com/ib/act_main.php*
// @include     http://lisge.com/ib/act_trade.php*
// @include     http://lisge.com/ib/act_battle.php*
// @include     http://lisge.com/ib/act_skill.php*
// @version     1.0.0
// @grant       none
// ==/UserScript==
(() => {
	const $ = window.$;
	$("#SENGENTEXT").prepend(`<b id="NicknameAndENo" class="Y3">${$(".SHIDARI>table:first a:first").text().trim()}</b>`);
})()
