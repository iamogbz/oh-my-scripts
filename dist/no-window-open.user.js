// ==UserScript==
// @name        No Window Open
// @version     0.0.4
// @author      iamogbz
// @description Blocks window open
// @homepage    https://github.com/iamogbz/oh-my-scripts
// @supportURL  https://github.com/iamogbz/oh-my-scripts/issues
// @match       *://*/*
// @icon        https://github.com/iamogbz/oh-my-scripts/raw/master/assets/monkey_128.png
// @namespace   iamogbz/oh-my-scripts
// @grant       none
// @require     https://github.com/iamogbz/oh-my-scripts/raw/master/dist/lib/dom.js
// @require     https://openuserjs.org/src/libs/Marti/GM_setStyle.min.js
// @downloadURL https://github.com/iamogbz/oh-my-scripts/raw/master/dist/no-window-open.js
// ==/UserScript==

(()=>{"use strict";var e={3213:function(e,n,t){var r=this&&this.__makeTemplateObject||function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e};Object.defineProperty(n,"__esModule",{value:!0});var o,i,p,a,l=t(1486);!function(){function e(e){return"iamogbz-no-window-open-"+e}var n,t,s=e(o||(o=r(["popup-element"],["popup-element"]))),u=e(i||(i=r(["popup-element-link"],["popup-element-link"]))),c=e(p||(p=r(["popup-element-close"],["popup-element-close"]))),d=e(a||(a=r(["popup-element-visible"],["popup-element-visible"])));function f(){return document.getElementById(s)||(e=l.createElement({attributes:{id:s},children:[{children:["This page just attempted to open a url.\nClick on it below to proceed with navigation."],tagName:"div"},{attributes:{id:u,target:"_blank",referrer:"noreferrer"},tagName:"a"},{attributes:{id:c},children:["Dismiss"],events:{click:x},tagName:"button"}],events:{mouseover:g},tagName:"div"}),document.body.appendChild(e),e);var e}function h(){return f().querySelector("#"+u)}function m(e){n=e,f(),h().setAttribute("href",e),h().innerText=e}function g(){f().classList.add(d),clearTimeout(t),t=setTimeout(x,1e4)}function x(){f().classList.remove(d),h().removeAttribute("href")}GM_setStyle({data:"\n#"+s+" {\n  align-items: center;\n  background-color: #241200EE;\n  border-radius: 4px;\n  bottom: 8px;\n  box-shadow: #00000032 1px 1px 8px;\n  color: white;\n  display: flex;\n  flex-flow: column;\n  font-size: 0.8em;\n  overflow: hidden;\n  padding: 8px;\n  position: fixed;\n  right: -264px;\n  text-align: center;\n  transition: right 0.3s ease;\n  width: 248px;\n}\n\n#"+s+"."+d+" {\n  right: 8px;\n}\n\n#"+s+" #"+c+" {\n  background-color: #8d0303EE;\n  border-radius: 2px;\n  border: none;\n  color: white;\n  cursor: pointer;\n  font-size: 0.8em;\n  margin-top: 8px;\n  padding: 4px 6px;\n  width: 100%;\n}\n\n#"+s+" #"+u+" {\n  background-color: #0366d6AA;\n  border-radius: 2px;\n  color: white;\n  cursor: pointer;\n  margin-top: 4px;\n  padding: 2px 6px;\n  word-break: break-all;\n}\n"}),window.open=function(e){return console.log("window.open("+e+")"),m(e),clearTimeout(t),setTimeout(g,300),{get location(){return{assign:m,replace:m,get href(){return n},set href(e){m(e)}}},set location(e){e&&("string"==typeof e?m(e):e.href&&m(e.href))}}}}()}},n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{}};return e[r].call(o.exports,o,o.exports,t),o.exports}t.m=e,t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={508:0},n=[[3213,509]],r=()=>{};function o(){for(var r,o=0;o<n.length;o++){for(var i=n[o],p=!0,a=1;a<i.length;a++){var l=i[a];0!==e[l]&&(p=!1)}p&&(n.splice(o--,1),r=t(t.s=i[0]))}return 0===n.length&&(t.x(),t.x=()=>{}),r}t.x=()=>{t.x=()=>{},p=p.slice();for(var e=0;e<p.length;e++)i(p[e]);return(r=o)()};var i=o=>{for(var i,p,[l,s,u,c]=o,d=0,f=[];d<l.length;d++)p=l[d],t.o(e,p)&&e[p]&&f.push(e[p][0]),e[p]=0;for(i in s)t.o(s,i)&&(t.m[i]=s[i]);for(u&&u(t),a(o);f.length;)f.shift()();return c&&n.push.apply(n,c),r()},p=self.webpackChunkoh_my_scripts=self.webpackChunkoh_my_scripts||[],a=p.push.bind(p);p.push=i})(),t.x()})();