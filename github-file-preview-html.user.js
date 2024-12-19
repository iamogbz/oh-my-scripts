// ==UserScript==
// @name GitHub File Preview HTML
// @description Render HTML files in github
// @version 1.4.3
// @author iamogbz
// @homepage https://github.com/iamogbz/oh-my-scripts
// @supportURL https://github.com/iamogbz/oh-my-scripts/issues
// @include *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/1.4.3/github-file-preview-html.user.js
// @grant GM_xmlhttpRequest
// @icon https://github.com/iamogbz/oh-my-scripts/raw/main/assets/monkey_128.png
// @namespace iamogbz/oh-my-scripts
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.4.3/lib/dom.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.4.3/lib/github-file.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.4.3/lib/github.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.4.3/lib/paths.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.4.3/lib/request.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.4.3/lib/ns.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.4.3/npm/.pnpm.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.4.3/lib/dom-inline.js
// @updateURL https://github.com/iamogbz/oh-my-scripts/raw/gh-pages/github-file-preview-html.user.js
// ==/UserScript==

(()=>{var e,t={6731:(e,t,r)=>{"use strict";const n=r(2933),o=r(2639),i=r(7131);class l extends o.ExtendFilePreview{constructor(){const e=o.filePreviewNS`extend-html`;super(e,e,new Set(["html","xhtml"]))}prepareHTML(e,t){return(0,n.inline)({base:(0,i.fileDirname)(this.pathToBlob(t)),folder:(0,i.fileDirname)(t),html:e.replace(/<a/g,'<a target="_blank"'),load:this.getFileContent.bind(this)})}getScrollHeight(e){return e.contentWindow?e.contentWindow.document.body.scrollHeight+1:0}}(new l).setup()},6127:()=>{}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={id:e,loaded:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=t,e=[],n.O=(t,r,o,i)=>{if(!r){var l=1/0;for(h=0;h<e.length;h++){for(var[r,o,i]=e[h],s=!0,a=0;a<r.length;a++)(!1&i||l>=i)&&Object.keys(n.O).every((e=>n.O[e](r[a])))?r.splice(a--,1):(s=!1,i<l&&(l=i));if(s){e.splice(h--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var h=e.length;h>0&&e[h-1][2]>i;h--)e[h]=e[h-1];e[h]=[r,o,i]},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={697:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,i,[l,s,a]=r,c=0;if(l.some((t=>0!==e[t]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(a)var h=a(n)}for(t&&t(r);c<l.length;c++)i=l[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(h)},r=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[461,645,266,977,898,510,234,793],(()=>n(6731)));o=n.O(o)})();