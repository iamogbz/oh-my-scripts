// ==UserScript==
// @name Export Element
// @description Add a context menu option to print a HTML element including all styles
// @version 1.4.2
// @author iamogbz
// @homepage https://github.com/iamogbz/oh-my-scripts
// @supportURL https://github.com/iamogbz/oh-my-scripts/issues
// @match *://*/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/1.4.2/export-element.user.js
// @grant GM_registerMenuCommand
// @icon https://github.com/iamogbz/oh-my-scripts/raw/main/assets/monkey_128.png
// @namespace iamogbz/oh-my-scripts
// @updateURL https://github.com/iamogbz/oh-my-scripts/raw/gh-pages/export-element.user.js
// ==/UserScript==

(()=>{"use strict";!function(){const t=Object.freeze({PDF:"pdf"}),e={target:null,type:t.PDF};function n(t,e){for(;t;){if(e(t))return t;t=t.parentNode}return null}function o(t){var e;return null!==(e=null==t?void 0:t.replace(/\s+/g," ").trim())&&void 0!==e?e:""}document.addEventListener("contextmenu",(function(t){var r,i,l,d,u,c,s,a,f,v,p;const g=o(null!==(p=null!==(c=null!==(l=null===(i=null===(r=window.getSelection)||void 0===r?void 0:r.call(window))||void 0===i?void 0:i.toString())&&void 0!==l?l:null===(u=null===(d=document.getSelection)||void 0===d?void 0:d.call(document))||void 0===u?void 0:u.toString())&&void 0!==c?c:null===(v=null===(f=null===(a=null===(s=Object.getOwnPropertyDescriptor(document,"selection"))||void 0===s?void 0:s.value)||void 0===a?void 0:a.createRange)||void 0===f?void 0:f.call(a))||void 0===v?void 0:v.text)&&void 0!==p?p:"").split(" ");e.target=n(t.target,(t=>{const e=o(t.innerText);return n=e,g.every((t=>n.includes(t)));var n}))})),Object.values(t).forEach((o=>{window.GM_registerMenuCommand(`As ${o.toUpperCase()}`,(()=>{!function(o){if(e.target){if(o===t.PDF)return function(t){const e=window.open("","","width=800,height=600");if(!e)return void alert("Please allow popups for this site and try again.");const o=e.document,r=function(t,e){function n(e,n){const o=t.getComputedStyle(e);for(const t of o)n.style.setProperty(t,o.getPropertyValue(t))}const o=e.cloneNode(!0);return n(e,o),function t(e,o){const r=e;for(let e=0;e<r.children.length;e++){const i=o;n(r.children[e],i.children[e]),t(r.children[e],i.children[e])}}(e,o),o}(window,t);"body"===r.tagName.toLowerCase()?o.body.outerHTML=r.outerHTML:o.body.appendChild(r),o.body.style.backgroundColor=function(t){const e="transparent",o=n(t,(t=>{if(!(t instanceof Element))return!1;const n=window.getComputedStyle(t).backgroundColor;if(!n)return!1;if(n===e)return!1;const o=n.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);return!o||0!==(o[4]?parseFloat(o[4]):1)}));return o?window.getComputedStyle(o).getPropertyValue("background-color"):e}(t),e.setTimeout((()=>e.print()),1e3),e.addEventListener("afterprint",(function(){this.confirm("Close window after successful print?")&&e.close()}))}(e.target);alert(`Unsupported type: ${o}`)}else alert("Node not found!")}(o)}),`as-${o.toLowerCase()}`)}))}()})();