// ==UserScript==
// @name        GitHub File Preview HTML
// @version     1.1.6
// @author      iamogbz
// @description Render HTML files in github
// @homepage    https://github.com/iamogbz/oh-my-scripts
// @supportURL  https://github.com/iamogbz/oh-my-scripts/issues
// @icon        https://github.com/iamogbz/oh-my-scripts/raw/master/assets/monkey_128.png
// @namespace   iamogbz/oh-my-scripts
// @grant       GM_xmlhttpRequest
// @include     *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/github-file-preview-html.user.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/lib/dom.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/lib/github.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/lib/paths.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/lib/request.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/lib/ns.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/lib/github-file.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/lodash.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/cheerio.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/htmlparser2.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/entities.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/domutils.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/css-select.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/nth-check.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/domhandler.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/lib/dom-inline.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/string_decoder.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/safe-buffer.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/inherits.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/ieee754.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/events.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/domelementtype.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/dom-serializer.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/css-what.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/buffer.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/boolbase.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/a51e930/dist/npm/base64-js.js
// @updateURL   https://github.com/iamogbz/oh-my-scripts/raw/master/dist/github-file-preview-html.user.js
// ==/UserScript==

(()=>{var t={4354:function(t,e,r){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__makeTemplateObject||function(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t};Object.defineProperty(e,"__esModule",{value:!0});var l,a,c=r(3125),p=r(1543),s=r(8008);(new(function(t){function e(){var e=t.call(this)||this;return e.id=p.filePreviewNS(l||(l=i(["extend-html"],["extend-html"]))),e.fileTypes=new Set(["html","xhtml"]),e.featureClass=p.filePreviewNS(a||(a=i(["extend-html"],["extend-html"]))),e}return o(e,t),e.prototype.prepareHTML=function(t,e){return c.inline({base:s.fileDirname(this.pathToBlob(e)),folder:s.fileDirname(e),html:t.replace(/<a/g,'<a target="_blank"'),load:this.getFileContent.bind(this)})},e.prototype.getScrollHeight=function(t){return t.contentWindow?t.contentWindow.document.body.scrollHeight+1:0},e}(p.ExtendFilePreview))).setup()},6994:()=>{}},e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}r.m=t,r.x=t=>{},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{var t={582:0},e=[[4354,509,830,270,903,218,610,337,461,592,709,246,81,997,998,232,963,689,992,268,788,818,164,366,763,62,38]],n=t=>{},o=(o,i)=>{for(var l,a,[c,p,s,u]=i,h=0,f=[];h<c.length;h++)a=c[h],r.o(t,a)&&t[a]&&f.push(t[a][0]),t[a]=0;for(l in p)r.o(p,l)&&(r.m[l]=p[l]);for(s&&s(r),o&&o(i);f.length;)f.shift()();return u&&e.push.apply(e,u),n()},i=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[];function l(){for(var n,o=0;o<e.length;o++){for(var i=e[o],l=!0,a=1;a<i.length;a++){var c=i[a];0!==t[c]&&(l=!1)}l&&(e.splice(o--,1),n=r(r.s=i[0]))}return 0===e.length&&(r.x(),r.x=t=>{}),n}i.forEach(o.bind(null,0)),i.push=o.bind(null,i.push.bind(i));var a=r.x;r.x=()=>(r.x=a||(t=>{}),(n=l)())})(),r.x()})();