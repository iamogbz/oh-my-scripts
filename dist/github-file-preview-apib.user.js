// ==UserScript==
// @name        GitHub File Preview APIB
// @version     1.2.0
// @author      iamogbz
// @description Render Apiary blueprint files in github
// @homepage    https://github.com/iamogbz/oh-my-scripts
// @supportURL  https://github.com/iamogbz/oh-my-scripts/issues
// @icon        https://github.com/iamogbz/oh-my-scripts/raw/master/assets/monkey_128.png
// @namespace   iamogbz/oh-my-scripts
// @grant       GM_xmlhttpRequest
// @include     *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/dca7499/dist/github-file-preview-apib.user.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/dca7499/dist/lib/dom.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/dca7499/dist/lib/github.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/dca7499/dist/lib/paths.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/dca7499/dist/lib/request.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/dca7499/dist/lib/ns.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/dca7499/dist/lib/github-file.js
// @updateURL   https://github.com/iamogbz/oh-my-scripts/raw/master/dist/github-file-preview-apib.user.js
// ==/UserScript==

(()=>{"use strict";var e,t={7882:function(e,t,r){var n,o=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};Object.defineProperty(t,"__esModule",{value:!0});var a,l,p=r(1543),c=r(1603);(new(function(e){function t(){var t=e.call(this)||this;return t.id=(0,p.filePreviewNS)(a||(a=i(["extend-apib"],["extend-apib"]))),t.fileTypes=new Set(["apib"]),t.featureClass=(0,p.filePreviewNS)(l||(l=i(["extend-apib"],["extend-apib"]))),t}return o(t,e),t.prototype.prepareHTML=function(e){var t=btoa(e);return(0,c.request)("https://d31myey2oeipxs.cloudfront.net/v1",{headers:{"X-Blueprint":t}}).then((function(e){var t;return null===(t=e.text)||void 0===t?void 0:t.call(e)})).then((function(e){return null==e?void 0:e.replace(/<a/g,'<a target="_blank"').replace(/href="#/g,'style="cursor:default" no-href="#').replace(".collapse-button{",".collapse-button{display:none;").replace(".collapse-content{max-height:0;",".collapse-content{")}))},t}(p.ExtendFilePreview))).setup()}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}};return t[e].call(i.exports,i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,r,o,i)=>{if(!r){var a=1/0;for(s=0;s<e.length;s++){for(var[r,o,i]=e[s],l=!0,p=0;p<r.length;p++)(!1&i||a>=i)&&Object.keys(n.O).every((e=>n.O[e](r[p])))?r.splice(p--,1):(l=!1,i<a&&(a=i));if(l){e.splice(s--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[r,o,i]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={340:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,i,[a,l,p]=r,c=0;if(a.some((t=>0!==e[t]))){for(o in l)n.o(l,o)&&(n.m[o]=l[o]);if(p)var s=p(n)}for(t&&t(r);c<a.length;c++)i=a[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(s)},r=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[509,830,270,903,218,610],(()=>n(7882)));o=n.O(o)})();