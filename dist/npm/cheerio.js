(self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[]).push([[461],{2905:(t,e,n)=>{window.cheerio=n(7911)},6451:(t,e,n)=>{var r=n(6634),i=n(5633),o=i.isTag,s=i.domEach,a=Object.prototype.hasOwnProperty,c=i.camelCase,l=i.cssCase,h=/\s+/,u="data-",f={forEach:n(4486),extend:n(3045),some:n(9704)},p={null:null,true:!0,false:!1},d=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,m=function(t,e){if(t&&o(t))return t.attribs||(t.attribs={}),e?a.call(t.attribs,e)?d.test(e)?e:t.attribs[e]:"option"===t.name&&"value"===e?r.text(t.children):"input"!==t.name||"radio"!==t.attribs.type&&"checkbox"!==t.attribs.type||"value"!==e?void 0:"on":t.attribs},y=function(t,e,n){null===n?_(t,e):t.attribs[e]=n+""};e.attr=function(t,e){return"object"==typeof t||void 0!==e?s(this,"function"==typeof e?function(n,r){y(r,t,e.call(r,n,r.attribs[t]))}:function(n,r){o(r)&&("object"==typeof t?f.forEach(t,(function(t,e){y(r,e,t)})):y(r,t,e))}):m(this[0],t)};var g=function(t,e){if(t&&o(t))return e in t?t[e]:d.test(e)?void 0!==m(t,e):m(t,e)},x=function(t,e,n){t[e]=d.test(e)?!!n:n};e.prop=function(t,e){var n,r=0;if("string"==typeof t&&void 0===e){switch(t){case"style":n=this.css(),f.forEach(n,(function(t,e){n[r++]=e})),n.length=r;break;case"tagName":case"nodeName":n=this[0].name.toUpperCase();break;default:n=g(this[0],t)}return n}if("object"==typeof t||void 0!==e)return s(this,"function"==typeof e?function(n,r){x(r,t,e.call(r,n,g(r,t)))}:function(n,r){o(r)&&("object"==typeof t?f.forEach(t,(function(t,e){x(r,e,t)})):x(r,t,e))})};var b=function(t,e){var n,r,i,o,s,h,f,d=1===arguments.length;for(d?i=(n=Object.keys(t.attribs).filter((function(t){return t.slice(0,u.length)===u}))).map((function(t){return c(t.slice(u.length))})):(n=[u+l(e)],i=[e]),h=0,f=n.length;h<f;++h)if(r=n[h],o=i[h],a.call(t.attribs,r)){if(s=t.attribs[r],a.call(p,s))s=p[s];else if(s===String(Number(s)))s=Number(s);else if(v.test(s))try{s=JSON.parse(s)}catch(t){}t.data[o]=s}return d?t.data:s};e.data=function(t,e){var n=this[0];if(n&&o(n))return n.data||(n.data={}),t?"object"==typeof t||void 0!==e?(s(this,(function(n,r){!function(t,e,n){if(t.data||(t.data={}),"object"==typeof e)return f.extend(t.data,e);"string"==typeof e&&void 0!==n&&(t.data[e]=n)}(r,t,e)})),this):a.call(n.data,t)?n.data[t]:b(n,t):b(n)},e.val=function(t){var e=0===arguments.length,n=this[0];if(n)switch(n.name){case"textarea":return this.text(t);case"input":return"radio"===this.attr("type")?e?this.attr("value"):(this.attr("value",t),this):this.attr("value",t);case"select":var r,i=this.find("option:selected");if(void 0===i)return;if(!e){if(!this.attr().hasOwnProperty("multiple")&&"object"==typeof t)return this;"object"!=typeof t&&(t=[t]),this.find("option").removeAttr("selected");for(var o=0;o<t.length;o++)this.find('option[value="'+t[o]+'"]').attr("selected","");return this}return r=i.attr("value"),this.attr().hasOwnProperty("multiple")&&(r=[],s(i,(function(t,e){r.push(m(e,"value"))}))),r;case"option":return e?this.attr("value"):(this.attr("value",t),this)}};var _=function(t,e){t.attribs&&a.call(t.attribs,e)&&delete t.attribs[e]};e.removeAttr=function(t){return s(this,(function(e,n){_(n,t)})),this},e.hasClass=function(t){return f.some(this,(function(e){var n,r=e.attribs,i=r&&r.class,o=-1;if(i&&t.length)for(;(o=i.indexOf(t,o+1))>-1;)if(n=o+t.length,(0===o||h.test(i[o-1]))&&(n===i.length||h.test(i[n])))return!0}))},e.addClass=function(t){if("function"==typeof t)return s(this,(function(n,r){var i=r.attribs.class||"";e.addClass.call([r],t.call(r,n,i))}));if(!t||"string"!=typeof t)return this;for(var n=t.split(h),r=this.length,i=0;i<r;i++)if(o(this[i])){var a,c,l=m(this[i],"class");if(l){c=" "+l+" ",a=n.length;for(var u=0;u<a;u++){var f=n[u]+" ";c.indexOf(" "+f)<0&&(c+=f)}y(this[i],"class",c.trim())}else y(this[i],"class",n.join(" ").trim())}return this};var k=function(t){return t?t.trim().split(h):[]};e.removeClass=function(t){var n,r,i;return"function"==typeof t?s(this,(function(n,r){e.removeClass.call([r],t.call(r,n,r.attribs.class||""))})):(n=k(t),r=n.length,i=0===arguments.length,s(this,(function(t,e){if(o(e))if(i)e.attribs.class="";else{for(var s,a,c=k(e.attribs.class),l=0;l<r;l++)(s=c.indexOf(n[l]))>=0&&(c.splice(s,1),a=!0,l--);a&&(e.attribs.class=c.join(" "))}})))},e.toggleClass=function(t,n){if("function"==typeof t)return s(this,(function(r,i){e.toggleClass.call([i],t.call(i,r,i.attribs.class||"",n),n)}));if(!t||"string"!=typeof t)return this;for(var r,i,a=t.split(h),c=a.length,l="boolean"==typeof n?n?1:-1:0,u=this.length,f=0;f<u;f++)if(o(this[f])){r=k(this[f].attribs.class);for(var p=0;p<c;p++)i=r.indexOf(a[p]),l>=0&&i<0?r.push(a[p]):l<=0&&i>=0&&r.splice(i,1);this[f].attribs.class=r.join(" ")}return this},e.is=function(t){return!!t&&this.filter(t).length>0}},9806:(t,e,n)=>{var r=n(5633).domEach,i={pick:n(8718)},o=Object.prototype.toString;function s(t,e,n,r){if("string"==typeof e){var i=a(t);"function"==typeof n&&(n=n.call(t,r,i[e])),""===n?delete i[e]:null!=n&&(i[e]=n),t.attribs.style=(o=i,Object.keys(o||{}).reduce((function(t,e){return t+(t?" ":"")+e+": "+o[e]+";"}),""))}else"object"==typeof e&&Object.keys(e).forEach((function(n){s(t,n,e[n])}));var o}function a(t,e){if(t&&t.attribs){var n=function(t){return(t=(t||"").trim())?t.split(";").reduce((function(t,e){var n=e.indexOf(":");return n<1||n===e.length-1||(t[e.slice(0,n).trim()]=e.slice(n+1).trim()),t}),{}):{}}(t.attribs.style);return"string"==typeof e?n[e]:Array.isArray(e)?i.pick(n,e):n}}e.css=function(t,e){return 2===arguments.length||"[object Object]"===o.call(t)?r(this,(function(n,r){s(r,t,e,n)})):a(this[0],t)}},3432:(t,e,n)=>{var r="input,select,textarea,keygen",i=/%20/g,o=/\r?\n/g,s={map:n(5161)};e.serialize=function(){var t=this.serializeArray();return s.map(t,(function(t){return encodeURIComponent(t.name)+"="+encodeURIComponent(t.value)})).join("&").replace(i,"+")},e.serializeArray=function(){var t=this.constructor;return this.map((function(){var e=t(this);return"form"===this.name?e.find(r).toArray():e.filter(r).toArray()})).filter('[name!=""]:not(:disabled):not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))').map((function(e,n){var r=t(n),i=r.attr("name"),a=r.val();return null==a&&(a=""),Array.isArray(a)?s.map(a,(function(t){return{name:i,value:t.replace(o,"\r\n")}})):{name:i,value:a.replace(o,"\r\n")}})).get()}},7221:(t,e,n)=>{var r=n(5012),i=n(6634),o=r.update,s=r.evaluate,a=n(5633),c=a.domEach,l=a.cloneDom,h=a.isHtml,u=Array.prototype.slice,f={flatten:n(5564),bind:n(8169),forEach:n(4486)};e._makeDomArray=function(t,e){return null==t?[]:t.cheerio?e?l(t.get(),t.options):t.get():Array.isArray(t)?f.flatten(t.map((function(t){return this._makeDomArray(t,e)}),this)):"string"==typeof t?s(t,this.options):e?l([t]):[t]};var p=function(t){return function(){var e=u.call(arguments),n=this.length-1;return c(this,(function(r,o){var s,a;a="function"==typeof e[0]?e[0].call(o,r,i.html(o.children)):e,s=this._makeDomArray(a,r<n),t(s,o.children,o)}))}},d=function(t,e,n,r,i){var o,s,a,c,l,h=[e,n].concat(r),u=t[e-1]||null,f=t[e]||null;for(o=0,s=r.length;o<s;++o)a=(l=(c=r[o]).parent||c.root)&&l.children.indexOf(r[o]),l&&a>-1&&(l.children.splice(a,1),i===l&&e>a&&h[0]--),c.root=null,c.parent=i,c.prev&&(c.prev.next=c.next||null),c.next&&(c.next.prev=c.prev||null),c.prev=r[o-1]||u,c.next=r[o+1]||f;return u&&(u.next=r[0]),f&&(f.prev=r[r.length-1]),t.splice.apply(t,h)};e.appendTo=function(t){return t.cheerio||(t=this.constructor.call(this.constructor,t,null,this._originalRoot)),t.append(this),this},e.prependTo=function(t){return t.cheerio||(t=this.constructor.call(this.constructor,t,null,this._originalRoot)),t.prepend(this),this},e.append=p((function(t,e,n){d(e,e.length,0,t,n)})),e.prepend=p((function(t,e,n){d(e,0,0,t,n)})),e.wrap=function(t){var e="function"==typeof t&&t,n=this.length-1;return f.forEach(this,f.bind((function(r,i){var s,a,c,l,u=r.parent||r.root,f=u.children;if(u){for(e&&(t=e.call(r,i)),"string"!=typeof t||h(t)||(t=this.parents().last().find(t).clone()),a=(s=this._makeDomArray(t,i<n).slice(0,1))[0],c=0;a&&a.children&&!(c>=a.children.length);)"tag"===a.children[c].type?(a=a.children[c],c=0):c++;l=f.indexOf(r),o([r],a),d(f,l,0,s,u)}}),this)),this},e.after=function(){var t=u.call(arguments),e=this.length-1;return c(this,(function(n,r){var o=r.parent||r.root;if(o){var s,a,c=o.children,l=c.indexOf(r);l<0||(s="function"==typeof t[0]?t[0].call(r,n,i.html(r.children)):t,a=this._makeDomArray(s,n<e),d(c,l+1,0,a,o))}})),this},e.insertAfter=function(t){var e=[],n=this;return"string"==typeof t&&(t=this.constructor.call(this.constructor,t,null,this._originalRoot)),t=this._makeDomArray(t),n.remove(),c(t,(function(t,r){var i=n._makeDomArray(n.clone()),o=r.parent||r.root;if(o){var s=o.children,a=s.indexOf(r);a<0||(d(s,a+1,0,i,o),e.push(i))}})),this.constructor.call(this.constructor,this._makeDomArray(e))},e.before=function(){var t=u.call(arguments),e=this.length-1;return c(this,(function(n,r){var o=r.parent||r.root;if(o){var s,a,c=o.children,l=c.indexOf(r);l<0||(s="function"==typeof t[0]?t[0].call(r,n,i.html(r.children)):t,a=this._makeDomArray(s,n<e),d(c,l,0,a,o))}})),this},e.insertBefore=function(t){var e=[],n=this;return"string"==typeof t&&(t=this.constructor.call(this.constructor,t,null,this._originalRoot)),t=this._makeDomArray(t),n.remove(),c(t,(function(t,r){var i=n._makeDomArray(n.clone()),o=r.parent||r.root;if(o){var s=o.children,a=s.indexOf(r);a<0||(d(s,a,0,i,o),e.push(i))}})),this.constructor.call(this.constructor,this._makeDomArray(e))},e.remove=function(t){var e=this;return t&&(e=e.filter(t)),c(e,(function(t,e){var n=e.parent||e.root;if(n){var r=n.children,i=r.indexOf(e);i<0||(r.splice(i,1),e.prev&&(e.prev.next=e.next),e.next&&(e.next.prev=e.prev),e.prev=e.next=e.parent=e.root=null)}})),this},e.replaceWith=function(t){var e=this;return c(this,(function(n,r){var i=r.parent||r.root;if(i){var s,a=i.children,c=e._makeDomArray("function"==typeof t?t.call(r,n,r):t);o(c,null),s=a.indexOf(r),d(a,s,1,c,i),r.parent=r.prev=r.next=r.root=null}})),this},e.empty=function(){return c(this,(function(t,e){f.forEach(e.children,(function(t){t.next=t.prev=t.parent=null})),e.children.length=0})),this},e.html=function(t){if(void 0===t)return this[0]&&this[0].children?i.html(this[0].children,this.options):null;var e=this.options;return c(this,(function(n,r){f.forEach(r.children,(function(t){t.next=t.prev=t.parent=null}));var i=t.cheerio?t.clone().get():s(""+t,e);o(i,r)})),this},e.toString=function(){return i.html(this,this.options)},e.text=function(t){return void 0===t?i.text(this):"function"==typeof t?c(this,(function(n,r){var o=[r];return e.text.call(o,t.call(r,n,i.text(o)))})):(c(this,(function(e,n){f.forEach(n.children,(function(t){t.next=t.prev=t.parent=null})),o({data:""+t,type:"text",parent:n,prev:null,next:null,children:[]},n)})),this)},e.clone=function(){return this._make(l(this.get(),this.options))}},1042:(t,e,n)=>{var r=n(6780),i=n(5633),o=i.domEach,s=n(3719).DomUtils.uniqueSort,a=i.isTag,c={bind:n(8169),forEach:n(4486),reject:n(3063),filter:n(3105),reduce:n(4061)};e.find=function(t){var e,n=c.reduce(this,(function(t,e){return t.concat(c.filter(e.children,a))}),[]),i=this.constructor.contains;if(t&&"string"!=typeof t)return e=t.cheerio?t.get():[t],this._make(e.filter((function(t){var e,n;for(e=0,n=this.length;e<n;++e)if(i(this[e],t))return!0}),this));var o={__proto__:this.options,context:this.toArray()};return this._make(r(t,n,o))},e.parent=function(t){var n=[];return o(this,(function(t,e){var r=e.parent;r&&n.indexOf(r)<0&&n.push(r)})),arguments.length&&(n=e.filter.call(n,t,this)),this._make(n)},e.parents=function(t){var e=[];return this.get().reverse().forEach((function(n){h(this,n.parent,t,1/0).forEach((function(t){-1===e.indexOf(t)&&e.push(t)}))}),this),this._make(e)},e.parentsUntil=function(t,e){var n,i,o=[];return"string"==typeof t?n=r(t,this.parents().toArray(),this.options)[0]:t&&t.cheerio?i=t.toArray():t&&(n=t),this.toArray().reverse().forEach((function(t){for(;(t=t.parent)&&(n&&t!==n||i&&-1===i.indexOf(t)||!n&&!i);)a(t)&&-1===o.indexOf(t)&&o.push(t)}),this),this._make(e?r(e,o,this.options):o)},e.closest=function(t){var e=[];return t?(o(this,function(n,r){var i=h(this,r,t,1)[0];i&&e.indexOf(i)<0&&e.push(i)}.bind(this)),this._make(e)):this._make(e)},e.next=function(t){if(!this[0])return this;var n=[];return c.forEach(this,(function(t){for(;t=t.next;)if(a(t))return void n.push(t)})),t?e.filter.call(n,t,this):this._make(n)},e.nextAll=function(t){if(!this[0])return this;var n=[];return c.forEach(this,(function(t){for(;t=t.next;)a(t)&&-1===n.indexOf(t)&&n.push(t)})),t?e.filter.call(n,t,this):this._make(n)},e.nextUntil=function(t,n){if(!this[0])return this;var i,o,s=[];return"string"==typeof t?i=r(t,this.nextAll().get(),this.options)[0]:t&&t.cheerio?o=t.get():t&&(i=t),c.forEach(this,(function(t){for(;(t=t.next)&&(i&&t!==i||o&&-1===o.indexOf(t)||!i&&!o);)a(t)&&-1===s.indexOf(t)&&s.push(t)})),n?e.filter.call(s,n,this):this._make(s)},e.prev=function(t){if(!this[0])return this;var n=[];return c.forEach(this,(function(t){for(;t=t.prev;)if(a(t))return void n.push(t)})),t?e.filter.call(n,t,this):this._make(n)},e.prevAll=function(t){if(!this[0])return this;var n=[];return c.forEach(this,(function(t){for(;t=t.prev;)a(t)&&-1===n.indexOf(t)&&n.push(t)})),t?e.filter.call(n,t,this):this._make(n)},e.prevUntil=function(t,n){if(!this[0])return this;var i,o,s=[];return"string"==typeof t?i=r(t,this.prevAll().get(),this.options)[0]:t&&t.cheerio?o=t.get():t&&(i=t),c.forEach(this,(function(t){for(;(t=t.prev)&&(i&&t!==i||o&&-1===o.indexOf(t)||!i&&!o);)a(t)&&-1===s.indexOf(t)&&s.push(t)})),n?e.filter.call(s,n,this):this._make(s)},e.siblings=function(t){var n=this.parent(),r=c.filter(n?n.children():this.siblingsAndMe(),c.bind((function(t){return a(t)&&!this.is(t)}),this));return void 0!==t?e.filter.call(r,t,this):this._make(r)},e.children=function(t){var n=c.reduce(this,(function(t,e){return t.concat(c.filter(e.children,a))}),[]);return void 0===t?this._make(n):e.filter.call(n,t,this)},e.contents=function(){return this._make(c.reduce(this,(function(t,e){return t.push.apply(t,e.children),t}),[]))},e.each=function(t){for(var e=0,n=this.length;e<n&&!1!==t.call(this[e],e,this[e]);)++e;return this},e.map=function(t){return this._make(c.reduce(this,(function(e,n,r){var i=t.call(n,r,n);return null==i?e:e.concat(i)}),[]))};var l=function(t){return function(e,n){var i;return n=n||this,i="string"==typeof e?r.compile(e,n.options):"function"==typeof e?function(t,n){return e.call(t,n,t)}:e.cheerio?e.is.bind(e):function(t){return e===t},n._make(t(this,i))}};function h(t,n,r,i){for(var o=[];n&&o.length<i;)r&&!e.filter.call([n],r,t).length||o.push(n),n=n.parent;return o}e.filter=l(c.filter),e.not=l(c.reject),e.has=function(t){var n=this;return e.filter.call(this,(function(){return n._make(this).find(t).length>0}))},e.first=function(){return this.length>1?this._make(this[0]):this},e.last=function(){return this.length>1?this._make(this[this.length-1]):this},e.eq=function(t){return 0==(t=+t)&&this.length<=1?this:(t<0&&(t=this.length+t),this[t]?this._make(this[t]):this._make([]))},e.get=function(t){return null==t?Array.prototype.slice.call(this):this[t<0?this.length+t:t]},e.index=function(t){var e,n;return 0===arguments.length?(e=this.parent().children(),n=this[0]):"string"==typeof t?(e=this._make(t),n=this[0]):(e=this,n=t.cheerio?t[0]:t),e.get().indexOf(n)},e.slice=function(){return this._make([].slice.apply(this,arguments))},e.end=function(){return this.prevObject||this._make([])},e.add=function(t,e){for(var n=this._make(t,e),r=s(n.get().concat(this.get())),i=0;i<r.length;++i)n[i]=r[i];return n.length=r.length,n},e.addBack=function(t){return this.add(arguments.length?this.prevObject.filter(t):this.prevObject)}},7911:(t,e,n)=>{var r=n(5012),i=n(5633).isHtml,o={extend:n(3045),bind:n(8169),forEach:n(4486),defaults:n(1747)},s=[n(6451),n(1042),n(7221),n(9806),n(3432)],a=t.exports=function(t,e,n,s){return this instanceof a?(this.options=o.defaults(s||{},this.options),t?(n&&("string"==typeof n&&(n=r(n,this.options)),this._root=a.call(this,n)),t.cheerio?t:(c(t)&&(t=[t]),Array.isArray(t)?(o.forEach(t,o.bind((function(t,e){this[e]=t}),this)),this.length=t.length,this):"string"==typeof t&&i(t)?a.call(this,r(t,this.options).children):(e?"string"==typeof e?i(e)?(e=r(e,this.options),e=a.call(this,e)):(t=[e,t].join(" "),e=this._root):e.cheerio||(e=a.call(this,e)):e=this._root,e?e.find(t):this))):this):new a(t,e,n,s)};o.extend(a,n(6634)),a.prototype.cheerio="[cheerio object]",a.prototype.options={withDomLvl1:!0,normalizeWhitespace:!1,xmlMode:!1,decodeEntities:!0},a.prototype.length=0,a.prototype.splice=Array.prototype.splice,a.prototype._make=function(t,e){var n=new this.constructor(t,e,this._root,this.options);return n.prevObject=this,n},a.prototype.toArray=function(){return this.get()},s.forEach((function(t){o.extend(a.prototype,t)}));var c=function(t){return t.name||"text"===t.type||"comment"===t.type}},5012:(t,e,n)=>{var r=n(3719);(e=t.exports=function(t,n){var r=e.evaluate(t,n),i=e.evaluate("<root></root>",n)[0];return i.type="root",e.update(r,i),i}).evaluate=function(t,e){return"string"==typeof t||Buffer.isBuffer(t)?r.parseDOM(t,e):t},e.update=function(t,e){Array.isArray(t)||(t=[t]),e?e.children=t:e=null;for(var n=0;n<t.length;n++){var r=t[n],i=r.parent||r.root,o=i&&i.children;o&&o!==t&&(o.splice(o.indexOf(r),1),r.prev&&(r.prev.next=r.next),r.next&&(r.next.prev=r.prev)),e?(r.prev=t[n-1]||null,r.next=t[n+1]||null):r.prev=r.next=null,e&&"root"===e.type?(r.root=e,r.parent=null):(r.root=null,r.parent=e)}return e}},6634:(t,e,n)=>{var r=n(6138),i=n(6780),o=n(5012),s={merge:n(2492),defaults:n(1747)};function a(t,e,n){if(e)"string"==typeof e&&(e=i(e,t._root,n));else{if(!t._root||!t._root.children)return"";e=t._root.children}return r(e,n)}function c(t){if(Array.isArray(t))return!0;if("object"!=typeof t)return!1;if(!t.hasOwnProperty("length"))return!1;if("number"!=typeof t.length)return!1;if(t.length<0)return!1;for(var e=0;e<t.length;){if(!(e in t))return!1;e++}return!0}e.load=function(t,r){var i=n(7911);r=s.defaults(r||{},i.prototype.options);var a=o(t,r),c=function(t,e,n,o){return this instanceof c?(o=s.defaults(o||{},r),i.call(this,t,e,n||a,o)):new c(t,e,n,o)};return c.prototype=Object.create(i.prototype),c.prototype.constructor=c,c.fn=c.prototype,c.prototype._originalRoot=a,s.merge(c,e),c._root=a,c._options=r,c},e.html=function(t,e){var r=n(7911);return"[object Object]"!==Object.prototype.toString.call(t)||e||"length"in t||"type"in t||(e=t,t=void 0),a(this,t,e=s.defaults(e||{},this._options,r.prototype.options))},e.xml=function(t){return a(this,t,s.defaults({xmlMode:!0},this._options))},e.text=function(t){t||(t=this.root());for(var n,r="",i=t.length,o=0;o<i;o++)"text"===(n=t[o]).type?r+=n.data:n.children&&"comment"!==n.type&&"script"!==n.tagName&&"style"!==n.tagName&&(r+=e.text(n.children));return r},e.parseHTML=function(t,e,n){var r;return t&&"string"==typeof t?("boolean"==typeof e&&(n=e),r=this.load(t),n||r("script").remove(),r.root()[0].children.slice()):null},e.root=function(){return this(this._root)},e.contains=function(t,e){if(e===t)return!1;for(;e&&e!==e.parent;)if((e=e.parent)===t)return!0;return!1},e.merge=function(t,e){if(c(t)&&c(e)){for(var n=t.length+e.length,r=0;r<e.length;)t[r+t.length]=e[r],r++;return t.length=n,t}}},5633:(t,e,n)=>{var r=n(5012),i=n(6138),o={tag:!0,script:!0,style:!0};e.isTag=function(t){return t.type&&(t=t.type),o[t]||!1},e.camelCase=function(t){return t.replace(/[_.-](\w|$)/g,(function(t,e){return e.toUpperCase()}))},e.cssCase=function(t){return t.replace(/[A-Z]/g,"-$&").toLowerCase()},e.domEach=function(t,e){for(var n=0,r=t.length;n<r&&!1!==e.call(t,n,t[n]);)++n;return t},e.cloneDom=function(t,e){return r(i(t,e),e).children};var s=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;e.isHtml=function(t){if("<"===t.charAt(0)&&">"===t.charAt(t.length-1)&&t.length>=3)return!0;var e=s.exec(t);return!(!e||!e[1])}}}]);