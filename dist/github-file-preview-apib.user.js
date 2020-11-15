// ==UserScript==
// @name        GitHub File Preview APIB
// @version     1.1.1
// @author      iamogbz
// @description Render Apiary blueprint files in github
// @homepage    https://github.com/iamogbz/oh-my-scripts
// @supportURL  https://github.com/iamogbz/oh-my-scripts/issues
// @icon        https://github.com/iamogbz/oh-my-scripts/raw/master/assets/monkey_128.png
// @namespace   iamogbz/oh-my-scripts
// @grant       GM_xmlhttpRequest
// @include     *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/master/dist/github-file-preview-apib.user.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/dom.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/github.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/paths.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/request.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/ns.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/github-file.js?v=b610462
// @updateURL   https://github.com/iamogbz/oh-my-scripts/raw/master/dist/github-file-preview-apib.user.js?v=b610462
// ==/UserScript==

(()=>{"use strict";var e={7882:function(e,t,r){var n,o=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),a=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};Object.defineProperty(t,"__esModule",{value:!0});var p,i,l=r(1543),c=r(1603);(new(function(e){function t(){var t=e.call(this)||this;return t.id=l.filePreviewNS(p||(p=a(["extend-apib"],["extend-apib"]))),t.fileTypes=new Set(["apib"]),t.featureClass=l.filePreviewNS(i||(i=a(["extend-apib"],["extend-apib"]))),t}return o(t,e),t.prototype.prepareHTML=function(e){var t=btoa(e);return c.request("https://d31myey2oeipxs.cloudfront.net/v1",{headers:{"X-Blueprint":t}}).then((function(e){var t;return null===(t=e.text)||void 0===t?void 0:t.call(e)})).then((function(e){return null==e?void 0:e.replace(/<a/g,'<a target="_blank"').replace(/href="#/g,'style="cursor:default" no-href="#').replace(".collapse-button{",".collapse-button{display:none;").replace(".collapse-content{max-height:0;",".collapse-content{")}))},t}(l.ExtendFilePreview))).setup()}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}r.m=e,r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={340:0},t=[[7882,509,830,270,903,218,610]],n=()=>{};function o(){for(var n,o=0;o<t.length;o++){for(var a=t[o],p=!0,i=1;i<a.length;i++){var l=a[i];0!==e[l]&&(p=!1)}p&&(t.splice(o--,1),n=r(r.s=a[0]))}return 0===t.length&&(r.x(),r.x=()=>{}),n}r.x=()=>{r.x=()=>{},p=p.slice();for(var e=0;e<p.length;e++)a(p[e]);return(n=o)()};var a=o=>{for(var a,p,[l,c,s,u]=o,f=0,h=[];f<l.length;f++)p=l[f],r.o(e,p)&&e[p]&&h.push(e[p][0]),e[p]=0;for(a in c)r.o(c,a)&&(r.m[a]=c[a]);for(s&&s(r),i(o);h.length;)h.shift()();return u&&t.push.apply(t,u),n()},p=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[],i=p.push.bind(p);p.push=a})(),r.x()})();