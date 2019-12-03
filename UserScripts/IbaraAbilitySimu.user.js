// ==UserScript==
// @name        IbaraAbilitySimu
// @namespace   https://twitter.com/11powder
// @description スキルフォームをより技能シミュレーターっぽくする。
// @include     http://lisge.com/ib/act_skill.php*
// @updateURL   https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraAbilitySimu.user.js
// @downloadURL https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraAbilitySimu.user.js
// @version     1.0.2.6
// @grant       none
// ==/UserScript==
(($) => {
    "use strict";
    const SpinModeTypes = { "up":0 , "down":1 };

    const INOU_ID_MIN = 1;
    const INOU_ID_MAX = 15;
    const SEISAN_ID_MIN = 16;
    const SEISAN_ID_MAX = 21;

    const _$allSkills = $("#TABLE1 tr");

    class Ability {
        constructor(id, initialValue, currentValue) {
            this.id = id;
            this.initialValue = initialValue;
            this.currentValue = currentValue;
        }

        isInou() {
            return (this.id >= INOU_ID_MIN && this.id <= INOU_ID_MAX);
        }

        isSeisan() {
            return (this.id >= SEISAN_ID_MIN && this.id <= SEISAN_ID_MAX);
        }
    }

    class CPFP {
        constructor(cp, fp) {
            this.cp = cp;
            this.fp = fp;
        }
    }

    const AbilityManager = (()=>{

        const fn = function AbilityManager() {
            this.abilities = [];
            for (var ai = INOU_ID_MIN; ai <= SEISAN_ID_MAX; ai++) {
                const initialValue = parseInt($("#LV" + ai).val(), 10);
                const currentValue = parseInt($("#IN" + ai).text(), 10);
                this.abilities[ai] = new Ability(ai, initialValue, currentValue);
            }

            const inouCP = parseInt($("#CPI").text(), 10);
            const inouFP = parseInt($("#FPI").text(), 10);
            const seisanCP = parseInt($("#CPS").text(), 10);
            const seisanFP = parseInt($("#FPS").text(), 10);
            this.inou = new CPFP(inouCP, inouFP);
            this.seisan = new CPFP(seisanCP, seisanFP);
        };

        fn.prototype.applyCPFP = function () {
            $("#CPI").text(this.inou.cp);
            $("#FPI").text(this.inou.fp);
            $("#CPS").text(this.seisan.cp);
            $("#FPS").text(this.seisan.fp);
        };

        fn.prototype.applyAbilityStyle = function (id) {
            const abi = this.abilities[id];

            let abiLevelColor;
            if (abi.currentValue !== abi.initialValue) {
                abiLevelColor = "#CC3333";
            }
            else if (abi.currentValue > 0) {
                abiLevelColor = "#99BBBB";
            }
            else {
                abiLevelColor = "#666666";
            }

            $("#IN" + id).css("color", abiLevelColor);
        };

        fn.prototype.applyAbility = function (id) {
            const abi = this.abilities[id];
            $("#LV" + id).val(abi.initialValue);
            $("#IN" + id).text(abi.currentValue);
            $("#PM" + id).val(abi.currentValue - abi.initialValue);
            this.applyAbilityStyle(id);
        };

        // levelThreshold は5の倍数の入力が前提。そうでない場合は5の倍数に切り捨てられる
        fn.prototype.$queryLearningSkillsDif = function (id, levelThreshold) {
            levelThreshold = Math.floor(levelThreshold / 5) * 5;
            const strMainAbilityId = ("00" + id).slice(-2) + ("00" + levelThreshold).slice(-2);
                                //直系スキル
            const queryArray = [`#O${strMainAbilityId}O`];
            for(let aid = INOU_ID_MIN; aid <= SEISAN_ID_MAX; aid++){
                if (this.abilities[aid].currentValue < levelThreshold || aid === id) {
                    continue;
                }

                const strSubAbilityId = ("00" + aid).slice(-2) + ("00" + levelThreshold).slice(-2);

                //複合スキル
                if(aid < id){
                    queryArray.push(`#O${strSubAbilityId}O${strMainAbilityId}O`);
                }
                else/* if( aid > id ) */{
                    queryArray.push(`#O${strMainAbilityId}O${strSubAbilityId}O`);
                }
            }

            return $(queryArray.join(",")).filter("[ZM!='1']");　//習得済みスキルの排除[ZM!='1']
        };

        fn.prototype.spinUp = function (id, spins) {
            if (spins && spins <= 0) {
                return false;
            }
            spins = spins || 1;

            const abi = this.abilities[id];
            if (abi.currentValue >= 99) {
                return false;
            }
            spins = Math.min(99 - abi.currentValue, spins);

            const cpfp = abi.isInou() ? this.inou : this.seisan;
            const fpToGain = Math.min(abi.initialValue - abi.currentValue, spins);
            if(fpToGain > 0) {
                cpfp.fp += fpToGain;
            }
            abi.currentValue += spins;
            cpfp.cp -= spins;

            const skillTiers = Math.floor((((abi.currentValue - spins) % 5) + spins) / 5, 0);
            for (let ski = 0; ski < skillTiers; ski++) {
                this.$queryLearningSkillsDif(id, abi.currentValue - ski * 5).show().addClass("GETSK");
            }

            if (skillTiers > 0) {
                Search($('#WORDS1').val(), 1);
            }
            this.applyAbility(id);
            this.applyCPFP();

            return true;
        };

        fn.prototype.spinDown = function (id, spins) {
            if (spins && spins <= 0) {
                return false;
            }
            spins = spins || 1;

            const abi = this.abilities[id];
            if (abi.currentValue <= 0) {
                return false;
            }
            spins = Math.min(abi.currentValue, spins);

            const cpfp = abi.isInou() ? this.inou : this.seisan;
            const fpToLose = Math.min(abi.initialValue - abi.currentValue, spins);
            if(fpToLose > 0) {
                cpfp.fp -= fpToLose;
            }
            abi.currentValue -= spins;
            cpfp.cp += spins;

            const skillTiers = Math.floor(((abi.currentValue % 5) + spins) / 5, 0);
            for (let ski = 0; ski < skillTiers; ski++) {
                this.$queryLearningSkillsDif(id, abi.currentValue + spins - ski * 5).show().removeClass("GETSK");
            }

            if (skillTiers > 0) {
                Search($('#WORDS1').val(), 1);
            }
            this.applyAbility(id);
            this.applyCPFP();

            return true;
        };

        fn.prototype.canSubmit = function() {
            if (this.inou.cp < 0 || this.inou.fp < 0 || this.seisan.cp < 0 || this.seisan.fp < 0) {
                return false;
            }
            return true;
        };

        return fn;
    })();

    function showAllSkills () {
        _$allSkills.show();
    }


    const _aMng = new AbilityManager();

    function spinnerClickEvent(evt) {
        //ctrlキー押下時は5回分スピンした扱いにする
        //shiftキー押下時は10回分スピンした扱いにする
        //ctrl+shiftキー押下時は20回分スピンした扱いにする
        let spins = 1;
        if (evt.shiftKey && evt.ctrlKey) {
            spins = 20;
        }
        else if (evt.shiftKey) {
            spins = 10;
        }
        else if (evt.ctrlKey) {
            spins = 5;
        }

        const abilityId = parseInt($(this).data("AbilityId"), 10);
        const spinMode = SpinModeTypes[$(this).data("mode")];

        let spinnedSuccessfully;
        if (spinMode === SpinModeTypes.up) {
            spinnedSuccessfully = _aMng.spinUp(abilityId, spins);
        }
        else if (spinMode === SpinModeTypes.down) {
            spinnedSuccessfully = _aMng.spinDown(abilityId, spins);
        }
        else {
            throw new Error("正体不明のスピナーイベントが検出されました。");
        }

        if (!spinnedSuccessfully) {
            return false;
        }

        if (_aMng.canSubmit()) {
            $("input[type=submit]").prop("disabled", false).css("opacity", "1");
        }
        else {
            $("input[type=submit]").prop("disabled", true).css("opacity", "0.5");
        }
    }

    $("img[src='p/sminus.png'],img[src='p/splus.png']").each((i, e) => {
        const clk = $(e).prop("onclick").toString();
        const m = /^spinner\((\d+),'(up|down)'\);$/m.exec(clk);
        const abilityId = m[1];
        const mode = m[2];
        $(e).data("AbilityId", abilityId).data("mode", mode);
    }).prop("onclick", null)
      .on("click", spinnerClickEvent);

    $("form").on("submit", () => {
        if (!_aMng.canSubmit()) {
            //alert("CPあるいはFPがマイナス値のため宣言を送信できません。");
            return false;
        }
        return true;
    });

    $("form[name='act']>dl:first").find("br:last").before("\nCtrlキーを押しながらクリックで5CP、Shiftキーで10CP、Ctrl+Shiftキーで20CP分のLVを一度に変更できます。");
})(jQuery);