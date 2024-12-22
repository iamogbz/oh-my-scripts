// ==UserScript==
// @name Export Element
// @description Add a context menu option to print a HTML element including all styles
// @version 1.5.1
// @author iamogbz
// @homepage https://github.com/iamogbz/oh-my-scripts
// @supportURL https://github.com/iamogbz/oh-my-scripts/issues
// @match *://*/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/1.5.1/export-element.user.js
// @grant GM_registerMenuCommand
// @icon https://github.com/iamogbz/oh-my-scripts/raw/main/assets/monkey_128.png
// @namespace iamogbz/oh-my-scripts
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.5.1/npm/.pnpm.js
// @require https://github.com/iamogbz/oh-my-scripts/raw/1.5.1/lib/html2canvas.js
// @updateURL https://github.com/iamogbz/oh-my-scripts/raw/gh-pages/export-element.user.js
// ==/UserScript==

(()=>{"use strict";var e,t={373:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function l(e){try{s(o.next(e))}catch(e){i(e)}}function c(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,c)}s((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const r=n(9270);!function(){const e="transparent",t=Object.freeze({PDF:"pdf",PNG:"png"}),n={matchWords:[],eventTarget:null,target:null};function i(e,t){for(;e;){if(t(e))return e;e=e.parentNode}return null}function l(e){var t;return null!==(t=null==e?void 0:e.replace(/\s+/g," ").trim())&&void 0!==t?t:""}function c(e){var t,o,r,c,s,a,d;n.eventTarget=e.target;const u=null!==(c=null!==(o=null===(t=window.getSelection)||void 0===t?void 0:t.call(window))&&void 0!==o?o:null===(r=document.getSelection)||void 0===r?void 0:r.call(document))&&void 0!==c?c:{anchorNode:e.target,focusNode:e.target,toString(){var e,t,n,o,r;return(null===(n=null===(t=null===(e=document.selection)||void 0===e?void 0:e.createRange)||void 0===t?void 0:t.call(e))||void 0===n?void 0:n.text)||(null===(o=this.anchorNode)||void 0===o?void 0:o.textContent)||(null===(r=this.focusNode)||void 0===r?void 0:r.textContent)||""}},f=l(u.toString());n.matchWords=f.split(" "),n.target=i(null!==(s=u.anchorNode)&&void 0!==s?s:u.focusNode,(e=>{const t=l(e.textContent||"");return o=t,n.matchWords.every((e=>o.includes(e)));var o})),console.log(e.target.textContent,null===(d=null===(a=document.selection)||void 0===a?void 0:a.createRange)||void 0===d?void 0:d.call(a).text,n.target)}function s(t){const n=i(t,(t=>{if(!(t instanceof Element))return!1;const n=window.getComputedStyle(t).backgroundColor;if(!n)return!1;if(n===e)return!1;const o=n.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);return!o||0!==(o[4]?parseFloat(o[4]):1)}));return n instanceof Element?window.getComputedStyle(n).getPropertyValue("background-color"):e}function a(e,t){function n(t,n){if(!(t instanceof Element&&n instanceof Element))return;const o=e.getComputedStyle(t);for(const e of o)n.style.setProperty(e,o.getPropertyValue(e))}const o=t.cloneNode(!0);return n(t,o),function e(t,o){if(t instanceof Element&&o instanceof Element)for(let r=0;r<t.children.length;r++)n(t.children[r],o.children[r]),e(t.children[r],o.children[r])}(t,o),o}document.addEventListener("contextmenu",c),document.addEventListener("mouseup",c),Object.values(t).forEach((i=>{window.GM_registerMenuCommand(`As ${i.toUpperCase()}`,(()=>{!function(i){if(n.target)switch(i){case t.PDF:return function(e){const t=window.open("","","width=800,height=600");if(!t)return void alert("Please allow popups for this site and try again.");const n=t.document,o=a(window,e);o instanceof Element&&"body"===o.tagName.toLowerCase()?n.body.outerHTML=o.outerHTML:n.body.appendChild(o),n.body.style.backgroundColor=s(e),t.setTimeout((()=>t.print()),1e3),t.addEventListener("afterprint",(function(){this.confirm("Close window after successful print?")&&t.close()}))}(n.target);case t.PNG:return function(t){return o(this,void 0,void 0,(function*(){const o=a(window,t),i=s(t),l=document.createElement("div");l.style.backgroundColor=i,l.style.cursor="pointer",l.style.display="block",l.style.height="fit-content",l.style.padding="min(1vh, 1vw)",l.style.position="relative",l.style.top="1vh",l.style.width="fit-content";const c=document.createElement("div");c.style.alignItems="start",c.style.backdropFilter="blur(10px)",c.style.backgroundColor=`color-mix(in srgb, ${i}, ${e} 50%)`,c.style.display="flex",c.style.height="100vh",c.style.justifyContent="center",c.style.left="0",c.style.opacity="1",c.style.overflow="auto",c.style.position="fixed",c.style.top="0",c.style.userSelect="none",c.style.width="100vw",c.style.visibility="visible",c.style.zIndex=`${Number.MIN_SAFE_INTEGER}`,l.appendChild(o),c.appendChild(l),document.body.appendChild(c);const d=yield(0,r.html2canvas)(l);(()=>{const e={x:window.innerWidth/l.clientWidth,y:window.innerHeight/l.clientHeight};l.style.scale=`${Math.min(1,e.x,e.y)}`,l.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),c.style.zIndex=`${Number.MAX_SAFE_INTEGER}`})();const u="image/png",f=yield new Promise((e=>{d.toBlob((t=>t?e(t):void 0),u)})),v=URL.createObjectURL(f),p=`${["screenshot",...n.matchWords.slice(0,10)].map((e=>e.trim())).filter(Boolean).join("-").toLowerCase().replace(/[/\\?%*:|"<>]+/g,"-").replace(/[-]+/g,"-")}.${u.split("/")[1]}`,h=document.createElement("a");h.target="_blank",h.href=v,h.download=p,c.addEventListener("click",(()=>c.remove())),l.addEventListener("click",(e=>(e.preventDefault(),e.stopPropagation(),h.click())))}))}(n.target);default:alert(`Unsupported type: ${i}`)}else console.error("Node not found!",n)}(i)}),`as-${i.toLowerCase()}`)}))}()}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={id:e,loaded:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.loaded=!0,i.exports}o.m=t,e=[],o.O=(t,n,r,i)=>{if(!n){var l=1/0;for(d=0;d<e.length;d++){for(var[n,r,i]=e[d],c=!0,s=0;s<n.length;s++)(!1&i||l>=i)&&Object.keys(o.O).every((e=>o.O[e](n[s])))?n.splice(s--,1):(c=!1,i<l&&(l=i));if(c){e.splice(d--,1);var a=r();void 0!==a&&(t=a)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[n,r,i]},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={483:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,i,[l,c,s]=n,a=0;if(l.some((t=>0!==e[t]))){for(r in c)o.o(c,r)&&(o.m[r]=c[r]);if(s)var d=s(o)}for(t&&t(n);a<l.length;a++)i=l[a],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(d)},n=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[234,930],(()=>o(373)));r=o.O(r)})();