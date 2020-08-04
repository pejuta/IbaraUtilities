// ==UserScript==
// @name        IbaraBSSkillTooltip
// @namespace   https://twitter.com/11powder
// @description 戦闘設定にスキル詳細をのせたツールチップを表示する
// @include     http://lisge.com/ib/act_battle.php*
// @version     1.0.0
// @updateURL   https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraBSSkillTooltip.user.js
// @downloadURL https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraBSSkillTooltip.user.js
// @grant       none
// ==/UserScript==
!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=5)}([function(t,n,e){var r=e(1);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};e(3)(r,o);r.locals&&(t.exports=r.locals)},function(t,n,e){(t.exports=e(2)(!1)).push([t.i,"#SkillTooltip {\r\n    position: absolute;\r\n    width: 50%;\r\n    background-color: black;\r\n    padding: 6px 9px;\r\n    white-space: pre-line;\r\n    pointer-events: none;\r\n}\r\n\r\n#SkillTooltip .SkillHeader {\r\n    width: 100%;\r\n    padding-bottom: 2px;\r\n    border-bottom: 1px #af1c33 dashed;\r\n    margin-bottom: 4px;\r\n}\r\n\r\n#SkillTooltip .SkillType {\r\n    font-weight: bold;\r\n}\r\n#SkillTooltip .SkillType.Active {\r\n    color: #CC3333;\r\n}\r\n#SkillTooltip .SkillType.Passive {\r\n    color: #999933;\r\n}\r\n\r\n#SkillTooltip .SkillBody {\r\n    line-height: 125%;\r\n}\r\n\r\n#SkillTooltip .SkillConditions {\r\n    color: #449966;\r\n}\r\n\r\n#SkillTooltip .SkillName {\r\n    font-weight: bold;\r\n}\r\n\r\n#SkillTooltip .PassiveTrigger {\r\n    color: #557799;\r\n    font-weight: bold;\r\n}\r\n\r\n#SkillTooltip .SkillEP {\r\n    color: #AA5500;\r\n    font-weight: bold;\r\n}\r\n\r\n#SkillTooltip .SkillSP {\r\n    color: #99CCCC;\r\n    font-weight: bold;\r\n}\r\n\r\n#SkillTooltip .SkillEffects {\r\n}\r\n",""])},function(t,n,e){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e=function(t,n){var e=t[1]||"",r=t[3];if(!r)return e;if(n&&"function"==typeof btoa){var o=(s=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=r.sources.map((function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"}));return[e].concat(i).concat([o]).join("\n")}var s;return[e].join("\n")}(n,t);return n[2]?"@media "+n[2]+"{"+e+"}":e})).join("")},n.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(o=0;o<t.length;o++){var s=t[o];null!=s[0]&&r[s[0]]||(e&&!s[2]?s[2]=e:e&&(s[2]="("+s[2]+") and ("+e+")"),n.push(s))}},n}},function(t,n,e){var r,o,i={},s=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),l=function(t,n){return n?n.querySelector(t):document.querySelector(t)},a=function(t){var n={};return function(t,e){if("function"==typeof t)return t();if(void 0===n[t]){var r=l.call(this,t,e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}n[t]=r}return n[t]}}(),c=null,u=0,f=[],p=e(4);function d(t,n){for(var e=0;e<t.length;e++){var r=t[e],o=i[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(g(r.parts[s],n))}else{var l=[];for(s=0;s<r.parts.length;s++)l.push(g(r.parts[s],n));i[r.id]={id:r.id,refs:1,parts:l}}}}function v(t,n){for(var e=[],r={},o=0;o<t.length;o++){var i=t[o],s=n.base?i[0]+n.base:i[0],l={css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(l):e.push(r[s]={id:s,parts:[l]})}return e}function h(t,n){var e=a(t.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=f[f.length-1];if("top"===t.insertAt)r?r.nextSibling?e.insertBefore(n,r.nextSibling):e.appendChild(n):e.insertBefore(n,e.firstChild),f.push(n);else if("bottom"===t.insertAt)e.appendChild(n);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=a(t.insertAt.before,e);e.insertBefore(n,o)}}function m(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var n=f.indexOf(t);n>=0&&f.splice(n,1)}function b(t){var n=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var r=function(){0;return e.nc}();r&&(t.attrs.nonce=r)}return y(n,t.attrs),h(t,n),n}function y(t,n){Object.keys(n).forEach((function(e){t.setAttribute(e,n[e])}))}function g(t,n){var e,r,o,i;if(n.transform&&t.css){if(!(i="function"==typeof n.transform?n.transform(t.css):n.transform.default(t.css)))return function(){};t.css=i}if(n.singleton){var s=u++;e=c||(c=b(n)),r=w.bind(null,e,s,!1),o=w.bind(null,e,s,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=function(t){var n=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",y(n,t.attrs),h(t,n),n}(n),r=x.bind(null,e,n),o=function(){m(e),e.href&&URL.revokeObjectURL(e.href)}):(e=b(n),r=T.bind(null,e),o=function(){m(e)});return r(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;r(t=n)}else o()}}t.exports=function(t,n){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(n=n||{}).attrs="object"==typeof n.attrs?n.attrs:{},n.singleton||"boolean"==typeof n.singleton||(n.singleton=s()),n.insertInto||(n.insertInto="head"),n.insertAt||(n.insertAt="bottom");var e=v(t,n);return d(e,n),function(t){for(var r=[],o=0;o<e.length;o++){var s=e[o];(l=i[s.id]).refs--,r.push(l)}t&&d(v(t,n),n);for(o=0;o<r.length;o++){var l;if(0===(l=r[o]).refs){for(var a=0;a<l.parts.length;a++)l.parts[a]();delete i[l.id]}}}};var S,k=(S=[],function(t,n){return S[t]=n,S.filter(Boolean).join("\n")});function w(t,n,e,r){var o=e?"":r.css;if(t.styleSheet)t.styleSheet.cssText=k(n,o);else{var i=document.createTextNode(o),s=t.childNodes;s[n]&&t.removeChild(s[n]),s.length?t.insertBefore(i,s[n]):t.appendChild(i)}}function T(t,n){var e=n.css,r=n.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}function x(t,n,e){var r=e.css,o=e.sourceMap,i=void 0===n.convertToAbsoluteUrls&&o;(n.convertToAbsoluteUrls||i)&&(r=p(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{type:"text/css"}),l=t.href;t.href=URL.createObjectURL(s),l&&URL.revokeObjectURL(l)}},function(t,n){t.exports=function(t){var n="undefined"!=typeof window&&window.location;if(!n)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var e=n.protocol+"//"+n.host,r=e+n.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(t,n){var o,i=n.trim().replace(/^"(.*)"$/,(function(t,n){return n})).replace(/^'(.*)'$/,(function(t,n){return n}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?e+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")}))}},function(t,n,e){"use strict";e.r(n);var r,o=function(t,n,e,r){return new(e||(e=Promise))((function(o,i){function s(t){try{a(r.next(t))}catch(t){i(t)}}function l(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(s,l)}a((r=r.apply(t,n||[])).next())}))};!function(t){t[t.Active=0]="Active",t[t.Passive=1]="Passive"}(r||(r={}));class i{constructor(){throw new Error("NotImplemented")}static load(){return o(this,void 0,void 0,(function*(){let t;try{t=yield(yield fetch(i.skillDataUrl)).json()}catch(t){return null}const n=new Map;for(const e of t){const t=i.MapRawSkill(e);n.set(t.name,t)}return n}))}static MapRawSkill(t){return{name:t.n,ep:t.ep,sp:t.sp,element:t.el,conditions:t.c,effects:t.ef,triggerIfPassive:t.pt}}}i.skillDataUrl="https://pejuta.github.io/IbaraUtilities/Files/Data/skills.min.json";e(0);(function(t,n,e,r){new(e||(e=Promise))((function(o,i){function s(t){try{a(r.next(t))}catch(t){i(t)}}function l(t){try{a(r.throw(t))}catch(t){i(t)}}function a(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(s,l)}a((r=r.apply(t,n||[])).next())}))})(void 0,void 0,void 0,(function*(){function t(t,r,o){let i;if(i="skill"==o?function(t){const e=n.exec($(t).children("option:selected").html());return e?e[1]:null}(t):function(t){const n=e.exec($(t).children("option:selected").html());return n?n[1]:null}(t),!i)return;const s=function(t,n){const e=n.get(t);if(!e)return null;const r=e.triggerIfPassive?"Passive":"Active",o=`<span class="SkillType ${r}">[${r}]</span>`,i=e.triggerIfPassive?`<span class="PassiveTrigger">${e.triggerIfPassive}</span>`:"",s=e.element>0?" Z"+e.element:"",l=e.ep>0?`<span class="SkillEP">【EP：${e.ep}】</span>`:"",a=e.triggerIfPassive?"":`<span class="SkillSP">［SP：${e.sp}］</span>`;let c=l+a+i;return c&&(c+="\r\n"),`<div class="SkillHeader"><span class="SkillName${s}">${e.name}</span> ${o}<span class="SkillConditions">（習得条件：${e.conditions}）</span></div>`+`<div class="SkillBody">${c}<span class="SkillEffects">${e.effects}</span></div>`}(i,r);s&&(t.dataset.tooltip=s)}const n=/^(?:【EP\d+】)?(?:［SP\d+］|【[^】]+】) (.+)Lv\d+$/,e=/^.+? \(([^／]+)／SP\d+\)$/,r=$('<div id="SkillTooltip"/>').appendTo(document.body),o=yield i.load();if(!o)return;const s=$("select[sel='SK'][name^='dt_skill']"),l=$("select[sel='SK'][name^='dt_cards']");s.on("change",n=>t(n.currentTarget,o,"skill")).each((n,e)=>t(e,o,"skill")),l.on("change",n=>t(n.currentTarget,o,"card")).each((n,e)=>t(e,o,"card")),s.add(l).on("mousemove",t=>function(t,n,e){const o=t.dataset.tooltip;o&&r.html(o).css({left:n,top:e}).show()}(t.currentTarget,t.pageX,t.pageY)).on("mouseout",t=>{r.hide()})}))}]);