// ==UserScript==
// @name         IbaraFavChars
// @namespace    https://twitter.com/11powder
// @version      0.1.2
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

    const FLASHDOT_CSS = ".df-stage{display:flex;align-items:center;justify-content:center}.dot-flashing{position:relative;width:4px;height:4px;border-radius:2px;background-color:#444;color:#444;animation:a 1s infinite linear alternate;animation-delay:.5s}.dot-flashing:after,.dot-flashing:before{content:'';display:inline-block;position:absolute;top:0}.dot-flashing:before{left:-6px;animation-delay:0}.dot-flashing:after,.dot-flashing:before{width:4px;height:4px;border-radius:2px;background-color:#444;color:#444;animation:a 1s infinite alternate}.dot-flashing:after{left:6px;animation-delay:1s}@keyframes a{0{background-color:#444}50%,to{background-color:#fff}}";

    function delay(ms) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), ms);
        });
    }

    function extractENoFromHref(href) {
        const m = /r(\d+)\.html$/.exec(href);
        if (!m) {
            return 0;
        }
        return parseInt(/r(\d+)\.html$/.exec(href)[1], 10);
    }

    const SIDES = { Ibaracity: 0, Ansinity: 1, Null: 64 };

    const Character = (() => {
        const DL_DELAY_MS = 5000;

        const fn = function Character(c) {
            const copyFrom = c || {};
            this.eno     = ("eno"     in copyFrom) ? copyFrom.eno     : 0;
            this.name    = ("name"    in copyFrom) ? copyFrom.name    : "";
            this.plName  = ("plName"  in copyFrom) ? copyFrom.plName  : "";
            this.side    = ("side"    in copyFrom) ? copyFrom.side    : SIDES.Null;
            this.iconURL = ("iconURL" in copyFrom) ? copyFrom.iconURL : "p/nii.png";
        };

        fn.buildCharactersFromList = function ($table) {
            const sides    = $table.find("td:nth-of-type(1) > span")   .map((i, e) => e.className === "G3" ? SIDES.Ibaracity : SIDES.Ansinity).get();
            const iconURLs = $table.find("td:nth-of-type(2) > a > img").map((i, e) => e.getAttribute("src")).get();
            const enos     = $table.find("td:nth-of-type(2) > a")      .map((i, e) => extractENoFromHref(e.getAttribute("href"))).get();
            const names    = $table.find("td:nth-of-type(3) > a")      .map((i, e) => e.textContent).get();
            const plNames  = $table.find("td:nth-of-type(4)")          .map((i, e) => e.textContent).get();

            const chars = [];
            for (let ci = 0, cEnd = enos.length; ci < cEnd; ci++) {
                chars.push(new Character({
                    eno:     enos[ci],
                    name:    names[ci],
                    plName:  plNames[ci],
                    side:    sides[ci],
                    iconURL: iconURLs[ci],
                }));
            }

            return chars;
        };

        const _vDoc = document.implementation.createHTMLDocument();
        let _delayPromise = null;
        fn.downloadPartialList = async function (fromENo) {
            if (_delayPromise) {
                await _delayPromise;
            }
            const html = await $.ajax({ type: "GET", dataType: "text", url: `http://lisge.com/ib/chalist.php?en=${fromENo}` });
            _delayPromise = delay(DL_DELAY_MS);

            const $table = $(html, _vDoc).find("table[width='950']");
            return fn.buildCharactersFromList($table);
        };

        return fn;
    })();

    const CharactersDB = (() => {
        const DB_NAME = "IbaracityUserScript";
        const TABLE_NAME = "Characters";
        const CURRENT_VERSION = 1;

        let _dbPromise = null;
        let _db = null;
        const _lists = new WeakMap();

        const fn = function CharactersDB() {
            _lists.set(this, []);

            if (_dbPromise) {
                return;
            }
            const dbReq = indexedDB.open(DB_NAME, CURRENT_VERSION);
            _dbPromise = new Promise((resolve, reject) => {
                dbReq.onsuccess = (e) => {
                    _db = e.target.result;
                    resolve(e);
                };
                dbReq.onerror = (e) => {
                    reject(e);
                };
                dbReq.onupgradeneeded = (e) => {
                    const db = e.target.result;
                    const objStore = db.createObjectStore(TABLE_NAME, { keyPath: "eno", autoIncrement: false });
                };
            });
        };

        fn.prototype.promise = function () {
            return _dbPromise;
        };

        fn.prototype.get = function (eno) {
            return _lists.get(this)[eno] || null;
        };

        fn.prototype.getCopiedList = function () {
            return _lists.get(this).slice();
        };

        fn.prototype.getList = function () {
            return _lists.get(this);
        };

        fn.prototype.put = function (...characters) {
            return new Promise((resolve, reject) => {
                const list = _lists.get(this);
                const ta = _db.transaction(TABLE_NAME, "readwrite");
                const objStore = ta.objectStore(TABLE_NAME);
                for(let c of characters) {
                    list[c.eno] = c;
                    objStore.put(c);
                }

                ta.oncomplete = (e) => resolve(e);
            });
        };

        fn.prototype.loadAll = function () {
            return new Promise((resolve, reject) => {
                const objStore = _db.transaction(TABLE_NAME, "readonly").objectStore(TABLE_NAME);
                const oc = objStore.openCursor();
                oc.onsuccess = (e) => {
                    const cursor = e.target.result;
                    if (cursor) {
                        _lists.get(this)[cursor.key] = cursor.value;
                        cursor.continue();
                    }
                    else {
                        // no more entities
                        resolve(e);
                    }
                };
                oc.onerror = (e) => {
                    reject(e);
                };
            });
        };

        fn.prototype.loadOrDownload = async function (enosRequired) {
            enosRequired = enosRequired || [];
            //ダウンロード回数を減らすために要求enoを昇順にソートする
            enosRequired.sort();

            await this.loadAll();
            const list = _lists.get(this);

            for (let eno of enosRequired) {
                if (!list[eno]) {
                    const dldChars = await Character.downloadPartialList(eno);
                    await this.put.apply(this, dldChars);
                }
            }
        };

        fn.prototype.download = async function (enos) {
            if (!enos || enos.length === 0) {
                return;
            }
            //ダウンロード回数を減らすために要求enoを昇順にソートする
            enos.sort();

            const enosDledSorted = [];
            let enoDldLastIndex = -1;

            for (let ei = 0, eEnd = enos.length; ei < eEnd; ei++) {
                const eno = enos[ei];

                const idx = enosDledSorted.indexOf(eno, ++enoDldLastIndex);
                if (idx >= 0) {
                    enoDldLastIndex = idx;
                    continue;
                }

                const dldChars = await Character.downloadPartialList(eno);
                await this.put.apply(this, dldChars);

                for (let char of dldChars) {
                    //ダウンロードされたキャラクターはeno昇順に並んでいるからそのままpushしてよい
                    enosDledSorted.push(char.eno);
                }
            }
        };

        return fn;
    })();

    const SavableTable = (() => {
        //private members
        const _tables = new WeakMap();
        const _lsIndices = new WeakMap();

        //thisを利用するためにcallされる必要がある.
        const setLocalStorageIndex = function (index) {
            _lsIndices.set(this, index);
        };

        const fn = function SavableTable (localStorageIndex) {
            setLocalStorageIndex.call(this, localStorageIndex);
            this.loadOrInit();
        };

        fn.prototype.loadOrInit = function () {
            _tables.set(this, JSON.parse(localStorage.getItem(_lsIndices.get(this)) || "{}"));
        };

        fn.prototype.save = function () {
            localStorage.setItem(_lsIndices.get(this), JSON.stringify(_tables.get(this)));
        };

        fn.prototype.saveAndReload = function () {
            this.save();
            this.loadOrInit();
        };

        fn.prototype.add = function (eno) {
            _tables.get(this)[eno] = 1;
        };

        fn.prototype.remove = function (eno) {
            delete _tables.get(this)[eno];
        };

        fn.prototype.contains = function (eno) {
            return eno in _tables.get(this);
        };

        fn.prototype.getArray = function () {
            const arr = [];
            for (let eno in _tables.get(this)) {
                arr.push(parseInt(eno, 10));
            }
            return arr;
        };

        return fn;
    })();

    const _favENoList = new SavableTable("Ibaracity_Fav");
    _favENoList.fav = function($fav) {
        const eno = $fav.data("eno");
        $fav.data("fav", true).addClass("FavListed");
        _favENoList.add(eno);
        _favENoList.saveAndReload();
    }
    _favENoList.unfav= function ($fav) {
        const eno = $fav.data("eno");
        $fav.data("fav", false).removeClass("FavListed");
        _favENoList.remove(eno);
        _favENoList.saveAndReload();
    }
    _favENoList.applyFav= function ($fav) {
        const eno = $fav.data("eno");
        if (_favENoList.contains(eno)) {
            $fav.data("fav", true).addClass("FavListed");
        }
        else {
            $fav.data("fav", false).removeClass("FavListed");
        }
    }
    _favENoList.applyFavs= function ($anscestor) {
        if ($anscestor) {
            $anscestor.find(".Favorite").each((i, e) => _favENoList.applyFav($(e)));
        }
        else {
            $(".Favorite").each((i, e) => _favENoList.applyFav($(e)));
        }
    }
    _favENoList.toggleFav= function ($fav) {
        const eno = $fav.data("eno");
        if (_favENoList.contains(eno)) {
            _favENoList.unfav($fav);
        }
        else {
            _favENoList.fav($fav);
        }
    }

    function favClickEvt(e) {
        _favENoList.toggleFav($(e.currentTarget));
    }

    const FAV_CSS = ".Favorite:before{content:'\\2661';line-height:100%;display:inline-block;opacity:0.5;}.Favorite:hover:before{opacity:1;}.Favorite.FavListed:before{content:'\\2665';color:#FC0FC0;opacity:1;}";

    async function CharaList() {

        const _flashdotHTML = "<div class='df-stage' style='display:inline-flex;position:relative;top:-5px;left:11px;'><div class='dot-flashing'></div><div>";

        async function loadAndUpdateDB($charaTable) {
            const db = new CharactersDB();
            await db.promise();
            await db.loadAll();

            await db.put.apply(db, Character.buildCharactersFromList($charaTable));
            return db;
        }

        function $buildFavTable(db) {
            const chars = db.getCopiedList();

            const favChars = [];
            for (let eno of _favENoList.getArray()) {
                favChars.push(chars[eno] || new Character({ eno: eno }));
            }

            return $(buildCharaListTableHTML(favChars));
        }

        function buildCharaListTableRowHTML(char) {
            let style, sideTxt;
            switch (char.side) {
                case SIDES.Ibaracity:
                    style = "G";
                    sideTxt = "茨";
                    break;
                case SIDES.Ansinity:
                    style = "R";
                    sideTxt = "ア";
                    break;
                case SIDES.Null:
                default:
                    style = "W";
                    sideTxt = "";
                    break;
            }
            return `<TR no='${char.eno}'>` +
                        `<td class='Favorite' data-eno='${char.eno}'></td>` +
                        `<TD WIDTH=25 ALIGN=CENTER><SPAN CLASS=${style}3>${sideTxt}</SPAN></TD>` +
                        `<TD WIDTH=25 ALIGN=CENTER><A HREF="k/now/r${char.eno}.html" TARGET=_blank><IMG SRC="${char.iconURL}" WIDTH=30 HEIGHT=30 STYLE="margin:3px 3px 0 3px;"></A></TD>` +
                        `<TD WIDTH=500 CLASS=${style}3>ENo.${char.eno} <A HREF="k/now/r${char.eno}.html">${char.name}</A></TD>` +
                        `<TD CLASS=${style}2 NOWRAP>${char.plName}</TD>` +
                    `</TR>`;
        }

        function buildCharaListTableHTML(chars) {
            const trs = [];
            for (let char of chars) {
                trs.push(buildCharaListTableRowHTML(char));
            }
            return `<TABLE WIDTH=950 CLASS='BLK2 FavTable'>${trs.join("")}</TABLE>`;
        }

        function insertFavColumn(tr) {
            const eno = extractENoFromHref($(tr).children("td:nth-of-type(2)").children("a").attr("href"));
            const $favTd = $("<td class='Favorite'></td>").data({ "eno": eno }).prependTo(tr);
        }


        $addStyle(FAV_CSS + "td.Favorite{width:20px;text-align:center;font-size:20px;}.FavBtn{height:26px;margin-bottom:6px;margin-left:10px;text-align:center;display:inline-block;}.FavFilter{width:200px;}.FavCharInfo{width:160px;}.FavTable tr:nth-of-type(even){background-color:#111111;}");

        const $charaTable = $("table[width='950']");

        let db_tmp;
        try {
            db_tmp = await loadAndUpdateDB($charaTable);
        } catch (e) {
            //DBが利用できないっぽい
            $charaTable.on("click", "td.Favorite", (e) => favClickEvt);
            return;
        } finally {
            $charaTable.find("tr").each((i, e) => insertFavColumn(e));
            _favENoList.applyFavs($charaTable);
        }
        const db = db_tmp;

        const $favTable = $buildFavTable(db).hide().insertAfter($charaTable);
        _favENoList.applyFavs($favTable);

        $charaTable.on("click", "td.Favorite", (e) => {
            favClickEvt(e);
            //テーブル連動
            const eno = $(e.currentTarget).data("eno");
            if (_favENoList.contains(eno)) {
                const char = db.get(eno);
                const $newRow = $(buildCharaListTableRowHTML(char));
                $favTable.append($newRow);
                _favENoList.applyFav($newRow.find("td.Favorite"));
            }
            else {
                $favTable.find(`tr[no='${eno}']`).remove();
            }
        });
        $favTable.on("click", "td.Favorite", (e) => {
            favClickEvt(e);
            $(e.currentTarget).parent("tr").remove();
            //テーブル連動
            _favENoList.applyFavs($charaTable);
        });

        const $favFilter = $("<div class='BUT2 FavBtn FavFilter'>お気に入りキャラ一覧</div>").insertBefore($charaTable.parent("div"));
        const $updateFavCharInfo = $("<div class='BUT2 FavBtn FavCharInfo'>...の情報取得</div>").hide().insertBefore($charaTable.parent("div"));

        $favFilter.on("click", () => {
            $charaTable.toggle();
            $favTable.toggle();
            $updateFavCharInfo.toggle();
        });

        let countOfFavCharInfoBtnClicked = 0;
        $updateFavCharInfo.on("click", async () => {
            if (countOfFavCharInfoBtnClicked >= 2) {
                return;
            }

            if (countOfFavCharInfoBtnClicked == 0) {
                $addStyle(FLASHDOT_CSS);
                $updateFavCharInfo.html("情報取得中（反映までしばらくお待ち下さい）" + _flashdotHTML).css("width", "500px");

                await db.loadOrDownload(_favENoList.getArray());
                $updateFavCharInfo.html("...情報取得完了！(再クリックで情報更新)").css("width", "400px");
            }
            else if (countOfFavCharInfoBtnClicked == 1) {
                if (!confirm("情報の更新には時間が掛かります。よろしいですか？\n（サーバーに負担が掛かるため、むやみに情報更新を行わないようにしてください。）")) {
                    return;
                }

                $addStyle(FLASHDOT_CSS);
                $updateFavCharInfo.html("情報更新中（反映までしばらくお待ち下さい）" + _flashdotHTML).css("width", "500px");

                await db.download(_favENoList.getArray());
                $updateFavCharInfo.html("...情報更新完了！").css("width", "180px");
            }
            else {

            }

            countOfFavCharInfoBtnClicked++;

            //テーブルの更新
            $favTable.find("tr").remove();
            $buildFavTable(db).find("tr").appendTo($favTable);
            _favENoList.applyFavs($favTable);
        });
    }

    function CharaPage() {
        $addStyle(FAV_CSS + ".Favorite:before{background-color:black;border-radius:10px;}div.Favorite{position:absolute;top:100px;left:380px;font-size:50px;z-index:99;}");

        const eno = parseInt(/\d+$/.exec($("div.CEN").html()) || "0", 10);

        const $fav = $("<div class='Favorite'></td>").data({ "eno": eno }).appendTo("div.CSEAT").on("click", favClickEvt);
        _favENoList.applyFav($fav)
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
                _favENoList.applyFavs();
            });
            _favENoList.applyFav($fav);
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