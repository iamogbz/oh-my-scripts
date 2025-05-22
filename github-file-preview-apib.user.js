// ==UserScript==
// @name GitHub File Preview APIB
// @description Render Apiary blueprint files in github
// @version 1.6.2
// @author iamogbz
// @homepage https://github.com/iamogbz/oh-my-scripts
// @supportURL https://github.com/iamogbz/oh-my-scripts/issues
// @include *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/1.6.2/github-file-preview-apib.user.js
// @grant GM_xmlhttpRequest
// @icon https://github.com/iamogbz/oh-my-scripts/raw/main/assets/monkey_128.png
// @namespace iamogbz/oh-my-scripts
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.6.2/lib/dom.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.6.2/lib/github-file.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.6.2/lib/github.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.6.2/lib/paths.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.6.2/lib/request.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.6.2/lib/ns.js
// @updateURL https://github.com/iamogbz/oh-my-scripts/raw/gh-pages/github-file-preview-apib.user.js
// ==/UserScript==

(()=>{"use strict";var e,r={6690:(e,r,t)=>{const n=t(2639),o=t(8730);class l extends n.ExtendFilePreview{constructor(){const e=n.filePreviewNS`extend-apib`;super(e,e,new Set(["apib"]))}prepareHTML(e){const r=btoa(e);return(0,o.request)("https://d31myey2oeipxs.cloudfront.net/v1",{headers:{"X-Blueprint":r}}).then((e=>{var r;return null===(r=e.text)||void 0===r?void 0:r.call(e)})).then((e=>null==e?void 0:e.replace(/<a/g,'<a target="_blank"').replace(/href="#/g,'style="cursor:default" no-href="#').replace(".collapse-button{",".collapse-button{display:none;").replace(".collapse-content{max-height:0;",".collapse-content{")))}}(new l).setup()}},t={};function n(e){var o=t[e];if(void 0!==o)return o.exports;var l=t[e]={exports:{}};return r[e].call(l.exports,l,l.exports,n),l.exports}n.m=r,e=[],n.O=(r,t,o,l)=>{if(!t){var a=1/0;for(i=0;i<e.length;i++){for(var[t,o,l]=e[i],s=!0,p=0;p<t.length;p++)(!1&l||a>=l)&&Object.keys(n.O).every((e=>n.O[e](t[p])))?t.splice(p--,1):(s=!1,l<a&&(a=l));if(s){e.splice(i--,1);var c=o();void 0!==c&&(r=c)}}return r}l=l||0;for(var i=e.length;i>0&&e[i-1][2]>l;i--)e[i]=e[i-1];e[i]=[t,o,l]},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={984:0};n.O.j=r=>0===e[r];var r=(r,t)=>{var o,l,[a,s,p]=t,c=0;if(a.some((r=>0!==e[r]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(p)var i=p(n)}for(r&&r(t);c<a.length;c++)l=a[c],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(i)},t=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var o=n.O(void 0,[461,645,266,977,898,510],(()=>n(6690)));o=n.O(o)})();