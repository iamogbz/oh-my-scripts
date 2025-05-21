// ==UserScript==
// @name Amazon Sort by Review
// @description Sort products best by reviews
// @version 1.6.1
// @author iamogbz
// @homepage https://github.com/iamogbz/oh-my-scripts
// @supportURL https://github.com/iamogbz/oh-my-scripts/issues
// @match *://*.amazon.ca/*
// @match *://*.amazon.com/*
// @match *://*.amazon.co.uk/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/1.6.1/amazon-sort-by-review.user.js
// @grant GM_xmlhttpRequest
// @icon https://github.com/iamogbz/oh-my-scripts/raw/main/assets/monkey_128.png
// @namespace iamogbz/oh-my-scripts
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.6.1/lib/interval.js
// @updateURL https://github.com/iamogbz/oh-my-scripts/raw/gh-pages/amazon-sort-by-review.user.js
// ==/UserScript==

(()=>{"use strict";var r,e={4100:(r,e,o)=>{const n=o(8594);!function(){const r="review-count-rank";(0,n.doEvery)({condition:()=>{const e=new URL(window.location.href).searchParams;return e.has("s")&&e.get("s")!==r},callback:()=>{const e=new URL(window.location.href);e.searchParams.set("s",r),window.location.href=e.href}})}()}},o={};function n(r){var t=o[r];if(void 0!==t)return t.exports;var s=o[r]={exports:{}};return e[r](s,s.exports,n),s.exports}n.m=e,r=[],n.O=(e,o,t,s)=>{if(!o){var a=1/0;for(h=0;h<r.length;h++){for(var[o,t,s]=r[h],i=!0,c=0;c<o.length;c++)(!1&s||a>=s)&&Object.keys(n.O).every((r=>n.O[r](o[c])))?o.splice(c--,1):(i=!1,s<a&&(a=s));if(i){r.splice(h--,1);var f=t();void 0!==f&&(e=f)}}return e}s=s||0;for(var h=r.length;h>0&&r[h-1][2]>s;h--)r[h]=r[h-1];r[h]=[o,t,s]},n.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),(()=>{var r={576:0};n.O.j=e=>0===r[e];var e=(e,o)=>{var t,s,[a,i,c]=o,f=0;if(a.some((e=>0!==r[e]))){for(t in i)n.o(i,t)&&(n.m[t]=i[t]);if(c)var h=c(n)}for(e&&e(o);f<a.length;f++)s=a[f],n.o(r,s)&&r[s]&&r[s][0](),r[s]=0;return n.O(h)},o=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})();var t=n.O(void 0,[52],(()=>n(4100)));t=n.O(t)})();