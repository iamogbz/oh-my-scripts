// ==UserScript==
// @name        GitHub File Preview HTML
// @version     0.0.2
// @author      iamogbz
// @description Render HTML files in github
// @homepage    https://github.com/iamogbz/oh-my-scripts
// @supportURL  https://github.com/iamogbz/oh-my-scripts/issues
// @icon        https://github.com/iamogbz/oh-my-scripts/raw/master/assets/monkey_128.png
// @namespace   iamogbz/oh-my-scripts
// @grant       GM_xmlhttpRequest
// @include     *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/master/dist/github-file-preview-html.user.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/dom.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/github.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/paths.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/request.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/ns.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/github-file.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/lodash.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/parse5.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/cheerio.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/htmlparser2.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/entities.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/domutils.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/css-select.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/nth-check.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/domhandler.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/dom-inline.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/string_decoder.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/safe-buffer.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/inherits.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/ieee754.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/events.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/domelementtype.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/dom-serializer.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/css-what.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/buffer.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/boolbase.js?v=d24c668
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/npm/base64-js.js?v=d24c668
// ==/UserScript==

(()=>{var e={4354:function(e,t,r){"use strict";var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};Object.defineProperty(t,"__esModule",{value:!0});var l,a,s=r(3125),p=r(1543),c=r(8008);(new(function(e){function t(){var t=e.call(this)||this;return t.id=p.filePreviewNS(l||(l=i(["extend-html"],["extend-html"]))),t.fileTypes=new Set(["html","xhtml"]),t.featureClass=p.filePreviewNS(a||(a=i(["extend-html"],["extend-html"]))),t}return o(t,e),t.prototype.prepareHTML=function(e,t){return s.inline({base:c.fileDirname(this.pathToBlob(t)),folder:c.fileDirname(t),html:e.replace(/<a/g,'<a target="_blank"'),load:this.getFileContent.bind(this)})},t}(p.ExtendFilePreview))).setup()},6994:()=>{}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}r.m=e,r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={582:0},t=[[4354,509,830,270,903,218,610,337,389,461,592,709,246,81,997,998,232,963,689,992,268,788,818,164,366,763,62,38]],n=()=>{};function o(){for(var n,o=0;o<t.length;o++){for(var i=t[o],l=!0,a=1;a<i.length;a++){var s=i[a];0!==e[s]&&(l=!1)}l&&(t.splice(o--,1),n=r(r.s=i[0]))}return 0===t.length&&(r.x(),r.x=()=>{}),n}r.x=()=>{r.x=()=>{},l=l.slice();for(var e=0;e<l.length;e++)i(l[e]);return(n=o)()};var i=o=>{for(var i,l,[s,p,c,h]=o,u=0,f=[];u<s.length;u++)l=s[u],r.o(e,l)&&e[l]&&f.push(e[l][0]),e[l]=0;for(i in p)r.o(p,i)&&(r.m[i]=p[i]);for(c&&c(r),a(o);f.length;)f.shift()();return h&&t.push.apply(t,h),n()},l=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[],a=l.push.bind(l);l.push=i})(),r.x()})();