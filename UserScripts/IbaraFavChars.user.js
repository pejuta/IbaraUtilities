// ==UserScript==
// @name         IbaraFavChars
// @namespace    https://twitter.com/11powder
// @version      0.1.0
// @description  お気に入りのキャラクターに愛を添えて。
// @include      http://lisge.com/ib/chalist.php*
// @include      http://lisge.com/ib/talk.php*
// @include      /^http:\/\/lisge\.com\/ib\/k\/[^\/]+?\/r\d+\.html$/
// @updateURL    https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraFavChars.user.js
// @downloadURL  https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraFavChars.user.js
// @grant        none
// ==/UserScript==

(function($) {
    "use strict";

    function $addStyle(style) {
        $("head").append(`<style type='text/css'>${style}</style>`);
    }

    const SavableList = (() => {
        //private members
        const lists = new WeakMap();
        const lsIndices = new WeakMap();

        //thisを利用するためにcallされる必要がある.
        const setLocalStorageIndex = function (index) {
            lsIndices.set(this, index);
        };

        const fn = function SavableList (localStorageIndex) {
            setLocalStorageIndex.call(this, localStorageIndex);
            this.loadOrInit();
        };

        fn.prototype.loadOrInit = function () {
            lists.set(this, JSON.parse(localStorage.getItem(lsIndices.get(this)) || "{}"));
        };

        fn.prototype.save = function () {
            localStorage.setItem(lsIndices.get(this), JSON.stringify(lists.get(this)));
        };

        fn.prototype.saveAndReload = function () {
            this.save();
            this.loadOrInit();
        };

        fn.prototype.add = function (eno) {
            lists.get(this)[eno] = 1;
        };

        fn.prototype.remove = function (eno) {
            delete lists.get(this)[eno];
        };

        fn.prototype.contains = function (eno) {
            return eno in lists.get(this);
        };

        return fn;
    })();


    function extractENoFromHref(href) {
        const m = /r(\d+)\.html$/.exec(href);
        if (!m) {
            return 0;
        }
        return parseInt(/r(\d+)\.html$/.exec(href)[1], 10);
    }

    const FAV_LOCAL_INDEX = "Ibaracity_Fav";
    const _favENoList = new SavableList(FAV_LOCAL_INDEX);

    function fav(eno, $fav) {
        $fav.data("fav", true).addClass("FavListed");
        _favENoList.add(eno);
        _favENoList.saveAndReload();
    }
    function unfav(eno, $fav) {
        $fav.data("fav", false).removeClass("FavListed");
        _favENoList.remove(eno);
        _favENoList.saveAndReload();
    }
    function applyFav(eno, $fav) {
        if (_favENoList.contains(eno)) {
            $fav.data("fav", true).addClass("FavListed");
        }
        else {
            $fav.data("fav", false).removeClass("FavListed");
        }
    }
    function applyFavs() {
        $(".Favorite").each((i, e) => {
            const $fav = $(e);
            applyFav($fav.data("eno"), $fav);
        });
    }
    function toggleFav(eno, $fav) {
        if (_favENoList.contains(eno)) {
            unfav(eno, $fav);
        }
        else {
            fav(eno, $fav);
        }
    }

    function favClickEvt(e) {
        const $t = $(e.currentTarget);
        const eno = $t.data("eno");
        toggleFav(eno, $t);
    }

    const FAV_CSS = ".Favorite:before{content:'\\2661';line-height:100%;display:inline-block;opacity:0.5;}.Favorite:hover:before{opacity:1;}.Favorite.FavListed:before{content:'\\2665';color:#FC0FC0;opacity:1;}";

    function CharaList() {
        $addStyle(FAV_CSS + "td.Favorite{width:20px;text-align:center;font-size:20px;}.FavFilter{height:26px;width:180px;margin-bottom:6px;margin-left:10px;text-align:center;}");

        const $charaTable = $("table[width='950']");
        const $trs = $charaTable.find("tr");
        $trs.each((i, e) => {
            const eno = extractENoFromHref($(e).children("td:nth-of-type(2)").children("a").attr("href"));
            const $favTd = $("<td class='Favorite'></td>").data({ "eno": eno }).prependTo(e);

            applyFav(eno, $favTd);
        });

        $charaTable.find("td.Favorite").on("click", favClickEvt);
        let favFilterEnabled = false;
        $("<div class='BUT2 FavFilter'>お気に入りフィルタ</div>").insertBefore($charaTable.parent("div")).on("click", () => {
            if (favFilterEnabled) {
                $trs.show();
                favFilterEnabled = false;
            }
            else {
                $trs.filter((i, e) => {
                    return $(e).find(".FavListed").length === 0;
                }).toggle();
                favFilterEnabled = true;
            }
        });
    }

    function CharaPage() {
        $addStyle(FAV_CSS + ".Favorite:before{background-color:black;border-radius:10px;}div.Favorite{position:absolute;top:100px;left:380px;font-size:50px;z-index:99;}");

        const eno = parseInt(/\d+$/.exec($("div.CEN").html()) || "0", 10);

        const $fav = $("<div class='Favorite'></td>").data({ "eno": eno }).appendTo("div.CSEAT").on("click", favClickEvt);
        applyFav(eno, $fav)
    }

    function TalkPage() {
        $addStyle(FAV_CSS + ".Favorite:before{background-color:black;border-radius:4px;}table.SE0 td[width='70']{position:relative;}div.Favorite{position:absolute;top:4px;right:7px;}");

        $("img.RE2").each((i, e) => {
            const enoTxt = e.getAttribute("no");
            if (!enoTxt) {
                return;
            }
            const eno = parseInt(enoTxt, 10);

            const $fav = $("<div class='Favorite'></div>").data({ "eno": eno }).insertAfter(e).on("click", (e) => {
                favClickEvt(e);
                applyFavs();
            });
            applyFav(eno, $fav);
        });
    }

    if (document.location.pathname === "/ib/chalist.php") {
        CharaList();
    }
    else if (document.location.pathname === "/ib/talk.php") {
        TalkPage();
    }
    else /* character pages */ {
        CharaPage();
    }
})(jQuery);