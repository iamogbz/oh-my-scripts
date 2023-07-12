// ==UserScript==
// @name GitHub File Preview HTML
// @description Render HTML files in github
// @version 0.0.0
// @author iamogbz
// @homepage https://github.com/iamogbz/oh-my-scripts
// @supportURL https://github.com/iamogbz/oh-my-scripts/issues
// @include *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/github-file-preview-html.user.js
// @grant GM_xmlhttpRequest
// @icon https://github.com/iamogbz/oh-my-scripts/raw/master/assets/monkey_128.png
// @namespace iamogbz/oh-my-scripts
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/lib/dom.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/lib/github-file.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/lib/github.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/lib/paths.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/lib/request.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/lib/ns.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/lodash.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/cheerio.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/htmlparser2.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/entities.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/domutils.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/css-select.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/nth-check.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/domhandler.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/lib/dom-inline.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/string_decoder.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/safe-buffer.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/inherits.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/ieee754.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/events.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/domelementtype.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/dom-serializer.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/css-what.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/buffer.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/boolbase.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/812169d/dist/npm/base64-js.js
// @updateURL https://github.com/iamogbz/oh-my-scripts/raw/master/dist/github-file-preview-html.user.js
// ==/UserScript==

(()=>{var e,t={4354:function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};Object.defineProperty(t,"__esModule",{value:!0});var l,a,c=r(3125),s=r(1543),u=r(8008);(new(function(e){function t(){var t=e.call(this)||this;return t.id=(0,s.filePreviewNS)(l||(l=i(["extend-html"],["extend-html"]))),t.fileTypes=new Set(["html","xhtml"]),t.featureClass=(0,s.filePreviewNS)(a||(a=i(["extend-html"],["extend-html"]))),t}return o(t,e),t.prototype.prepareHTML=function(e,t){return(0,c.inline)({base:(0,u.fileDirname)(this.pathToBlob(t)),folder:(0,u.fileDirname)(t),html:e.replace(/<a/g,'<a target="_blank"'),load:this.getFileContent.bind(this)})},t.prototype.getScrollHeight=function(e){return e.contentWindow?e.contentWindow.document.body.scrollHeight+1:0},t}(s.ExtendFilePreview))).setup()},247:()=>{}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={id:e,loaded:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=t,e=[],n.O=(t,r,o,i)=>{if(!r){var l=1/0;for(u=0;u<e.length;u++){for(var[r,o,i]=e[u],a=!0,c=0;c<r.length;c++)(!1&i||l>=i)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(a=!1,i<l&&(l=i));if(a){e.splice(u--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[r,o,i]},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={582:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,i,[l,a,c]=r,s=0;if(l.some((t=>0!==e[t]))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(c)var u=c(n)}for(t&&t(r);s<l.length;s++)i=l[s],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(u)},r=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[509,610,830,270,903,218,337,461,592,709,246,81,997,998,232,963,689,992,268,788,818,164,366,763,62,38],(()=>n(4354)));o=n.O(o)})();