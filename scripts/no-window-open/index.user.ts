import { createElement } from "../../libraries/dom";

(function () {
  "use strict";

  function selectorNS(str: string | TemplateStringsArray) {
    return `iamogbz-no-window-open-${str}`;
  }

  const POPUP_ELEMENT_TIMEIN = 300; // .3s
  const POPUP_ELEMENT_TIMEOUT = 10000; // 10s
  const POPUP_ELEMENT_ID = selectorNS`popup-element`;
  const POPUP_ELEMENT_LINK_ID = selectorNS`popup-element-link`;
  const POPUP_ELEMENT_CLS_VISIBLE = selectorNS`popup-element-visible`;
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
  overflow: hidden;
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
  word-break: break-all;
}
`;
  const POPUP_ELEMENT_TEXT = `This page just attempted to open a url.
Click on it below to proceed with navigation.`;
  let popupUrl: string;

  function createPopupElement() {
    const element = createElement({
      attributes: {
        id: POPUP_ELEMENT_ID,
      },
      children: [
        { tagName: "div", children: [POPUP_ELEMENT_TEXT] },
        {
          attributes: {
            target: "_blank",
            referrer: "noreferrer",
            id: POPUP_ELEMENT_LINK_ID,
          },
          tagName: "a",
        },
      ],
      tagName: "div",
    });
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

  function setPopupLink(url: string) {
    popupUrl = url;
    getOrCreatePopupElement();
    getPopupLinkElement()!.setAttribute("href", url);
    getPopupLinkElement()!.innerText = url;
  }

  function showNotice() {
    getOrCreatePopupElement().classList.add(POPUP_ELEMENT_CLS_VISIBLE);
  }

  function hideNotice() {
    getOrCreatePopupElement().classList.remove(POPUP_ELEMENT_CLS_VISIBLE);
    getPopupLinkElement()!.removeAttribute("href");
  }

  function onWindowOpen(url: string) {
    console.log(`window.open(${url})`);
    setPopupLink(url);
    setTimeout(showNotice, POPUP_ELEMENT_TIMEIN);
    setTimeout(hideNotice, POPUP_ELEMENT_TIMEIN + POPUP_ELEMENT_TIMEOUT);
    // return mock window object that allows setting location
    return {
      get location() {
        return {
          assign: setPopupLink,
          replace: setPopupLink,
          get href() {
            return popupUrl;
          },
          set href(value) {
            setPopupLink(value);
          },
        };
      },
      set location(value) {
        if (!value) return;
        else if (typeof value === "string") setPopupLink(value);
        else if (value.href) setPopupLink(value.href);
      },
    };
  }
  // ==Run==
  GM_setStyle({ data: POPUP_ELEMENT_CSS });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.open = onWindowOpen;
})();
