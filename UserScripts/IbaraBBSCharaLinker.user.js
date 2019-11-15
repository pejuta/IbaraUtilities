// ==UserScript==
// @name        IbaraBBSCharaLinker
// @namespace   Pejuta
// @description 掲示板のキャラクター名のENo.あたりにリンクを追加する。
// @include     http://lisge.com/ib/bbs.php*
// @include     http://lisge.com/ib/bbstrade.php*
// @version     1.0.0
// @grant       none
// ==/UserScript==
(($) => {
	const reChara = /([1-9１-９][0-9０-９]*)/g;

	function addLink(i, e) {
		const html = e.innerHTML;
		const m = reChara.exec(html);
		if (!m) return;
        e.innerHTML = html.replace(reChara, "<a href='k/now/r$1.html' target='_blank'>$1</a>");
	}

	const $names = $("tr.GYO1,tr.GYO2").children("td:nth-last-child(3)");
	$names.filter((i, e) => e.children.length === 0).each(addLink);
	$names.children("span.G2").each(addLink);
	$("#oya,#ko").children("table[cellpadding='8']").find("tr:first-child>td>b.G3:first-child").each(addLink);
})(jQuery);