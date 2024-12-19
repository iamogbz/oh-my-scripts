// ==UserScript==
// @name Export Element
// @description Add a context menu option to print a HTML element including all styles
// @version 1.4.0
// @author iamogbz
// @homepage https://github.com/iamogbz/oh-my-scripts
// @supportURL https://github.com/iamogbz/oh-my-scripts/issues
// @match *://*/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/1.4.0/export-element.user.js
// @grant GM_registerMenuCommand
// @icon https://github.com/iamogbz/oh-my-scripts/raw/main/assets/monkey_128.png
// @namespace iamogbz/oh-my-scripts
// @updateURL https://github.com/iamogbz/oh-my-scripts/raw/gh-pages/export-element.user.js
// ==/UserScript==

(()=>{"use strict";!function(){const t=Object.freeze({PDF:"pdf"}),e={target:null,type:t.PDF};function n(t,e){for(;t;){if(e(t))return t;t=t.parentNode}return null}document.addEventListener("contextmenu",(function(t){e.target=n(t.target,(t=>!t.nextSibling))})),Object.values(t).forEach((o=>{window.GM_registerMenuCommand(`As ${o.toUpperCase()}`,(()=>{!function(o){if(e.target){if(o===t.PDF)return function(t){const e=window.open("","","width=800,height=600");if(!e)return void alert("Please allow popups for this site and try again.");const o=e.document,r=function(t,e){function n(e,n){const o=t.getComputedStyle(e);for(const t of o)n.style.setProperty(t,o.getPropertyValue(t))}const o=e.cloneNode(!0);return n(e,o),function t(e,o){const r=e;for(let e=0;e<r.children.length;e++){const i=o;n(r.children[e],i.children[e]),t(r.children[e],i.children[e])}}(e,o),o}(window,t);"body"===r.tagName.toLowerCase()?o.body.outerHTML=r.outerHTML:o.body.appendChild(r),o.body.style.backgroundColor=function(t){const e="transparent",o=n(t,(t=>{if(!(t instanceof Element))return!1;const n=window.getComputedStyle(t).backgroundColor;if(!n)return!1;if(n===e)return!1;const o=n.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);return!o||0!==(o[4]?parseFloat(o[4]):1)}));return o?window.getComputedStyle(o).getPropertyValue("background-color"):e}(t),e.setTimeout((()=>e.print()),1e3),e.addEventListener("afterprint",(function(){this.confirm("Close window after successful print?")&&e.close()}))}(e.target);alert(`Unsupported type: ${o}`)}else alert("Node not found!")}(o)}),`as-${o.toLowerCase()}`)}))}()})();