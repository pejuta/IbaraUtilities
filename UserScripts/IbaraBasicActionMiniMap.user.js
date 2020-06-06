// ==UserScript==
// @name         IbaraBasicActionMiniMap
// @namespace    https://twitter.com/11powder
// @version      0.1.9
// @description  マップ上にあなたの現在位置を表示します。
// @include      /^http:\/\/lisge\.com\/ib\/act_main\.php.*?$/
// @updateURL    https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraBasicActionMiniMap.user.js
// @downloadURL  https://pejuta.github.io/IbaraUtilities/UserScripts/IbaraBasicActionMiniMap.user.js
// @grant        none
// ==/UserScript==
!function(t){var n={};function e(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)e.d(r,a,function(n){return t[n]}.bind(null,a));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=6)}([function(t,n){t.exports='<div id="MiniMapCnt">\r\n    <table id="MiniMap">\r\n        <tbody>\r\n        <tr>\r\n            <td><a href="http://lisge.com/ib/k/now/map1.html" target="_blank"><img src="./p/hazamap1.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map2.html" target="_blank"><img src="./p/hazamap2.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map3.html" target="_blank"><img src="./p/hazamap3.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map4.html" target="_blank"><img src="./p/hazamap4.png"></a></td>\r\n        </tr>\r\n        <tr>\r\n            <td><a href="http://lisge.com/ib/k/now/map5.html" target="_blank"><img src="./p/hazamap5.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map6.html" target="_blank"><img src="./p/hazamap6.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map7.html" target="_blank"><img src="./p/hazamap7.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map8.html" target="_blank"><img src="./p/hazamap8.png"></a></td>\r\n        </tr>\r\n        <tr>\r\n            <td><a href="http://lisge.com/ib/k/now/map9.html" target="_blank"><img src="./p/hazamap9.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map10.html" target="_blank"><img src="./p/hazamap10.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map11.html" target="_blank"><img src="./p/hazamap11.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map12.html" target="_blank"><img src="./p/hazamap12.png"></a></td>\r\n        </tr>\r\n        <tr>\r\n            <td><a href="http://lisge.com/ib/k/now/map13.html" target="_blank"><img src="./p/hazamap13.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map14.html" target="_blank"><img src="./p/hazamap14.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map15.html" target="_blank"><img src="./p/hazamap15.png"></a></td>\r\n            <td><a href="http://lisge.com/ib/k/now/map16.html" target="_blank"><img src="./p/hazamap16.png"></a></td>\r\n        </tr>\r\n        </tbody>\r\n    </table>\r\n    <div id="CntCourse">\r\n        <div class="MapCourse">\r\n            <span class="MapCourseIco"></span>\r\n            <div class="MapCourse">\r\n                <span class="MapCourseIco"></span>\r\n                <div class="MapCourse">\r\n                    <span class="MapCourseIco"></span>\r\n                    <div class="MapCourse">\r\n                        <span class="MapCourseIco"></span>\r\n                        <div class="MapCourse">\r\n                            <span class="MapCourseIco"></span>\r\n                            <div class="MapCourse">\r\n                                <span class="MapCourseIco Goal"></span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id="MapShadow"></div>\r\n</div>'},function(t,n,e){var r=e(2);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};e(4)(r,a);r.locals&&(t.exports=r.locals)},function(t,n,e){(t.exports=e(3)(!1)).push([t.i,'@charset "utf-8";\r\n\r\n#MiniMapCnt {\r\n    width: 325px;\r\n    height: 325px;\r\n    position: relative;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n    line-height: 0;\r\n    background-color: #200000;\r\n}\r\n\r\n#MiniMap {\r\n    position: absolute;\r\n    left: 150px;\r\n    top: 150px;\r\n    border-collapse: collapse; border-spacing: 0;\r\n}\r\n\r\n#MiniMap td, #MiniMap th {\r\n    padding: 0;\r\n}\r\n\r\n#MiniMap img {\r\n    width: 498px;\r\n    height: 498px;\r\n    object-fit: none;\r\n    margin: 1px;\r\n}\r\n\r\n#CntCourse {\r\n    width: 0;\r\n    height: 0;\r\n    position: absolute;\r\n    left: 150px;\r\n    top: 150px;\r\n    font-size: 25px;\r\n    line-height: 100%;\r\n    vertical-align: middle;\r\n}\r\n\r\n.MapCourse {\r\n    width: 25px;\r\n    height: 25px;\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 0px;\r\n    pointer-events: none;\r\n}\r\n.MapCourse.Top > .MapCourse {\r\n    top: -25px;\r\n    left: 0px;\r\n}\r\n.MapCourse.Right > .MapCourse {\r\n    top: 0px;\r\n    left: 25px;\r\n}\r\n.MapCourse.Bottom > .MapCourse {\r\n    top: 25px;\r\n    left: 0px;\r\n}\r\n.MapCourse.Left > .MapCourse {\r\n    top: 0px;\r\n    left: -25px;\r\n}\r\n.MapCourse.Final > .MapCourse {\r\n    visibility: hidden;\r\n}\r\n\r\n.MapCourseIco::after {\r\n    display: inline-block;\r\n    width: 25px;\r\n    height: 25px;\r\n}\r\n.MapCourseIco.Pause::after {\r\n    content: "\\1F4A4";\r\n    color: transparent;\r\n    text-shadow: 0 0 0 aqua;\r\n    font-family: "Segoe UI Symbol", sans-serif;\r\n}\r\n.MapCourseIco.Step::after {\r\n    content: "\\1F463";\r\n    color: transparent;\r\n    text-shadow: 0 0 0 orange;\r\n    font-family: "Segoe UI Symbol", sans-serif;\r\n}\r\n.Paw .MapCourseIco.Step::after {\r\n    content: "\\1F43E";\r\n}\r\n.MapCourse.Right > .MapCourseIco.Step::after {\r\n    transform: rotate(90deg);\r\n}\r\n.MapCourse.Bottom > .MapCourseIco.Step::after {\r\n    transform: rotate(180deg);\r\n}\r\n.MapCourse.Left > .MapCourseIco.Step::after {\r\n    transform: rotate(270deg);\r\n}\r\n.MapCourseIco.Taxi::after {\r\n    content: "\\1F695";\r\n    color: inherit;\r\n    text-shadow: none;\r\n}\r\n.MapCourseIco.Goal::after {\r\n    content: "\\1F6A9";\r\n    color: inherit;\r\n    text-shadow: none;\r\n}\r\n\r\n#MapShadow {\r\n    width: 325px;\r\n    height: 325px;\r\n    position: absolute;\r\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUUAAAFFAQMAAABBum0eAAAABGdBTUEAALGPC/xhBQAAAAZQTFRFAAAAAAAApWe5zwAAAAJ0Uk5TAHwvIPAvAAAAe0lEQVRo3u3asQmAQAxA0TiBIziKo+lojuIIlhaCgmBxENE+75fHqwN3lzh/tgdJkpXlEdGRJEk2B08kSZJ3W7RNJElWl2tkjSRJ1pVLvDeQJFlRzvFVT5JkOWl+kiSZSncukiRT6Z2WJEk/tiRJ/pf2wUiStBlOkmQmLyN6X7x1dDYTAAAAAElFTkSuQmCC");\r\n    pointer-events: none;\r\n}',""])},function(t,n,e){"use strict";t.exports=function(t){var n=[];return n.toString=function(){return this.map((function(n){var e=function(t,n){var e=t[1]||"",r=t[3];if(!r)return e;if(n&&"function"==typeof btoa){var a=(i=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),o=r.sources.map((function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"}));return[e].concat(o).concat([a]).join("\n")}var i;return[e].join("\n")}(n,t);return n[2]?"@media "+n[2]+"{"+e+"}":e})).join("")},n.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},a=0;a<this.length;a++){var o=this[a][0];null!=o&&(r[o]=!0)}for(a=0;a<t.length;a++){var i=t[a];null!=i[0]&&r[i[0]]||(e&&!i[2]?i[2]=e:e&&(i[2]="("+i[2]+") and ("+e+")"),n.push(i))}},n}},function(t,n,e){var r,a,o={},i=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===a&&(a=r.apply(this,arguments)),a}),s=function(t,n){return n?n.querySelector(t):document.querySelector(t)},p=function(t){var n={};return function(t,e){if("function"==typeof t)return t();if(void 0===n[t]){var r=s.call(this,t,e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}n[t]=r}return n[t]}}(),l=null,c=0,d=[],u=e(5);function f(t,n){for(var e=0;e<t.length;e++){var r=t[e],a=o[r.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](r.parts[i]);for(;i<r.parts.length;i++)a.parts.push(x(r.parts[i],n))}else{var s=[];for(i=0;i<r.parts.length;i++)s.push(x(r.parts[i],n));o[r.id]={id:r.id,refs:1,parts:s}}}}function h(t,n){for(var e=[],r={},a=0;a<t.length;a++){var o=t[a],i=n.base?o[0]+n.base:o[0],s={css:o[1],media:o[2],sourceMap:o[3]};r[i]?r[i].parts.push(s):e.push(r[i]={id:i,parts:[s]})}return e}function m(t,n){var e=p(t.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=d[d.length-1];if("top"===t.insertAt)r?r.nextSibling?e.insertBefore(n,r.nextSibling):e.appendChild(n):e.insertBefore(n,e.firstChild),d.push(n);else if("bottom"===t.insertAt)e.appendChild(n);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var a=p(t.insertAt.before,e);e.insertBefore(n,a)}}function g(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var n=d.indexOf(t);n>=0&&d.splice(n,1)}function v(t){var n=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var r=function(){0;return e.nc}();r&&(t.attrs.nonce=r)}return b(n,t.attrs),m(t,n),n}function b(t,n){Object.keys(n).forEach((function(e){t.setAttribute(e,n[e])}))}function x(t,n){var e,r,a,o;if(n.transform&&t.css){if(!(o="function"==typeof n.transform?n.transform(t.css):n.transform.default(t.css)))return function(){};t.css=o}if(n.singleton){var i=c++;e=l||(l=v(n)),r=y.bind(null,e,i,!1),a=y.bind(null,e,i,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=function(t){var n=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",b(n,t.attrs),m(t,n),n}(n),r=A.bind(null,e,n),a=function(){g(e),e.href&&URL.revokeObjectURL(e.href)}):(e=v(n),r=M.bind(null,e),a=function(){g(e)});return r(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;r(t=n)}else a()}}t.exports=function(t,n){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(n=n||{}).attrs="object"==typeof n.attrs?n.attrs:{},n.singleton||"boolean"==typeof n.singleton||(n.singleton=i()),n.insertInto||(n.insertInto="head"),n.insertAt||(n.insertAt="bottom");var e=h(t,n);return f(e,n),function(t){for(var r=[],a=0;a<e.length;a++){var i=e[a];(s=o[i.id]).refs--,r.push(s)}t&&f(h(t,n),n);for(a=0;a<r.length;a++){var s;if(0===(s=r[a]).refs){for(var p=0;p<s.parts.length;p++)s.parts[p]();delete o[s.id]}}}};var w,C=(w=[],function(t,n){return w[t]=n,w.filter(Boolean).join("\n")});function y(t,n,e,r){var a=e?"":r.css;if(t.styleSheet)t.styleSheet.cssText=C(n,a);else{var o=document.createTextNode(a),i=t.childNodes;i[n]&&t.removeChild(i[n]),i.length?t.insertBefore(o,i[n]):t.appendChild(o)}}function M(t,n){var e=n.css,r=n.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}function A(t,n,e){var r=e.css,a=e.sourceMap,o=void 0===n.convertToAbsoluteUrls&&a;(n.convertToAbsoluteUrls||o)&&(r=u(r)),a&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var i=new Blob([r],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(i),s&&URL.revokeObjectURL(s)}},function(t,n){t.exports=function(t){var n="undefined"!=typeof window&&window.location;if(!n)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var e=n.protocol+"//"+n.host,r=e+n.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(t,n){var a,o=n.trim().replace(/^"(.*)"$/,(function(t,n){return n})).replace(/^'(.*)'$/,(function(t,n){return n}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?t:(a=0===o.indexOf("//")?o:0===o.indexOf("/")?e+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(a)+")")}))}},function(t,n,e){"use strict";var r;e.r(n),function(t){t[t.None=0]="None",t[t.Top=1]="Top",t[t.Right=2]="Right",t[t.Bottom=3]="Bottom",t[t.Left=4]="Left"}(r||(r={}));class a{constructor(t,n,e){if("string"==typeof t){if(this.div=t,this.divIndex=a.divIndices[t],void 0===this.divIndex)throw new Error(`"${t}"は不正です。`);this.x=n.charCodeAt(0)-65,this.y=parseInt(e,10)-1}else{if(this.divIndex=t,this.div=a.divNames[t],void 0===this.div)throw new Error(`区番号${t}は不正です。`);this.x=n,this.y=e}}static tryExtractFirst(t){const n=this.divExtractingPattern.exec(t);return n?new a(n[1],n[2],n[3]):null}static tryExtractAll(t){const n=t.match(this.divExtractingAllPattern);return n?n.map(t=>this.parse(t)):null}static parse(t){const n=this.divParsingPattern.exec(t);if(null===n)throw new Error("位置情報テキストが正常に解析できませんでした。");return new a(n[1],n[2],n[3])}static offset(t,n,e){let o,i;if("number"==typeof e)o=n,i=e;else{const t=function(t){let n,e;switch(t){case r.Top:n=0,e=-1;break;case r.Right:n=1,e=0;break;case r.Bottom:n=0,e=1;break;case r.Left:n=-1,e=0;break;default:n=0,e=0}return{x:n,y:e}}(n);o=t.x,i=t.y}let s=t.x+o,p=t.y+i,l=t.divIndex;const c=Math.floor(s/20);if(s<0){if(t.divColumn+c<0)return null;s=s%20+20,l+=c}else if(s>=20){if(t.divColumn+c>3)return null;s%=20,l+=c}const d=Math.floor(p/20);if(p<0){if(t.divRow+d<0)return null;p=p%20+20,l-=4*d}else if(p>=20){if(t.divRow+d>3)return null;p%=20,l+=4*d}return new a(l,s,p)}get divRow(){return Math.floor(this.divIndex/4)}get divColumn(){return this.divIndex%4}offset(t,n){return a.offset(this,t,n)}toString(){return`${this.div}${String.fromCharCode(this.x+65)}-${this.y+1}`}}a.divNames=["チナミ区","ヒノデ区","マガサ区","ミナト区","カミセイ区","ウシ区","リュウジン区","アライ区","オオキタ区","カスミ区","コヌマ区","タニモリ区","シモヨメ区","ウラド区","ツクナミ区","マシカ区"],a.divIndices=a.divNames.reduce((t,n,e)=>(t[n]=e,t),{}),a.divExtractingAllPattern=new RegExp(`(?:^|\\b)(?:${a.divNames.join("|")}) ?(?:[A-Z])-?(?:\\d{1,2})`,"g"),a.divExtractingPattern=new RegExp(`(?:^|\\b)(${a.divNames.join("|")}) ?([A-Z])-?(\\d{1,2})`),a.divParsingPattern=new RegExp(`^(${a.divNames.join("|")}) ?([A-Z])-?(\\d{1,2})$`);var o,i=e(0),s=e.n(i),p=(e(1),function(t,n,e,r){return new(e||(e=Promise))((function(a,o){function i(t){try{p(r.next(t))}catch(t){o(t)}}function s(t){try{p(r.throw(t))}catch(t){o(t)}}function p(t){var n;t.done?a(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(i,s)}p((r=r.apply(t,n||[])).next())}))});o=window.jQuery,p(void 0,void 0,void 0,(function*(){function t(){const t=a.tryExtractFirst(o("select[name='dt_taxi']>option:selected").text());return t||function(){const t=o("b.G3").filter((t,n)=>"転送と移動、パーティ結成"===n.innerHTML).next("span.B2").next("span.P2").children("a").first();return a.parse(t.html())}()}function n(){const n=t();null!==n&&o("#MiniMap").css({left:150-25*n.x-500*n.divColumn+"px",top:150-25*n.y-500*n.divRow+"px"})}function e(){const t=o("#IDO > select[name^=dt_ido]"),n=o(".MapCourse").removeClass("Paw Top Right Bottom Left Final"),e=o(".MapCourseIco").removeClass("Pause Step Taxi");32*Math.random()<1&&o(".MapCourse").addClass("Paw");for(let r=0;r<5;r++)switch(t.eq(r).val()){case"0":e.eq(r).addClass("Pause");break;case"1":e.eq(r).addClass("Step"),n.eq(r).addClass("Top");break;case"2":e.eq(r).addClass("Step"),n.eq(r).addClass("Right");break;case"3":e.eq(r).addClass("Step"),n.eq(r).addClass("Bottom");break;case"4":e.eq(r).addClass("Step"),n.eq(r).addClass("Left");break;case"5":e.eq(r).addClass("Taxi"),n.eq(r).addClass("Final"),r=5}}o("#IDO").after(s.a),o("select[name='dt_taxi']").on("change",n),o("select[name^=dt_ido]").on("change",e),yield n(),e()}))}]);