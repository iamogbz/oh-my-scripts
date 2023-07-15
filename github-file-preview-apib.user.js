// ==UserScript==
// @name GitHub File Preview APIB
// @description Render Apiary blueprint files in github
// @version 1.2.4
// @author iamogbz
// @homepage https://github.com/iamogbz/oh-my-scripts
// @supportURL https://github.com/iamogbz/oh-my-scripts/issues
// @include *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/1.2.4/github-file-preview-apib.user.js
// @grant GM_xmlhttpRequest
// @icon https://github.com/iamogbz/oh-my-scripts/raw/master/assets/monkey_128.png
// @namespace iamogbz/oh-my-scripts
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.4/lib/dom.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.4/lib/github-file.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.4/lib/github.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.4/lib/paths.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.4/lib/request.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.4/lib/ns.js
// @updateURL https://github.com/iamogbz/oh-my-scripts/raw/release/github-file-preview-apib.user.js
// ==/UserScript==

(()=>{"use strict";var e,t={7882:function(e,t,r){var n,o=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),a=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};Object.defineProperty(t,"__esModule",{value:!0});var i,l=r(1543),c=r(1603);(new(function(e){function t(){var t=(0,l.filePreviewNS)(i||(i=a(["extend-apib"],["extend-apib"])));return e.call(this,t,t,new Set(["apib"]))||this}return o(t,e),t.prototype.prepareHTML=function(e){var t=btoa(e);return(0,c.request)("https://d31myey2oeipxs.cloudfront.net/v1",{headers:{"X-Blueprint":t}}).then((function(e){var t;return null===(t=e.text)||void 0===t?void 0:t.call(e)})).then((function(e){return null==e?void 0:e.replace(/<a/g,'<a target="_blank"').replace(/href="#/g,'style="cursor:default" no-href="#').replace(".collapse-button{",".collapse-button{display:none;").replace(".collapse-content{max-height:0;",".collapse-content{")}))},t}(l.ExtendFilePreview))).setup()}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var a=r[e]={exports:{}};return t[e].call(a.exports,a,a.exports,n),a.exports}n.m=t,e=[],n.O=(t,r,o,a)=>{if(!r){var i=1/0;for(u=0;u<e.length;u++){for(var[r,o,a]=e[u],l=!0,c=0;c<r.length;c++)(!1&a||i>=a)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(l=!1,a<i&&(i=a));if(l){e.splice(u--,1);var p=o();void 0!==p&&(t=p)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[r,o,a]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={340:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,a,[i,l,c]=r,p=0;if(i.some((t=>0!==e[t]))){for(o in l)n.o(l,o)&&(n.m[o]=l[o]);if(c)var u=c(n)}for(t&&t(r);p<i.length;p++)a=i[p],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(u)},r=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[509,610,830,270,903,218],(()=>n(7882)));o=n.O(o)})();