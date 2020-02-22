// ==UserScript==
// @name        IbaraResultCollapser
// @namespace   https://twitter.com/11powder
// @description 結果内容をやたらたたむ
// @include     /^http:\/\/lisge.com\/ib\/k\/[^\/]+/r\d+.html$/
// @updateURL   https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraResultCollapser.user.js
// @downloadURL https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraResultCollapser.user.js
// @version     1.0.0
// @grant       none
// ==/UserScript==

(($) => {
	$(document.head).append("<style type='text/css'>.Togglable{padding-top:10px;padding-bottom:10px;}.Togglable.BattlePrev{padding-bottom:80px;}.Togglable.Battle.BattlePrev,.Togglable.Ready.BattlePrev{padding-bottom:30px;}.Togglable.Battle{padding-top:80px;}.ToggleButton{font-size: 20px;font-weight:bold;height:50px;text-align:center;line-height:50px;}</style>");

	const $containers = $("img+div.R870+img").prev();

	$("img[src='../../p/t_ready.png']").closest("div.R870").addClass("Ready");

	$("img+div.R870+img").prev().each((i, e)=> {
		if (e.children.length <= 2) {
			return;
		}
		e.classList.add("Togglable");
		if($(e).first().find(".RNE").length > 0) {
			e.classList.add("Battle");
			$containers.get(i - 1).classList.add("BattlePrev");
		}
		e.parentElement

		const $divBody = $("<div class='ToggleBody'></div>").hide();
		$(Array.prototype.slice.call(e.childNodes, 2)).wrapAll($divBody);
	});

	const $divButton = $("<div class='ToggleButton'></div>").addClass("BUTT1").html("見てみる").on("click", (e) => {
		e.currentTarget.style.display = "none";
		e.currentTarget.nextElementSibling.style.display = "block";
		e.currentTarget.parentElement.classList.remove("Togglable");
	});
	$(".ToggleBody").before($divButton);
})(jQuery);