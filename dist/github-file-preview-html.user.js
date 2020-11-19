// ==UserScript==
// @name        GitHub File Preview HTML
// @version     1.1.5
// @author      iamogbz
// @description Render HTML files in github
// @homepage    https://github.com/iamogbz/oh-my-scripts
// @supportURL  https://github.com/iamogbz/oh-my-scripts/issues
// @icon        https://github.com/iamogbz/oh-my-scripts/raw/master/assets/monkey_128.png
// @namespace   iamogbz/oh-my-scripts
// @grant       GM_xmlhttpRequest
// @include     *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/github-file-preview-html.user.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/lib/dom.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/lib/github.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/lib/paths.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/lib/request.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/lib/ns.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/lib/github-file.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/lodash.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/cheerio.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/htmlparser2.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/entities.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/domutils.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/css-select.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/nth-check.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/domhandler.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/lib/dom-inline.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/string_decoder.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/safe-buffer.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/inherits.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/ieee754.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/events.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/domelementtype.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/dom-serializer.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/css-what.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/buffer.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/boolbase.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/8888947/dist/npm/base64-js.js
// @updateURL   https://github.com/iamogbz/oh-my-scripts/raw/master/dist/github-file-preview-html.user.js
// ==/UserScript==

(()=>{var t={4354:function(t,e,r){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),i=this&&this.__makeTemplateObject||function(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t};Object.defineProperty(e,"__esModule",{value:!0});var l,a,c=r(3125),s=r(1543),p=r(8008);(new(function(t){function e(){var e=t.call(this)||this;return e.id=s.filePreviewNS(l||(l=i(["extend-html"],["extend-html"]))),e.fileTypes=new Set(["html","xhtml"]),e.featureClass=s.filePreviewNS(a||(a=i(["extend-html"],["extend-html"]))),e}return o(e,t),e.prototype.prepareHTML=function(t,e){return c.inline({base:p.fileDirname(this.pathToBlob(e)),folder:p.fileDirname(e),html:t.replace(/<a/g,'<a target="_blank"'),load:this.getFileContent.bind(this)})},e.prototype.getScrollHeight=function(t){return t.contentWindow?t.contentWindow.document.body.scrollHeight+1:0},e}(s.ExtendFilePreview))).setup()},6994:()=>{}},e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}r.m=t,r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{var t={582:0},e=[[4354,509,830,270,903,218,610,337,461,592,709,246,81,997,998,232,963,689,992,268,788,818,164,366,763,62,38]],n=()=>{};function o(){for(var n,o=0;o<e.length;o++){for(var i=e[o],l=!0,a=1;a<i.length;a++){var c=i[a];0!==t[c]&&(l=!1)}l&&(e.splice(o--,1),n=r(r.s=i[0]))}return 0===e.length&&(r.x(),r.x=()=>{}),n}r.x=()=>{r.x=()=>{},l=l.slice();for(var t=0;t<l.length;t++)i(l[t]);return(n=o)()};var i=o=>{for(var i,l,[c,s,p,h]=o,u=0,f=[];u<c.length;u++)l=c[u],r.o(t,l)&&t[l]&&f.push(t[l][0]),t[l]=0;for(i in s)r.o(s,i)&&(r.m[i]=s[i]);for(p&&p(r),a(o);f.length;)f.shift()();return h&&e.push.apply(e,h),n()},l=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[],a=l.push.bind(l);l.push=i})(),r.x()})();