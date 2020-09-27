// ==UserScript==
// @name         Block Window Open
// @namespace    https://github.com/iamogbz/oh-my-scripts
// @version      0.0.2
// @author       iamogbz
// @description  blocks window open
// @icon         https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/assets/monkey_128.png
// @updateURL    https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/scripts/no-window-open/index.user.js
// @downloadURL  https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/scripts/no-window-open/index.user.js
// @supportURL   https://github.com/iamogbz/oh-my-scripts/issues
// @include      *://*/*
// @require      https://openuserjs.org/src/libs/Marti/GM_setStyle.min.js
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const POPUP_ELEMENT_TIMEOUT = 10000; // 10 seconds
  const POPUP_ELEMENT_ID = "window-open-popup-element";
  const POPUP_ELEMENT_LINK_ID = "window-open-popup-element-link";
  const POPUP_ELEMENT_CLS_VISIBLE = "visible";
  const POPUP_ELEMENT_CSS = `
#${POPUP_ELEMENT_ID} {
  align-items: center;
  background-color: #241200EE;
  border-radius: 4px;
  bottom: 8px;
  box-shadow: #00000032 1px 1px 8px;
  color: white;
  display: flex;
  flex-flow: column;
  font-size: 0.8em;
  padding: 8px;
  position: fixed;
  right: -256px;
  text-align: center;
  transition: right 0.3s ease;
  width: 248px;
}

#${POPUP_ELEMENT_ID}.${POPUP_ELEMENT_CLS_VISIBLE} {
  right: 8px;
}

#${POPUP_ELEMENT_ID} #${POPUP_ELEMENT_LINK_ID} {
  background-color: #0366d6AA;
  border-radius: 2px;
  color: white;
  cursor: pointer;
  margin-top: 4px;
  padding: 2px 6px;
}
`;
  const POPUP_ELEMENT_TEXT = `This page just attempted to open a url.
Click on it below to proceed with navigation.`;

  function createPopupElement() {
    const element = document.createElement("div");
    element.id = POPUP_ELEMENT_ID;
    element.innerHTML = `<div>${POPUP_ELEMENT_TEXT}</div>
<a id="${POPUP_ELEMENT_LINK_ID}" target="_blank" referrer="noreferrer"/>`;
    document.body.appendChild(element);
    return element;
  }

  function getOrCreatePopupElement() {
    const element = document.getElementById(POPUP_ELEMENT_ID);
    return element || createPopupElement();
  }

  function getPopupLinkElement() {
    return document.getElementById(POPUP_ELEMENT_LINK_ID);
  }

  function setPopupLink(url) {
    getOrCreatePopupElement();
    getPopupLinkElement().setAttribute("href", url);
    getPopupLinkElement().innerText = url;
  }

  function showNotice() {
    getOrCreatePopupElement().classList.add(POPUP_ELEMENT_CLS_VISIBLE);
  }

  function hideNotice() {
    getOrCreatePopupElement().classList.remove(POPUP_ELEMENT_CLS_VISIBLE);
    getPopupLinkElement().removeAttribute("href");
  }

  function onWindowOpen(url) {
    console.log(`window.open(${url})`);
    setPopupLink(url);
    setTimeout(showNotice, 300);
    setTimeout(hideNotice, POPUP_ELEMENT_TIMEOUT);
    return null;
  }
  // ==Run==
  GM_setStyle({ data: POPUP_ELEMENT_CSS });
  window.open = onWindowOpen;
})();
