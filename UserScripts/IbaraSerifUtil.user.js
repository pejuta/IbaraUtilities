// ==UserScript==
// @name        IbaraSerifUtil
// @namespace   https://twitter.com/11powder
// @description セリフをどんどん入れよう！
// @include     http://lisge.com/ib/*.php*
// @version     1.0.0.12
// @updateURL   https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraSerifUtil.user.js
// @downloadURL https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraSerifUtil.user.js
// @grant       none
// ==/UserScript==
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}([function(e,t){e.exports='　<span class="B2">－　－　－　－　－　－　O R　－　－　－　－　－　－</span><br>\r\n'},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var i=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),s=r.sources.map((function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"}));return[n].concat(s).concat([i]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n})).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var s=this[i][0];null!=s&&(r[s]=!0)}for(i=0;i<e.length;i++){var a=e[i];null!=a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){var r,i,s={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===i&&(i=r.apply(this,arguments)),i}),o=function(e,t){return t?t.querySelector(e):document.querySelector(e)},c=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=o.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),l=null,u=0,p=[],h=n(9);function f(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=s[r.id];if(i){i.refs++;for(var a=0;a<i.parts.length;a++)i.parts[a](r.parts[a]);for(;a<r.parts.length;a++)i.parts.push(w(r.parts[a],t))}else{var o=[];for(a=0;a<r.parts.length;a++)o.push(w(r.parts[a],t));s[r.id]={id:r.id,refs:1,parts:o}}}}function d(e,t){for(var n=[],r={},i=0;i<e.length;i++){var s=e[i],a=t.base?s[0]+t.base:s[0],o={css:s[1],media:s[2],sourceMap:s[3]};r[a]?r[a].parts.push(o):n.push(r[a]={id:a,parts:[o]})}return n}function v(e,t){var n=c(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=p[p.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),p.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var i=c(e.insertAt.before,n);n.insertBefore(t,i)}}function b(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=p.indexOf(e);t>=0&&p.splice(t,1)}function g(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=function(){0;return n.nc}();r&&(e.attrs.nonce=r)}return m(t,e.attrs),v(e,t),t}function m(e,t){Object.keys(t).forEach((function(n){e.setAttribute(n,t[n])}))}function w(e,t){var n,r,i,s;if(t.transform&&e.css){if(!(s="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=s}if(t.singleton){var a=u++;n=l||(l=g(t)),r=E.bind(null,n,a,!1),i=E.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",m(t,e.attrs),v(e,t),t}(t),r=x.bind(null,n,t),i=function(){b(n),n.href&&URL.revokeObjectURL(n.href)}):(n=g(t),r=S.bind(null,n),i=function(){b(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=d(e,t);return f(n,t),function(e){for(var r=[],i=0;i<n.length;i++){var a=n[i];(o=s[a.id]).refs--,r.push(o)}e&&f(d(e,t),t);for(i=0;i<r.length;i++){var o;if(0===(o=r[i]).refs){for(var c=0;c<o.parts.length;c++)o.parts[c]();delete s[o.id]}}}};var $,y=($=[],function(e,t){return $[e]=t,$.filter(Boolean).join("\n")});function E(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,i);else{var s=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(s,a[t]):e.appendChild(s)}}function S(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function x(e,t,n){var r=n.css,i=n.sourceMap,s=void 0===t.convertToAbsoluteUrls&&i;(t.convertToAbsoluteUrls||s)&&(r=h(r)),i&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var a=new Blob([r],{type:"text/css"}),o=e.href;e.href=URL.createObjectURL(a),o&&URL.revokeObjectURL(o)}},function(e,t){e.exports="<div class='Preview'><div class='Y3 PreviewHeader'>《{PREVIEW_TYPE}プレビュー》 <a href='#'> [Help] </a></div><span class=\"PreviewBody\"></span></div>"},function(e,t){e.exports='<div class="SE1"><table class="BLK0"><tr valign="TOP">\r\n   <td width="60"><img src=\'{ICON_URL}\' class=\'IC\'></td>\r\n   <td style="color:#CC8844">{SERIF_HTML}</td>\r\n</tr></table></div><div class="CL"></div>'},function(e,t){e.exports="<div class='SE2'>【ERROR】書き込み内容は{MAX_CHARS}文字以内です！（現在{CHARS}文字）</div>"},function(e,t){e.exports="<div style='position: absolute; z-index: 2;'><div class='SE3'><table cellpadding='0' cellspacing='0' class='SE0'><tr valign='TOP'>\r\n    <td width='70'><img src='p/iba_icon.png' class='RE2' alt='RE'></td>\r\n    <td class='F3'>\r\n        <a><span class='Y4'>{SCRIPT_NAME}の機能・使い方</span></a><br>\r\n            <div style='margin:10px;'>\r\n            ・入力した発言内容を自動的に解析してプレビューを表示します。<br>\r\n            ・<b class='O3'>Ctrl+Shift+Enterキー</b>を押すと、送信ボタンを押したのと同様にその発言内容を送信します。<br>\r\n            ・<b class='O3'>Tab</b>キーを押すと、欠けている装飾閉じタグ(<b class='Y3'>&lt;/B&gt;, &lt;/f4&gt;</b>など)を自動的に補完します。<br>\r\n            ・タグ名(<b class='Y3'>i4, S</b>など)を入力してからTabキーを押すと、指定の装飾タグを自動入力します。<br>\r\n            　<span class='P3'>例： f5 ⇒ &lt;f5&gt&lt;/f5&gt</span><br>\r\n            <br>　(hint) 入力自動補完に対応しているタグ名の一覧（小文字可、半角のみ）：<br><b class='Y3'>\r\n                　　 F[1-7] B B[1-7] I I[1-7] S S[1-7] U U[1-7]\r\n            </b>\r\n            </div>\r\n    </td>\r\n</tr></table></div></div>"},function(e,t,n){var r=n(8);"string"==typeof r&&(r=[[e.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(2)(r,i);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(1)(!1)).push([e.i,'@charset "utf-8";\r\n\r\n.SE1 {\r\n    max-width: 850px;\r\n}\r\n',""])},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(e,t){var i,s=t.trim().replace(/^"(.*)"$/,(function(e,t){return t})).replace(/^'(.*)'$/,(function(e,t){return t}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(s)?e:(i=0===s.indexOf("//")?s:0===s.indexOf("/")?n+s:r+s.replace(/^\.\//,""),"url("+JSON.stringify(i)+")")}))}},function(e,t,n){var r=n(11);"string"==typeof r&&(r=[[e.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(2)(r,i);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(1)(!1)).push([e.i,'@charset "utf-8";\r\n\r\n#PreviewFooter {\r\n    margin-bottom: 15px;\r\n    max-width: 870px;\r\n    max-height: 50vh;\r\n}\r\n\r\n#FooterToggle {\r\n    height: 20px;\r\n    font-size: 14px;\r\n    font-weight: bold;\r\n    text-align: left;\r\n}\r\n\r\n#FooterBody {\r\n    overflow-y: scroll;\r\n    max-height: calc(50vh - 20px);\r\n}',""])},function(e,t,n){"use strict";function r(e,t){let n=e.toString();for(const e in t)void 0!==t[e]&&null!==t[e]&&(n=n.replace(new RegExp("{"+e+"}","g"),t[e].toString()));return n}n.r(t);const i={"&":"&amp;","'":"&#x27;",'"':"&quot;","`":"&#x60;","<":"&lt;",">":"&gt;"},s=new RegExp(`[${Object.keys(i).join("")}]`,"g");function a(e){return e.replace(s,e=>i[e])}const o=/(?:\r\n|\r|\n)/g,c=/<br>/gi;function l(e){return e?e.replace(o,"<br>"):e}function u(e){return e?e.replace(c,"\r\n"):e}const p=function e(t){const n=Object.getOwnPropertyNames(t);for(const r of n){const n=t[r];t[r]=n&&"object"==typeof n?e(n):n}return Object.freeze(t)}({F:{pattern:"F(?=\\d)",tagName:"span"},B:{pattern:"B",tagName:"b"},I:{pattern:"I",tagName:"i"},S:{pattern:"S",tagName:"s"},U:{pattern:"U",tagName:"u"}});let h=0;const f=[];for(const e in p)if(p.hasOwnProperty(e)){const t=p[e].pattern;h=t.length,f.push(t)}const d=h+1,v=f.join("|"),b="(?:"+v+")[1-7]?";function g(e,t,n,r){const i=p[t.toUpperCase()].tagName;return n?`<${i} class='F${n}'>${r}</${i}>`:`<${i}>${r}</${i}>`}const m=new RegExp(a("<"+("("+v+")([1-7]?)")+">(.*?)</\\1\\2>"),"ig");class w{constructor(){this.id=0,this.prevResolve=null}setDelay(e,t,...n){return new Promise((r,i)=>{this.id&&this.prevResolve&&(clearTimeout(this.id),this.prevResolve(null)),this.id=setTimeout(t=>{this.id=0,this.prevResolve=null,r(e.apply(null,t))},t,n),this.prevResolve=r})}static delay(e){return new Promise(t=>{setTimeout(()=>t(),e)})}}var y=n(3),E=n.n(y);class S{constructor(e){this.$preview=null,this.delayMS=e.delayMS,this.previewType=e.previewType,this.containerClass=e.containerClass,this.removePreviousPreview=e.removePreviousPreview,this.delayer=new w}buildDelayedEventCallback(e){const t=this.buildInstantEventCallback(e);return e=>{this.delayer.setDelay(()=>{t(e)},this.delayMS)}}buildInstantEventCallback(e){return t=>{this.insertPreview(e.targetSelector(t),e.type);const n=this.buildHtml(t);this.updatePreview(n)}}insertPreview(e,t){switch(t){case"insertBefore":this.$preview&&$(e).prev().is("."+S.PREVIEW_CONTAINER_CLASS_NAME)?this.$preview=$(e).prev():(this.$preview&&this.removePreviousPreview||(this.$preview=this.buildContainer()),this.$preview.insertBefore(e));break;case"insertAfter":this.$preview&&$(e).next().is("."+S.PREVIEW_CONTAINER_CLASS_NAME)?this.$preview=$(e).next():(this.$preview&&this.removePreviousPreview||(this.$preview=this.buildContainer()),this.$preview.insertAfter(e));break;case"prepend":this.$preview&&$(e).children().first().is("."+S.PREVIEW_CONTAINER_CLASS_NAME)?this.$preview=$(e).children().first():(this.$preview&&this.removePreviousPreview||(this.$preview=this.buildContainer()),this.$preview.prependTo(e));break;case"append":this.$preview&&$(e).children().last().is("."+S.PREVIEW_CONTAINER_CLASS_NAME)?this.$preview=$(e).children().last():(this.$preview&&this.removePreviousPreview||(this.$preview=this.buildContainer()),this.$preview.appendTo(e))}return this.$preview}updatePreview(e){this.$preview||this.throwNoPreviewContainerError(),this.$preview.find(".PreviewBody").html(e),e?this.$preview.show():this.$preview.hide()}showPreview(){this.$preview||this.throwNoPreviewContainerError(),this.$preview.show()}hidePreview(){this.$preview||this.throwNoPreviewContainerError(),this.$preview.hide()}buildContainer(){return this.$preview=$(`<div class="${S.PREVIEW_CONTAINER_CLASS_NAME}"/>`).html(r(E.a,{PREVIEW_TYPE:this.previewType})).addClass(this.containerClass),this.$preview}throwNoPreviewContainerError(){throw new Error("invalid operation: preview container have not inserted yet.")}}S.PREVIEW_CONTAINER_CLASS_NAME="PreviewContainer";const x=/^[ \r\n\t\v]+/,T=/[ 　]+$/;const I=/[\u{0}-\u{9}\u{B}\u{C}\u{E}-\u{1F}\u{10000}-\u{10FFFF}]/gu;class R extends S{constructor(e){super(e),this.userENo=(/IBR_KEY=.+?_(\d+)(?:;|$)/.exec(document.cookie)||[])[1]||null}static sanitizeText(e){return function(e,t=""){return e.replace(I,t)}(function(e,t=""){return e?(e=(e=e.replace(x,"")).replace(T,""))||t:e}(e,"?"),"?")}}R.DEFAULT_ICON="p/nii.png";var C="IbaraSerifUtil",P=200;class A{static extract(e=""){const t=$(`input[name^=dt_icai${e}]`).get().map(e=>e.value);localStorage.setItem(A.STORAGE_NAME+e,JSON.stringify(t))}static load(e=""){const t=localStorage.getItem(A.STORAGE_NAME+e);return t?JSON.parse(t):[]}}A.STORAGE_NAME=C+"_IconNicknames";var _=n(4),N=n.n(_),k=n(0),L=n.n(k),O=n(5),U=n.n(O);n(7);const B=/^\/((?:\+|-)?\d+)\//;class M extends R{constructor(e,t=!1,n={}){var r,i,s,a;super({delayMS:e,previewType:"セリフ",containerClass:"SerifPreview",removePreviousPreview:t}),this.delayMS=e,this.maxChars=M.DEFAULT_MAX_CHARS,this.iconUrls=null!=(r=n.iconUrls)?r:$("#ICONLIST img.IC").get().map(e=>{var t;return null!=(t=e.getAttribute("src"))?t:""}),this.iconNicknames=null!=(i=n.iconNicknames)?i:$("#ICONLIST img.IC").get().map(e=>{var t;return null!=(t=e.getAttribute("alt"))?t:""}),this.subIconNicknames=null!=(s=n.subIconNicknames)?s:A.load(),this.nickname=null!=(a=n.nickname)?a:$(".SHIDARI > table:first a.F2:first > b + br")[0].nextSibling.textContent}enableSerifPreview(e,t,n=(e=>e.nextElementSibling),r=(e=>e.previousElementSibling),i=!1){const s=this.buildDelayedEventCallback({targetSelector:e=>n(e.currentTarget),type:"insertAfter"}),a=this.buildDelayedEventCallback({targetSelector:e=>e.currentTarget,type:"insertAfter"}),o=(this.buildDelayedEventCallback({targetSelector:e=>e.currentTarget,type:"insertAfter"}),["icon",n]),c=["text",r];if(e.on({change:s},o),t.on({"focus input":a},c),i){const e=this.buildInstantEventCallback({targetSelector:e=>e.currentTarget,type:"insertAfter"}),n="TEMP_INSTANT",r={};r[n]=e,t.on(r,c).trigger(n).off(n)}return this}buildHtml(e){e.data[0];const t=e.data[1];let n,r;"icon"===e.data[0]?(r=$(e.currentTarget),n=$(t(e.currentTarget))):(n=$(e.currentTarget),r=$(t(e.currentTarget)));const i={$icon:r,$text:n};return this.formatPreviewHtml(i)}formatPreviewHtml(e){const t=R.sanitizeText(e.$text.val());return 0===t.length?t:t.length>this.maxChars?r(U.a,{CHARS:t.length,MAX_CHARS:this.maxChars}):this.formatSerifHtml(t,e)}formatSerifHtml(e,t){const n=t.$icon.val();let r=-1;/^\d+$/.test(n)&&(r=parseInt(n,10));const i=t.$name?t.$name.val():this.nickname,s=e.split("###"),a=[];let o=0;for(const e of s){const t=e.split("+++");if(""===t.join("")){o++;continue}const n=[];for(const e of t){const t=this.formatSingleBlockedSerifHtml(e,r,i);n.push(t)}a.push(n.join(""))}return o>0&&a.push(`<div class='NoSerif'>セリフなし(${(o/s.length*100).toFixed(0)}%)</div>`),a.join(L.a)}formatSingleBlockedSerifHtml(e,t,n){if(!e)return e;let i=t;const s=B.exec(e);s&&(i=parseInt(s[1],10),e=e.substring(s[0].length));const o=i in this.iconUrls?this.iconUrls[i]:R.DEFAULT_ICON;let c=this.subIconNicknames[i]||this.iconNicknames[i]||n;const u=/^@([^@]*?)@/.exec(e);return u&&(c=u[1],e=e.substring(u[0].length)),e=function(e){let t=a(e);t=l(t).replace(/&lt;br&gt;/gi,"<BR>");for(let e=0;e<2;e++)t=t.replace(/&lt;(([1-9][0-9]?)D([1-9][0-9]?[0-9]?))&gt;/i,"<span class='DX'>【 <b>$1</b>：[$2個の$3面ダイスを振る] 】</span>");return function(e,t,n){let r=e.toString();for(;;){if(!t.test(r))return r;r=r.replace(t,n)}}(t,m,g)}(e),c&&(e=`${a(c)}<br>「${e}」`),r(N.a,{ICON_URL:o,SERIF_HTML:e})}}function F(e,t,n){let r;r=n||t;const i=function(e,...t){return"touchstart"===e.type&&e.preventDefault(),r.apply(this,[e,...t])};return"string"==typeof t?e.on("click ontouchstart",t,i):e.on("click ontouchstart",i)}M.DATANAME_INITIAL_PREVIEW_HIDDEN="initial_preview_hidden",M.DEFAULT_MAX_CHARS=400;n(10);class H extends M{constructor(e){super(e,!0),this.$footer=null}enableMessagePreview(e,t,n,r,i=!1){this.$footer=$("<div id='PreviewFooter'><div id='FooterToggle'>▲▼ プレビュー表示切り替え</div><div id='FooterBody'></div></div>").prependTo(r),F(this.$footer.find("#FooterToggle"),(function(){const e=$(this).next();if("0px"===e.css("height")){const t=e.css("height","auto").height();e.css("height","0px").animate({height:t},200,()=>e.css("height","auto"))}else e.css("height",e.height()).animate({height:"0px"},200)}));const s=this.buildDelayedEventCallback({targetSelector:e=>this.$footer.find("#FooterBody")[0],type:"append"}),a={$icon:e,$text:t,$name:n};if(e.on({change:s},a),t.on({"input focus":s},a),n.on({"input focus":s},a),i){const e=this.buildInstantEventCallback({targetSelector:e=>this.$footer[0],type:"append"}),n="TEMP_INSTANT",r={};r[n]=e,t.on(r,a).trigger(n).off(n)}return this}buildHtml(e){return this.formatPreviewHtml(e.data)}}var j=n(6),D=n.n(j);class V{constructor(e){this.attachedElement=null,this.$help=$(r(D.a,{SCRIPT_NAME:e}));const t=this;this.onClickHandler=function(e){e.preventDefault();const n=this;t.attachedElement===n?(t.$help.hide(),t.attachedElement=null):(t.$help.insertAfter(n).show(),t.attachedElement=n)}}enable(e,t){t?F($(e),t,this.onClickHandler):F($(e),this.onClickHandler),F(this.$help,()=>{this.$help.hide(),this.attachedElement=null})}}class W{constructor(){}enable(e,t,n){let r="input[type='submit']";"string"==typeof n&&(r+="[value='"+n+"']");const i=this,s=function(e){const t=$(this).closest("form").find(r);i.submitWithCertainKeysDown(t,e)};return t?$(e).on("keydown",t,s):$(e).on("keydown",s),this}submitWithCertainKeysDown(e,t){13===t.which&&t.ctrlKey&&t.shiftKey&&(t.preventDefault(),e.first().trigger("click"))}}const Y=new RegExp("<("+b+")>","gi"),K=new RegExp("</("+b+")>","gi"),z=new RegExp("<?("+b+")>?$","i"),G=new RegExp("</("+b+")>$","i"),J=new RegExp("</?([^>]{0,"+d+"}?)$"),X=new RegExp(b,"i");class q{constructor(){}enable(e,t){const n=this,r=function(e){n.autoCompleteTag(this,e)};return t?$(e).on("keydown",t,r):$(e).on("keydown",r),this}autoCompleteTag(e,t){if(9===t.which){if(t.preventDefault(),e.selectionEnd&&e.selectionStart!==e.selectionEnd)return void e.setSelectionRange(e.selectionEnd,e.selectionEnd);if(this.insertOrnamentTags(e))return void $(e).trigger("input");this.insertLastUnclosedTagEnd(e)&&$(e).trigger("input")}else"/"===t.key&&this.completeLastUnclosedTagEnd(e)&&(t.preventDefault(),$(e).trigger("input"))}insertOrnamentTags(e){if("number"!=typeof e.selectionStart)return!1;if(e.selectionEnd&&e.selectionStart!==e.selectionEnd)return!1;const t=e.selectionStart,n=e.value.slice(0,t),r=e.value.slice(t),i=z.exec(n);if(!i)return!1;if(G.test(n))return!1;if(/^<[^<>]+?>$/.test(i[0]))return!1;const s=J.exec(n);if(s){const e=new RegExp("^([^<]{0,"+(d-s[1].length)+"}?)>").exec(r);if(e){if(X.test(s[1]+e[1]))return!1}}const a="<"+i[1]+"></"+i[1]+">";e.value=n.slice(0,-i[0].length)+a+r;const o=t-i[0].length+i[1].length+2;return e.setSelectionRange(o,o),!0}insertLastUnclosedTagEnd(e){if("number"!=typeof e.selectionStart)return!1;if(e.selectionEnd&&e.selectionStart!==e.selectionEnd)return!1;const t=e.selectionStart,n=e.value.slice(0,t),r=e.value.slice(t),i=this.findUnclosedTags(n,r);if(0===i.length)return!1;const s="</"+i[i.length-1]+">";return e.value=n+s+r,e.setSelectionRange(t,t+s.length),!0}findUnclosedTags(e,t){const n=e.match(Y);if(!n)return[];const r=n.map((e,t)=>e.slice(1,e.length-1)),i=(e+t).match(K);if(!i)return r;const s=i.map((e,t)=>e.slice(2,e.length-1));for(let e=s.length-1;e>=0;e--)for(let t=r.length-1;t>=0;t--)if(s[e]===r[t]){r.splice(t,1);break}return r}completeLastUnclosedTagEnd(e){if("number"!=typeof e.selectionStart)return!1;if(e.selectionStart<=0||e.selectionStart!==e.selectionEnd)return!1;const t=e.selectionStart,n=e.value.slice(0,t),r=e.value.slice(t);if("<"!==n[t-1])return!1;const i=this.findUnclosedTags(n,r);if(0===i.length)return!1;const s="/"+i[i.length-1]+">";return e.value=n+s+r,e.setSelectionRange(t+1,t+s.length),!0}}const Q=new RegExp("^[ \\r\\n\\t\\v]*<br>","i");const Z=new RegExp("(?:\\r\\n|\\r|\\n)$","i");class ee{constructor(e=!0){this.convertsOnEnable=e}enable(e,t,n={}){const r=e=>{!1!==n.insertsLeadingBRs&&ee.insertBRTagIfLeadingSpaces(e),!1!==n.convertsBRTagsIntoLineBreaks&&ee.brToLR(e.currentTarget)};if(t?$(e).on("input",t,r):$(e).on("input",r),this.convertsOnEnable){if(!1===n.convertsBRTagsIntoLineBreaks)return this;let r;r=t?$(t,e):$(e),r.each((e,t)=>{ee.brToLR(t)})}return this}static insertBRTagIfLeadingSpaces(e){const t=e.currentTarget,n=t.selectionStart;if(!n)return;const r=t.value.slice(0,n);if(!x.test(r))return;if(Q.test(r))return;const i=Z.exec(r);if(!i)return;const s=t.selectionEnd||n,a=i[0].length;t.value=t.value.slice(0,n-a)+"<br>"+t.value.substring(n),t.setSelectionRange(n+4-a,s+4-a)}static brToLR(e){const t=function(e){if(!e)return u(e);const t=Q.exec(e);return t?t[0]+u(e.substring(t[0].length)):u(e)}(e.value);if(t===e.value)return;const n=e.selectionStart,r=e.selectionEnd||n,i=e.value;e.value=t;const s=e.value.length-i.length;null!==n&&null!==r&&e.setSelectionRange(n+s,r+s)}}class te{constructor(e,t=te.DEFAULT_ROWS){this.defaultClassName=e,this.rows=t}enable(e,t){t=t||this.defaultClassName;const n=$(e).each((e,n)=>{te.insertTextareaBefore(n,this.rows,t)}).hide().prev().on("input",(function(){te.applyTextareaValueToPrevInput(this)}));return n.closest("form").on("submit",()=>{n.each((e,t)=>te.applyTextareaValueToPrevInput(t))}),this}static insertTextareaBefore(e,t,n){const r=$("<textarea/>").insertBefore(e)[0];r.className=e.className,n&&r.classList.add(n),r.style.width=e.style.width,r.rows=t,r.defaultValue=e.defaultValue,r.value=e.value,r.onkeydown=e.onkeydown,r.onkeyup=e.onkeyup,r.oninput=e.oninput,r.onchange=e.onchange,r.onfocus=e.onfocus}static applyTextareaValueToPrevInput(e){$(e).nextUntil("input").addBack().last().next()[0].value=function(e){if(!e)return l(e);const t=x.exec(e);return t?t[0]+l(e.substring(t[0].length)):l(e)}(e.value)}}te.DEFAULT_ROWS=3;class ne{constructor(){this.submitted=!1}enable(e,t){const n=function(e){this.submitted&&e.preventDefault(),this.submitted=!0};t?$(e).on("submit",t,n):$(e).on("submit",n)}}const re=$(L.a).filter("span.B2").first().html();function ie(e,t,n){let r,i,s;r=t?$(t,e):$(e),n?(i=r.find(".SE1 + div.CL").filter((e,t)=>0===$(t).parents(n).length),s=r.find("span.B2").filter((e,t)=>0===$(t).parents(n).length)):(i=r.find(".SE1 + div.CL"),s=r.find("span.B2")),i.prev().addBack().remove(),s.filter((e,t)=>t.innerHTML.startsWith(re)).next("br").addBack().remove()}(class{static select(){switch(document.location.pathname){case"/ib/act_main.php":case"/ib/act_trade.php":case"/ib/act_card.php":this.main();break;case"/ib/act_battle.php":this.battle();break;case"/ib/act_se.php":this.serif();break;case"/ib/act_aide.php":this.aide();break;case"/ib/act_chat.php":case"/ib/act_comu.php":this.chat();break;case"/ib/act_chara.php":this.chara();case"/ib/act_np.php":this.np()}}static main(){const e=$("input").filter((e,t)=>/^dt_.*?mes\d*$/.test(t.getAttribute("name")||"")),t=$("textarea[name='dt_nikki']");(new te).enable(e);const n=e.prev();(new W).enable(n.add(t)),(new q).enable(n.add(t)),(new ee).enable(n).enable(t,void 0,{convertsBRTagsIntoLineBreaks:!1}),this.enableSerifPreview({$serifIcons:n.prev(),$serifTexts:n,initialPreviewContainerSelector:"#NPVHD"})}static battle(){const e=$("input").filter((e,t)=>/^dt_.*?ms\d*(?:-\d*)?$/.test(t.getAttribute("name")||""));this.enableSerifFuncs(e);const t=this.getIdFromLocation();let n;t&&(n={nickname:$("a[href^='act_battle.php'] > span.Y3").html().slice(1,-1),subIconNicknames:A.load(t)}),this.enableSerifPreview({$serifIcons:e.map((e,t)=>$(t).prevUntil("select").last().prev()[0]),$serifTexts:e.prev(),iconToText:e=>$(e).nextUntil("textarea").last().next()[0],textToIcon:e=>$(e).prevUntil("select").last().prev()[0],characterInfo:n})}static serif(){const e=$("input").filter((e,t)=>/^dt_se\d*(?:-\d*)?$/.test(t.getAttribute("name")||""));this.enableSerifFuncs(e);const t=this.getIdFromLocation();let n;t&&(n={nickname:$("a[href^='act_se.php'] > span.Y3").html().slice(1,-1),subIconNicknames:A.load(t)}),this.enableSerifPreview({$serifIcons:e.prev().prev(),$serifTexts:e.prev(),characterInfo:n})}static aide(){const e=$("tr[id^='EDIT']").filter((e,t)=>/\d+$/.test(t.id)).get().map(e=>/\d+$/.exec(e.id)[0]);for(const t of e)A.extract(t)}static chat(){const e=$("textarea[name='dt_mes']");this.enableUtilityFuncs(e),this.enableMessagePreview(e.next().next(),e,e.next().next().next())}static np(){const e=$("input").filter((e,t)=>/^dt_.*?mes\d*$/.test(t.getAttribute("name")||""));this.enableSerifFuncs(e)}static chara(){A.extract()}static enableHelp(){new V(C).enable(document.body,".PreviewHeader")}static enableSerifFuncs(e){(new te).enable(e),this.enableUtilityFuncs(e.prev())}static enableUtilityFuncs(e){(new ne).enable(document.body,"form"),(new W).enable(e),(new q).enable(e),(new ee).enable(e)}static enableSerifPreview(e){this.enableHelp(),ie(document.body,void 0,e.initialPreviewContainerSelector),new M(P,!1,e.characterInfo).enableSerifPreview(e.$serifIcons,e.$serifTexts,e.iconToText,e.textToIcon,!0)}static enableMessagePreview(e,t,n){this.enableHelp(),new H(P).enableMessagePreview(e,t,n,t.closest("div"))}static getIdFromLocation(){if(!document.location.search)return;const e=/^a=(\d+)$/,t=document.location.search.substring(1).split("&").find(t=>e.test(t));return t?e.exec(t)[1]:void 0}}).select()}]);