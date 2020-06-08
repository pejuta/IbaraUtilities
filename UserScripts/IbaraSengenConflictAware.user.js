// ==UserScript==
// @name        IbaraSengenConflictAware
// @namespace   https://twitter.com/11powder
// @description 同じ宣言登録ページを複数タブ・ウィンドウで開いた時に発生しがちな宣言衝突ミスを緩和します。
// @include     http://lisge.com/ib/*.php*
// @version     1.0.1
// @updateURL   https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraSengenConflictAware.user.js
// @downloadURL https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraSengenConflictAware.user.js
// @grant       none
// ==/UserScript==

(() => {
    function showBriefDatePretty(date) {
        const y   = date.getFullYear().toString().slice(-2);
        const mth = ("0" + (date.getMonth() + 1)).slice(-2);
        const d   = ("0" + date.getDate()).slice(-2);
        const h   = ("0" + date.getHours()).slice(-2);
        const min = ("0" + date.getMinutes()).slice(-2);
        const s   = ("0" + date.getSeconds()).slice(-2);
        return y + "/" + mth + "/" + d + " " + h + ":" + min + ":" + s;
    }

    const LOCALSTORAGE_PREFIX = "IB_SCAware_";
    const CONFLICT_MESSAGE = "他のタブまたはウィンドウで宣言の送信が行われました。";
    const CONFLICT_MESSAGE_ON_SUBMIT = "既に" + CONFLICT_MESSAGE + "\r\n宣言の送信を中止します。";
    const CONFLICT_MESSAGE_LAST_SUBMISSION_TIME = "\r\n宣言送信日時: ";

    const storageKey = LOCALSTORAGE_PREFIX + location.pathname;

    const act = document.querySelector("form[name='act']");
    if (act === null) {
        return;
    }

    let lastSubmissionTime = null;

    window.addEventListener("storage", (ev) => {
        if (ev.newValue === null) {
            return;
        }

        if (lastSubmissionTime !== null) {
            return;
        }

        if (ev.key === storageKey) {
            lastSubmissionTime = ev.newValue;
            setTimeout(() => {
                window.alert(CONFLICT_MESSAGE + CONFLICT_MESSAGE_LAST_SUBMISSION_TIME + lastSubmissionTime);
            }, 0);
        }
    });

    act.addEventListener("submit", (ev) => {
        if (lastSubmissionTime !== null) {
            setTimeout(() => {
                window.alert(CONFLICT_MESSAGE_ON_SUBMIT + CONFLICT_MESSAGE_LAST_SUBMISSION_TIME + lastSubmissionTime);
            }, 0);
            ev.preventDefault();
            return;
        }

        localStorage.setItem(storageKey, showBriefDatePretty(new Date()));
        localStorage.removeItem(storageKey);
    });
})();

