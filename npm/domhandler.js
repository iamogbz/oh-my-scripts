(self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[]).push([[998],{8753:(t,e,n)=>{var a=n(4431),i=/\s+/g,o=n(7790),r=n(4407);function s(t,e,n){"object"==typeof t?(n=e,e=t,t=null):"function"==typeof e&&(n=e,e=h),this._callback=t,this._options=e||h,this._elementCB=n,this.dom=[],this._done=!1,this._tagStack=[],this._parser=this._parser||null}var h={normalizeWhitespace:!1,withStartIndices:!1,withEndIndices:!1};s.prototype.onparserinit=function(t){this._parser=t},s.prototype.onreset=function(){s.call(this,this._callback,this._options,this._elementCB)},s.prototype.onend=function(){this._done||(this._done=!0,this._parser=null,this._handleCallback(null))},s.prototype._handleCallback=s.prototype.onerror=function(t){if("function"==typeof this._callback)this._callback(t,this.dom);else if(t)throw t},s.prototype.onclosetag=function(){var t=this._tagStack.pop();this._options.withEndIndices&&t&&(t.endIndex=this._parser.endIndex),this._elementCB&&this._elementCB(t)},s.prototype._createDomElement=function(t){if(!this._options.withDomLvl1)return t;var e;for(var n in e="tag"===t.type?Object.create(r):Object.create(o),t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},s.prototype._addDomElement=function(t){var e=this._tagStack[this._tagStack.length-1],n=e?e.children:this.dom,a=n[n.length-1];t.next=null,this._options.withStartIndices&&(t.startIndex=this._parser.startIndex),this._options.withEndIndices&&(t.endIndex=this._parser.endIndex),a?(t.prev=a,a.next=t):t.prev=null,n.push(t),t.parent=e||null},s.prototype.onopentag=function(t,e){var n={type:"script"===t?a.Script:"style"===t?a.Style:a.Tag,name:t,attribs:e,children:[]},i=this._createDomElement(n);this._addDomElement(i),this._tagStack.push(i)},s.prototype.ontext=function(t){var e,n=this._options.normalizeWhitespace||this._options.ignoreWhitespace;if(!this._tagStack.length&&this.dom.length&&(e=this.dom[this.dom.length-1]).type===a.Text)n?e.data=(e.data+t).replace(i," "):e.data+=t;else if(this._tagStack.length&&(e=this._tagStack[this._tagStack.length-1])&&(e=e.children[e.children.length-1])&&e.type===a.Text)n?e.data=(e.data+t).replace(i," "):e.data+=t;else{n&&(t=t.replace(i," "));var o=this._createDomElement({data:t,type:a.Text});this._addDomElement(o)}},s.prototype.oncomment=function(t){var e=this._tagStack[this._tagStack.length-1];if(e&&e.type===a.Comment)e.data+=t;else{var n={data:t,type:a.Comment},i=this._createDomElement(n);this._addDomElement(i),this._tagStack.push(i)}},s.prototype.oncdatastart=function(){var t={children:[{data:"",type:a.Text}],type:a.CDATA},e=this._createDomElement(t);this._addDomElement(e),this._tagStack.push(e)},s.prototype.oncommentend=s.prototype.oncdataend=function(){this._tagStack.pop()},s.prototype.onprocessinginstruction=function(t,e){var n=this._createDomElement({name:t,data:e,type:a.Directive});this._addDomElement(n)},t.exports=s},4407:(t,e,n)=>{var a=n(7790),i=t.exports=Object.create(a),o={tagName:"name"};Object.keys(o).forEach((function(t){var e=o[t];Object.defineProperty(i,t,{get:function(){return this[e]||null},set:function(t){return this[e]=t,t}})}))},7790:t=>{var e=t.exports={get firstChild(){var t=this.children;return t&&t[0]||null},get lastChild(){var t=this.children;return t&&t[t.length-1]||null},get nodeType(){return a[this.type]||a.element}},n={tagName:"name",childNodes:"children",parentNode:"parent",previousSibling:"prev",nextSibling:"next",nodeValue:"data"},a={element:1,text:3,cdata:4,comment:8};Object.keys(n).forEach((function(t){var a=n[t];Object.defineProperty(e,t,{get:function(){return this[a]||null},set:function(t){return this[a]=t,t}})}))}}]);