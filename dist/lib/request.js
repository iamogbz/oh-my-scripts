"use strict";(self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[]).push([[903],{1603:function(e,t){var s=this&&this.__assign||function(){return s=Object.assign||function(e){for(var t,s=1,r=arguments.length;s<r;s++)for(var n in t=arguments[s])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},s.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.request=void 0,t.request=function(e,t){return window.GM_xmlhttpRequest?new Promise((function(r,n){var o=s({onabort:n,onerror:n,onload:function(e){r({blob:function(){return Promise.resolve(new Blob([e.response]))},headers:e.responseHeaders,json:function(){return Promise.resolve(JSON.parse(e.responseText))},ok:e.status>=200&&e.status<300,status:e.status,statusText:e.statusText,text:function(){return Promise.resolve(e.responseText)},url:e.finalUrl})},ontimeout:n,url:e},t);window.GM_xmlhttpRequest(o)})):fetch(e,t)}}}]);