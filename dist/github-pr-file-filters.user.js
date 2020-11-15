// ==UserScript==
// @name        GitHub PR File Filters
// @version     1.1.1
// @author      iamogbz
// @description Extend GitHub PR File Types Filter
// @homepage    https://github.com/iamogbz/oh-my-scripts
// @supportURL  https://github.com/iamogbz/oh-my-scripts/issues
// @icon        https://github.com/iamogbz/oh-my-scripts/raw/master/assets/monkey_128.png
// @namespace   iamogbz/oh-my-scripts
// @grant       GM_xmlhttpRequest
// @include     *://github.com/*
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/master/dist/github-pr-file-filters.user.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/dom.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/github.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/paths.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/request.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/ns.js?v=b610462
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/debounce.js?v=b610462
// @updateURL   https://github.com/iamogbz/oh-my-scripts/raw/master/dist/github-pr-file-filters.user.js?v=b610462
// ==/UserScript==

(()=>{"use strict";var e={685:function(e,t,r){var l=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e},n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,l=arguments.length;r<l;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},a=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],l=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&l>=e.length&&(e=void 0),{value:e&&e[l++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(t,"__esModule",{value:!0});var i=r(1486),s=r(5008),c=r(8008),o=r(8724),u={prFileTypes:{},prFiles:[],selectedFileTypes:new Set,shouldExtendFileType:!0};function d(e,t){var r=n(n({},u),e);JSON.stringify(u)!==JSON.stringify(r)?(Object.assign(u,r),t(!0)):t(!1)}function f(e,t){void 0===t&&(t=u.shouldExtendFileType);var r=c.getFileType(e,t?0:1);return r?"."+r:"No extension"}function p(e){var t,r,l={};try{for(var n=a(e),i=n.next();!i.done;i=n.next()){var s=i.value,c=s.fileName,o=s.isDeleted,u=f(c);u in l||(l[u]={count:0,deleted:0}),l[u].count+=1,o&&(l[u].deleted+=1)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}return function(e){var t,r,l={};try{for(var n=a(Object.keys(e).sort((function(e,t){return e>t?1:0-Number(e<t)}))),i=n.next();!i.done;i=n.next()){var s=i.value;l[s]=e[s]}}catch(e){t={error:e}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(t)throw t.error}}return l}(l)}function y(e){return"iamogbz-pr-file-filters-"+e}var h,v,m="js-file-filter-select-all-container",b=y(h||(h=l(["deselect-all-file-types"],["deselect-all-file-types"]))),g=y(v||(v=l(["extend-file-types-toggle"],["extend-file-types-toggle"])));function x(){return i.selectOrThrow(".js-file-filter")}function k(){return i.selectOrThrow(".select-menu-list .p-2",x())}function T(e){return i.selectOrThrow('.js-diff-file-type-option[value="'+e+'"]',k())}function O(e){var t=e.deletedCount,r=e.fileType,l=e.onChange,n=e.totalCount,a=n-t;function s(e){return"("+e+")"}return i.createElement({attributes:{class:"d-flex"},children:[{attributes:{class:"pl-1 mb-1"},children:[{attributes:{checked:!0,class:"js-diff-file-type-option","data-deleted-files-count":t,"data-non-deleted-files-count":a,type:"checkbox",value:r},events:{change:l},tagName:"input"},r,{attributes:{class:"text-normal js-file-type-count","data-all-file-count-markup":s(n),"data-deleted-file-count-markup":s(t),"data-non-deleted-file-count-markup":s(a)},children:[s(n)],tagName:"span"}],tagName:"label"}],tagName:"div"})}function w(){var e,t=u.prFileTypes,r=Object.keys(t);u.selectedFileTypes=new Set(r.filter((function(e){return T(e).checked})));var l=i.selectOrThrow("."+b,k()),n=u.selectedFileTypes.size>0;l.classList.remove("text-"+(n?"gray":"blue")),l.classList.add("text-"+(n?"blue":"gray"));var a=l.dataset,s=a.deselectAllMarkup,c=a.allDeselectedMarkup;l.innerText=null!==(e=n?s:c)&&void 0!==e?e:""}function N(){var e,t;if(u.selectedFileTypes.size>0)try{for(var r=a(u.selectedFileTypes),l=r.next();!l.done;l=r.next())T(l.value).click()}catch(t){e={error:t}}finally{try{l&&!l.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}else w()}function j(){d({prFileTypes:p(u.prFiles)},(function(e){e&&(function(){var e,t;try{for(var r=a(i.selectAll(".file.Details")),l=r.next();!l.done;l=r.next()){var n=l.value,s=i.selectOrThrow(".file-header",n);if(!s.dataset.path)return;var c=f(s.dataset.path);s.dataset.fileType=c,n.dataset.fileType=c}}catch(t){e={error:t}}finally{try{l&&!l.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}}(),function(){var e,t,r=k();r.textContent="";var l=u.prFileTypes,n=Object.keys(l),s=o.debounce(w,50);try{for(var c=a(n),d=c.next();!d.done;d=c.next()){var f=d.value,p={deletedCount:l[f].deleted,fileType:f,onChange:s,totalCount:l[f].count};r.append(O(p))}}catch(t){e={error:t}}finally{try{d&&!d.done&&(t=c.return)&&t.call(c)}finally{if(e)throw e.error}}r.append(function(e){var t=e.count,r=e.onClick,l=t>1?"types":"type",n="Select all "+t+" file "+l,a="All "+t+" file "+l+" selected";return i.createElement({attributes:{class:"ml-1",style:i.createElementStyle({padding:"4px 0 0"})},children:[{attributes:{style:i.createElementStyle({cursor:"pointer"})},children:[{attributes:{class:"js-file-filter-select-all",hidden:!0,type:"checkbox"},tagName:"input"},{attributes:{class:m+" no-underline text-normal text-gray","data-all-selected-markup":a,"data-select-all-markup":n},events:{click:r},children:[a],tagName:"span"}],tagName:"label"}],tagName:"div"})}({count:n.length,onClick:s}));var y=o.debounce(N,50);r.append(function(e){var t=e.count,r=e.onClick,l=t>1?"types":"type",n="Deselect all "+t+" file "+l,a="All "+t+" file "+l+" deselected";return i.createElement({attributes:{class:"ml-1",style:i.createElementStyle({padding:"6px 0 0"})},children:[{attributes:{style:i.createElementStyle({cursor:"pointer"})},children:[{attributes:{hidden:!0,type:"checkbox"},tagName:"input"},{attributes:{class:b+" no-underline text-normal text-blue","data-all-deselected-markup":a,"data-deselect-all-markup":n},events:{click:r},children:[n],tagName:"span"}],tagName:"label"}],tagName:"div"})}({count:n.length,onClick:y})),w()}())}))}function F(){var e=i.selectOrThrow("#"+g);d({shouldExtendFileType:!!e&&e.checked},(function(e){if(e){var t=k(),r=Object.keys(u.prFileTypes).length;u.selectedFileTypes.size!==r&&i.selectOrThrow("."+m,t).click(),j()}}))}function C(e){u.prFiles=e;var t,r=i.selectOrThrow(".select-menu-header",x());i.selectExists("#"+g,r)||(r.append((t=F,i.createElement({children:[{children:["Use full extension "],tagName:"span"},{attributes:{checked:u.shouldExtendFileType,id:g,type:"checkbox"},events:{change:t},tagName:"input"}],tagName:"label"}))),j())}s.onAjaxedPagesRaw((function(){var e;if(s.isPRFiles())return(e="repos/"+s.getCleanPathname().replace("/pull/","/pulls/")+"?per_page=1000",s.githubApi.v3(e).then((function(e){return e?e.map((function(e){var t=e.status;return{fileName:e.filename,isDeleted:"removed"===t}})):[]}))).then(C)}))}},t={};function r(l){if(t[l])return t[l].exports;var n=t[l]={exports:{}};return e[l].call(n.exports,n,n.exports,r),n.exports}r.m=e,r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={647:0},t=[[685,509,830,270,903,218,358]],l=()=>{};function n(){for(var l,n=0;n<t.length;n++){for(var a=t[n],i=!0,s=1;s<a.length;s++){var c=a[s];0!==e[c]&&(i=!1)}i&&(t.splice(n--,1),l=r(r.s=a[0]))}return 0===t.length&&(r.x(),r.x=()=>{}),l}r.x=()=>{r.x=()=>{},i=i.slice();for(var e=0;e<i.length;e++)a(i[e]);return(l=n)()};var a=n=>{for(var a,i,[c,o,u,d]=n,f=0,p=[];f<c.length;f++)i=c[f],r.o(e,i)&&e[i]&&p.push(e[i][0]),e[i]=0;for(a in o)r.o(o,a)&&(r.m[a]=o[a]);for(u&&u(r),s(n);p.length;)p.shift()();return d&&t.push.apply(t,d),l()},i=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[],s=i.push.bind(i);i.push=a})(),r.x()})();