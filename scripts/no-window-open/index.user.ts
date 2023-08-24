import { HeadersProps } from "webpack-userscript";
import { createElement } from "../../libraries/dom";

export const header: HeadersProps = {
  description: "Blocks window open",
  grant: ["none"],
  name: "No Window Open",
  require: [
    "https://raw.githubusercontent.com/Martii/UserScripts/d8d8829/lib/GM_setStyle/GM_setStyle.js",
  ],
};

(function () {
  "use strict";

  function selectorNS(str: string | TemplateStringsArray) {
    return `iamogbz-no-window-open-${str}`;
  }

  const POPUP_ELEMENT_TIMEIN = 300; // .3s
  const POPUP_ELEMENT_TIMEOUT = 10000; // 10s
  const POPUP_ELEMENT_ID = selectorNS`popup-element`;
  const POPUP_ELEMENT_LINK_ID = selectorNS`popup-element-link`;
  const POPUP_ELEMENT_CLOSE_BUTTON_ID = selectorNS`popup-element-close`;
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
  right: -264px;
  text-align: center;
  transition: right 0.3s ease;
  width: 248px;
}

#${POPUP_ELEMENT_ID}.${POPUP_ELEMENT_CLS_VISIBLE} {
  right: 8px;
  z-index: ${Number.MAX_SAFE_INTEGER};
}

#${POPUP_ELEMENT_ID} #${POPUP_ELEMENT_CLOSE_BUTTON_ID} {
  background-color: #8d0303EE;
  border-radius: 2px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.8em;
  margin-top: 8px;
  padding: 4px 6px;
  width: 100%;
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
  let popupHideTimeoutId: NodeJS.Timeout;

  function createPopupElement() {
    const element = createElement<HTMLElement>({
      attributes: { id: POPUP_ELEMENT_ID },
      children: [
        { children: [POPUP_ELEMENT_TEXT], tagName: "div" },
        {
          attributes: {
            id: POPUP_ELEMENT_LINK_ID,
            target: "_blank",
            referrer: "noreferrer",
          },
          tagName: "a",
        },
        {
          attributes: {
            id: POPUP_ELEMENT_CLOSE_BUTTON_ID,
          },
          children: ["Dismiss"],
          events: { click: hideNotice },
          tagName: "button",
        },
      ],
      events: { mouseover: showNotice },
      tagName: "div",
    });
    return element;
  }

  function getOrCreatePopupElement() {
    const element =
      document.getElementById(POPUP_ELEMENT_ID) || createPopupElement();
    document.body.appendChild(element);
    return element;
  }

  function getPopupLinkElement() {
    return getOrCreatePopupElement().querySelector<HTMLElement>(
      `#${POPUP_ELEMENT_LINK_ID}`,
    );
  }

  function setPopupLink(url: string) {
    popupUrl = url;
    getOrCreatePopupElement();
    getPopupLinkElement()!.setAttribute("href", url);
    getPopupLinkElement()!.innerHTML = url;
  }

  function showNotice() {
    getOrCreatePopupElement().classList.add(POPUP_ELEMENT_CLS_VISIBLE);
    hideNoticeTimeout();
  }

  function showNoticeTimeout() {
    clearTimeout(popupHideTimeoutId);
    setTimeout(showNotice, POPUP_ELEMENT_TIMEIN);
  }

  function hideNotice() {
    getOrCreatePopupElement().classList.remove(POPUP_ELEMENT_CLS_VISIBLE);
  }

  function hideNoticeTimeout() {
    clearTimeout(popupHideTimeoutId);
    popupHideTimeoutId = setTimeout(hideNotice, POPUP_ELEMENT_TIMEOUT);
  }

  function onWindowOpen(url: string) {
    console.log(`window.open(${url})`);
    setPopupLink(url);
    showNoticeTimeout();
    // return mock window object that allows setting location
    return {
      get location() {
        return {
          assign: setPopupLink,
          close: hideNotice,
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
