// ==UserScript==
// @name GitHub File Preview HTML
// @description Render HTML files in github
// @version 1.2.6
// @author iamogbz
// @homepage https://github.com/iamogbz/oh-my-scripts
// @supportURL https://github.com/iamogbz/oh-my-scripts/issues
// @include *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/github-file-preview-html.user.js
// @grant GM_xmlhttpRequest
// @icon https://github.com/iamogbz/oh-my-scripts/raw/master/assets/monkey_128.png
// @namespace iamogbz/oh-my-scripts
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/lib/dom.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/lib/github-file.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/lib/github.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/lib/paths.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/lib/request.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/lib/ns.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/lodash.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/cheerio.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/htmlparser2.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/entities.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/domutils.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/css-select.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/nth-check.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/domhandler.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/lib/dom-inline.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/string_decoder.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/safe-buffer.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/inherits.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/ieee754.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/events.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/domelementtype.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/dom-serializer.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/css-what.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/buffer.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/boolbase.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.2.6/npm/base64-js.js
// @updateURL https://github.com/iamogbz/oh-my-scripts/raw/release/github-file-preview-html.user.js
// ==/UserScript==

(()=>{var t,e={4354:function(t,e,r){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__makeTemplateObject||function(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t};Object.defineProperty(e,"__esModule",{value:!0});var l,a=r(3125),c=r(1543),s=r(8008);(new(function(t){function e(){var e=(0,c.filePreviewNS)(l||(l=i(["extend-html"],["extend-html"])));return t.call(this,e,e,new Set(["html","xhtml"]))||this}return o(e,t),e.prototype.prepareHTML=function(t,e){return(0,a.inline)({base:(0,s.fileDirname)(this.pathToBlob(e)),folder:(0,s.fileDirname)(e),html:t.replace(/<a/g,'<a target="_blank"'),load:this.getFileContent.bind(this)})},e.prototype.getScrollHeight=function(t){return t.contentWindow?t.contentWindow.document.body.scrollHeight+1:0},e}(c.ExtendFilePreview))).setup()},247:()=>{}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={id:t,loaded:!1,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,t=[],n.O=(e,r,o,i)=>{if(!r){var l=1/0;for(u=0;u<t.length;u++){for(var[r,o,i]=t[u],a=!0,c=0;c<r.length;c++)(!1&i||l>=i)&&Object.keys(n.O).every((t=>n.O[t](r[c])))?r.splice(c--,1):(a=!1,i<l&&(l=i));if(a){t.splice(u--,1);var s=o();void 0!==s&&(e=s)}}return e}i=i||0;for(var u=t.length;u>0&&t[u-1][2]>i;u--)t[u]=t[u-1];t[u]=[r,o,i]},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{var t={582:0};n.O.j=e=>0===t[e];var e=(e,r)=>{var o,i,[l,a,c]=r,s=0;if(l.some((e=>0!==t[e]))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(c)var u=c(n)}for(e&&e(r);s<l.length;s++)i=l[s],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(u)},r=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))})();var o=n.O(void 0,[509,610,830,270,903,218,337,461,592,709,246,81,997,998,232,963,689,992,268,788,818,164,366,763,62,38],(()=>n(4354)));o=n.O(o)})();