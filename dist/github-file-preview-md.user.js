// ==UserScript==
// @name        GitHub File Preview Markdown
// @version     1.1.8
// @author      iamogbz
// @description Render the raw markdown in thub
// @homepage    https://github.com/iamogbz/oh-my-scripts
// @supportURL  https://github.com/iamogbz/oh-my-scripts/issues
// @icon        https://github.com/iamogbz/oh-my-scripts/raw/master/assets/monkey_128.png
// @namespace   iamogbz/oh-my-scripts
// @grant       GM_xmlhttpRequest
// @include     *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/219427c/dist/github-file-preview-md.user.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/219427c/dist/lib/dom.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/219427c/dist/lib/github.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/219427c/dist/lib/paths.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/219427c/dist/lib/request.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/219427c/dist/lib/ns.js
// @require     https://github.com/iamogbz/oh-my-scripts/raw/219427c/dist/lib/github-file.js
// @updateURL   https://github.com/iamogbz/oh-my-scripts/raw/master/dist/github-file-preview-md.user.js
// ==/UserScript==

(()=>{"use strict";var e,t={839:function(e,t,n){var r,o=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function l(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}c((r=r.apply(e,t||[])).next())}))},l=this&&this.__generator||function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}};Object.defineProperty(t,"__esModule",{value:!0});var c,u,s=n(1486),p=n(5008),f=n(1543),d=n(1603);(new(function(e){function t(){var t=e.call(this)||this;return t.id=(0,f.filePreviewNS)(c||(c=i(["extend-md"],["extend-md"]))),t.fileTypes=new Set(["md"]),t.featureClass=(0,f.filePreviewNS)(u||(u=i(["extend-md"],["extend-md"]))),t.frameTagName="div",t.frameStyle.height="auto",t.frameStyle.overflow="hidden",t}return o(t,e),t.prototype.prepareHTML=function(e){return a(this,void 0,void 0,(function(){var t,n,r,o=this;return l(this,(function(i){return n="FENCED-CODE-TAG-PLACEHOLDER",r="".concat(t="```","markdown\n").concat(e.replace(new RegExp(t,"g"),n)).concat(t),[2,(0,d.request)("https://api.github.com/markdown",{method:"POST",data:JSON.stringify({text:r})}).then((function(e){var t;return null===(t=e.text)||void 0===t?void 0:t.call(e)})).then((function(e){if(!e)return"";var r=["<pre>",'<div style="display: flex">'],i=["</pre>","</div>"];return o.replaceText(e.replace(new RegExp(n,"g"),t).replace(r[0],r[1]).replace(i[0],i[1]),r[1],i[1],(function(e){var t=e.split(/\r?\n/),n=t.map((function(e,t){return'<span class="blob-num bg-gray-light js-line-number" style="margin-right: 10px; display: inline-block; height: 20px;">'.concat(t+1,"</span>")})).join(""),r=t.map((function(e){return'<pre style="display: block; height: 20px;">'.concat(e,"</pre>")})).join("\n");return'\n              <div style="display: flex; flex-direction: column">'.concat(n,'</div>\n              <div style="overflow: scroll hidden">').concat(r,"</div>\n            ")}))}))]}))}))},t.prototype.replaceText=function(e,t,n,r){var o=e.indexOf(t),i=e.lastIndexOf(n);return e.substring(0,o)+t+r(e.substring(o+t.length,i))+n+e.substring(i+n.length)},t.prototype.frameElement=function(t){var n=e.prototype.frameElement.call(this,t);return n.removeAttribute("srcdoc"),n.innerHTML=t.srcDoc,n},t.prototype.getScrollHeight=function(e){return e.scrollHeight},t.prototype.showSource=function(t){var n=e.prototype.showRendered.call(this,t);return function(e){var r;return null===(r=t.parentElement)||void 0===r||r.classList.remove("p-5","p-xl-6"),n(e)}},t.prototype.showRendered=function(t){var n=e.prototype.showSource.call(this,t);return function(e){var r;return null===(r=t.parentElement)||void 0===r||r.classList.add("p-5","p-xl-6"),n(e)}},t.prototype.addButtonsToFileHeaderActions=function(t,n){var r;this.hideNativeButtons(t),e.prototype.addButtonsToFileHeaderActions.call(this,t,n),null===(r=(0,s.selectDOM)('.btn.BtnGroup-item[data-toggle-action="'.concat(this.toggleActionRender,'"]')))||void 0===r||r.click()},t.prototype.hideNativeButtons=function(e){var t=["source","rendered"].map((function(e){return".BtnGroup>a.".concat(e,'[href*=".md"]')})).join(",");(0,s.selectAll)(t,e).map((function(e){return e.style.display="none"}))},t.prototype.initCondition=function(){return(0,p.isSingleFile)()},t}(f.ExtendFilePreview))).setup()}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e].call(i.exports,i,i.exports,r),i.exports}r.m=t,e=[],r.O=(t,n,o,i)=>{if(!n){var a=1/0;for(s=0;s<e.length;s++){for(var[n,o,i]=e[s],l=!0,c=0;c<n.length;c++)(!1&i||a>=i)&&Object.keys(r.O).every((e=>r.O[e](n[c])))?n.splice(c--,1):(l=!1,i<a&&(a=i));if(l){e.splice(s--,1);var u=o();void 0!==u&&(t=u)}}return t}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[n,o,i]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={659:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,i,[a,l,c]=n,u=0;if(a.some((t=>0!==e[t]))){for(o in l)r.o(l,o)&&(r.m[o]=l[o]);if(c)var s=c(r)}for(t&&t(n);u<a.length;u++)i=a[u],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(s)},n=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=r.O(void 0,[509,830,270,903,218,610],(()=>r(839)));o=r.O(o)})();