"use strict";(self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[]).push([[610],{1543:function(t,e,i){var n=this&&this.__assign||function(){return n=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},n.apply(this,arguments)},o=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))((function(o,r){function a(t){try{l(n.next(t))}catch(t){r(t)}}function s(t){try{l(n.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,s)}l((n=n.apply(t,e||[])).next())}))},r=this&&this.__generator||function(t,e){var i,n,o,r,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function s(r){return function(s){return function(r){if(i)throw new TypeError("Generator is already executing.");for(;a;)try{if(i=1,n&&(o=2&r[0]?n.return:r[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,r[1])).done)return o;switch(n=0,o&&(r=[2&r[0],o.value]),r[0]){case 0:case 1:o=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,n=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==r[0]&&2!==r[0])){a=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){a.label=r[1];break}if(6===r[0]&&a.label<o[1]){a.label=o[1],o=r;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(r);break}o[2]&&a.ops.pop(),a.trys.pop();continue}r=e.call(t,a)}catch(t){r=[6,t],n=0}finally{i=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,s])}}},a=this&&this.__read||function(t,e){var i="function"==typeof Symbol&&t[Symbol.iterator];if(!i)return t;var n,o,r=i.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(n=r.next()).done;)a.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(i=r.return)&&i.call(r)}finally{if(o)throw o.error}}return a};Object.defineProperty(e,"__esModule",{value:!0}),e.ExtendFilePreview=e.filePreviewNS=void 0;var s=i(1486),l=i(5008),c=i(8008),u=i(1603);e.filePreviewNS=function(t){return"iamogbz-gh-file-preview-".concat(t)};var h=function(){function t(){this.frameTagName="iframe",this.toggleActionSource="source",this.toggleActionRender="render",this.frameStyle={background:"white",border:"none",display:"block",height:"100%",left:0,padding:0,position:"absolute",top:0,width:"100%",visibility:"hidden"}}return t.prototype.initCondition=function(){return(0,l.isCommit)()||(0,l.isPRFiles)()||(0,l.isSingleFile)()},t.prototype.setup=function(){var t=this;(0,l.onAjaxedPagesRaw)((function(){t.initCondition()&&t.initFeature()}))},t.prototype.pathToFile=function(t){return"".concat((0,l.getUserRepo)(),"/").concat(t)},t.prototype.pathToBlob=function(t){return"https://raw.githubusercontent.com/".concat(this.pathToFile(t))},t.prototype.getFileContent=function(t){var e=this;return this.safeFetch((0,c.isAbsolutePath)(t)?t:this.pathToBlob(t)).then((function(t){var e;return null===(e=t.text)||void 0===e?void 0:e.call(t)})).catch((function(i){if(console.info(i),!(0,c.isAbsolutePath)(t)){var n=a(t.split("/")),o=n[0],r=n.slice(1);return l.githubApi.v3("".concat(e.pathToApi(r.join("/")),"?ref=").concat(o)).then((function(t){return atob(t.content)})).catch((function(t){console.error(t)}))}}))},t.prototype.safeFetch=function(t,e){return(0,u.request)(t,e).then((function(t){if(200!==t.status)throw new Error("".concat(t.status," - ").concat(t.statusText));return t}))},t.prototype.isSupportedFile=function(t){return this.fileTypes.has((0,c.getFileType)(t))},t.prototype.pathToApi=function(t){return"repos/".concat((0,l.getUserRepo)(),"/contents/").concat(t)},t.prototype.selectButton=function(t){var e=(0,s.selectDOM)(".BtnGroup.".concat(this.featureClass," .BtnGroup-item.selected"));e&&e.classList.remove("selected"),t.classList.add("selected"),t.blur()},t.prototype.showSource=function(t){var e=this;return function(i){var n=i.currentTarget;if(!n.disabled&&t){t.style.visibility="hidden";var o=t.parentElement;return null==o||o.style.removeProperty("overflow"),null==o||o.style.removeProperty("height"),null==o||o.style.removeProperty("max-height"),e.selectButton(n)}}},t.prototype.showRendered=function(t){var e=this;return function(i){var n=i.currentTarget,o=e.getContainerElement(t),r=e.getScrollHeight(t);if(o&&r&&!n.disabled){t.style.visibility="visible",o.style.overflow="hidden";var a="".concat(r,"px");return o.style.height=a,o.style.maxHeight=a,o.scrollLeft=0,e.selectButton(n)}}},t.prototype.getContainerElement=function(t){return t.parentElement},t.prototype.getScrollHeight=function(t){return t.contentWindow?t.contentWindow.document.body.scrollHeight+32:0},t.prototype.updateToggle=function(t,e){var i;t.disabled=!e,t.dataset.toggleAction===this.toggleActionRender&&(t.onclick=this.showRendered(e)),t.dataset.toggleAction===this.toggleActionSource&&(t.onclick=this.showSource(e)),t.setAttribute("aria-label",null!==(i=t.disabled?t.dataset.labelDisabled:t.dataset.labelEnabled)&&void 0!==i?i:"")},t.prototype.viewerButtonToggleGroup=function(t){var e=t.frameElem,i=t.isFileList,n=!e,o="HTML render toggle disabled",r=(0,s.getTagNS)("svg"),a=(0,s.createElement)({attributes:{"aria-current":"true",class:"btn btn-sm BtnGroup-item tooltipped tooltipped-".concat(i?"w":"n"," source ").concat(i?"js-source":""," ").concat(i?"":"selected"),"data-disable-with":"","data-label-disabled":o,"data-label-enabled":"Display the source ".concat(i?"diff":"blob"),"data-toggle-action":this.toggleActionSource,disabled:n},children:[{attributes:{"aria-hidden":"true",class:"octicon octicon-code",height:16,version:"1.1",viewBox:"0 0 16 16",width:16},children:[{attributes:{d:"M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z","fill-rule":"evenodd"},tagName:"path",tagNS:r}],tagName:"svg",tagNS:r}],events:{click:this.showSource(e)},tagName:"button"}),l=(0,s.createElement)({attributes:{class:"btn btn-sm BtnGroup-item tooltipped tooltipped-".concat(i?"w":"n"," rendered ").concat(i?"js-rendered":""),disabled:n,"data-disable-with":"","data-label-disabled":o,"data-label-enabled":"Display the ".concat(i?"rich diff":"rendered blob"),"data-toggle-action":this.toggleActionRender},children:[{attributes:{"aria-hidden":"true",class:"octicon octicon-file",height:16,version:"1.1",viewBox:"0 0 16 16",width:16},children:[{attributes:{d:"M3.75 1.5a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V6H9.75A1.75 1.75 0 018 4.25V1.5H3.75zm5.75.56v2.19c0 .138.112.25.25.25h2.19L9.5 2.06zM2 1.75C2 .784 2.784 0 3.75 0h5.086c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237v8.086A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25V1.75z","fill-rule":"evenodd"},tagName:"path",tagNS:r}],tagName:"svg",tagNS:r}],events:{click:this.showRendered(e)},tagName:"button"});return this.updateToggle(a,e),this.updateToggle(l,e),(0,s.createElement)({attributes:{class:"BtnGroup ".concat(this.featureClass)},children:[a,l],tagName:"span"})},t.prototype.frameElement=function(t){return(0,s.createElement)({attributes:n({class:this.featureClass,style:(0,s.createElementStyle)(this.frameStyle)},t),tagName:this.frameTagName})},t.prototype.addButtonsToFileHeaderActions=function(t,e){var i,n=this,o=".BtnGroup.".concat(this.featureClass);(0,s.selectExists)(o,t)?null===(i=(0,s.selectDOM)(o,t))||void 0===i||i.childNodes.forEach((function(t){n.updateToggle(t,e)})):t.insertBefore(this.viewerButtonToggleGroup({frameElem:e,isFileList:(0,l.isPRFiles)()||(0,l.isCommit)()}),t.firstChild)},t.prototype.addFrameToFileBody=function(t,e,i){return o(this,void 0,void 0,(function(){var n,o,a,l,c;return r(this,(function(r){switch(r.label){case 0:return i&&!(0,s.selectExists)(".js-blob-wrapper",t)?[2,void 0]:(n="".concat(this.frameTagName,".").concat(this.featureClass),(0,s.selectExists)(n,t)?[2,(0,s.selectDOM)(n,t)]:(a=this.frameElement,c={src:"https://rawgit.com/".concat(this.pathToFile(e))},l=this.prepareHTML,[4,this.getFileContent(e)]));case 1:return[4,l.apply(this,[r.sent(),e])];case 2:return o=a.apply(this,[(c.srcDoc=r.sent(),c)]),t.style.position="relative",[2,t.appendChild(o)]}}))}))},t.prototype.extendHtmlFileDetailsElements=function(t){var e=this;return function(){return Promise.all((0,s.selectAll)(".file.Details").map((function(i){return o(e,void 0,void 0,(function(){var e,n,o,a;return r(this,(function(r){switch(r.label){case 0:if(!(e=(0,s.selectOrThrow)(".file-header",i)).dataset.path)return[2];if(n="".concat(t,"/").concat(e.dataset.path),!this.isSupportedFile(n))return[2];r.label=1;case 1:return r.trys.push([1,3,,4]),[4,this.addFrameToFileBody((0,s.selectOrThrow)(".js-file-content",i),n,!0)];case 2:return(o=r.sent())?(this.addButtonsToFileHeaderActions((0,s.selectOrThrow)(".file-actions>.d-flex",e),o),[3,4]):[2];case 3:return a=r.sent(),console.error(a),[3,4];case 4:return[2]}}))}))})))}},t.prototype.initDiff=function(t){t&&(0,s.observeEl)("#files",this.extendHtmlFileDetailsElements(t),{childList:!0,subtree:!0})},t.prototype.initCommit=function(){this.initDiff((0,l.getCommitSha)())},t.prototype.initPRFiles=function(){var t;this.initDiff(null===(t=(0,s.selectDOM)(".js-reviews-container #head_sha"))||void 0===t?void 0:t.value)},t.prototype.initSingleFile=function(){return o(this,void 0,void 0,(function(){var t,e,i;return r(this,(function(n){switch(n.label){case 0:return t=(0,s.selectOrThrow)(".Box-header.js-blob-header"),e=(0,l.getRepoPath)().replace("blob/",""),this.isSupportedFile(e)?[4,this.addFrameToFileBody((0,s.selectOrThrow)(".Box.mt-3>.Box-body"),e,!1)]:[2];case 1:return(i=n.sent())?(this.addButtonsToFileHeaderActions((0,s.selectOrThrow)(".d-flex",t),i),[2]):[2]}}))}))},t.prototype.initFeature=function(){return Promise.all([(0,l.isPRFiles)()&&this.initPRFiles(),(0,l.isSingleFile)()&&this.initSingleFile(),(0,l.isCommit)()&&this.initCommit()]).then((function(t){return t.some(Boolean)}))},t}();e.ExtendFilePreview=h}}]);