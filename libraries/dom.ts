type ElementDef = {
  attributes?: { [name: string]: string | boolean | number };
  children?: (ElementDef | Node | string)[];
  events?: {
    [K in keyof HTMLElementEventMap]?: EventListener;
  };
  tagName: string;
  tagNS?: string;
};

function isElementDef(obj: unknown): obj is ElementDef {
  return typeof (obj as ElementDef)?.tagName == "string";
}

function isElement(obj: unknown): obj is Element | HTMLDocument {
  return obj instanceof Element || obj instanceof HTMLDocument;
}

function objectEntries<K extends string, V>(obj: { [k in K]?: V }) {
  return Object.entries(obj) as [K, V][];
}

function getQueryElement(element?: Element) {
  return element ?? document;
}

export function getTagNS(tagName: string) {
  if (tagName === "math") return "http://www.w3.org/1998/Math/MathML";
  if (tagName === "svg") return "http://www.w3.org/2000/svg";
  return "http://www.w3.org/1999/xhtml";
}

export function selectAll<T extends Element>(
  selectors: string,
  baseElement?: Element,
) {
  return Array.from(
    getQueryElement(baseElement).querySelectorAll<T>(selectors),
  );
}

export function selectDOM<T extends Element>(
  selectors: string,
  baseElement?: Element,
): T | undefined {
  return getQueryElement(baseElement)?.querySelector(`${selectors}`) as T;
}

export function selectExists(selectors: string, baseElement?: Element) {
  return Boolean(selectDOM(selectors, baseElement));
}

export function selectOrThrow<T extends Element>(
  selectors: string,
  baseElement?: Element,
): T {
  const result = selectDOM<T>(selectors, baseElement);
  if (!result) {
    throw new Error(`Not found: ${selectors}, ${baseElement}`);
  }
  return result;
}

export function createElement<T extends Element>({
  attributes = {},
  children = [],
  events = {},
  tagName,
  tagNS = undefined,
}: ElementDef): T {
  const elem = document.createElementNS(tagNS || getTagNS(tagName), tagName);
  for (const [eventType, listener] of objectEntries(events)) {
    elem.addEventListener(eventType, listener);
  }
  for (const [attrName, value] of Object.entries(attributes)) {
    if (typeof value === "boolean" && !value) continue;
    elem.setAttribute(attrName, `${value}`);
  }
  const unsupportedChildTypes = ["boolean", "function", "symbol", "undefined"];
  for (const child of children) {
    if (!child || unsupportedChildTypes.includes(typeof child)) {
      console.error(`Appending child of type '${child}' is not supported.`);
    } else if (isElement(child)) {
      elem.appendChild(child);
    } else if (isElementDef(child)) {
      elem.appendChild(createElement(child));
    } else {
      elem.appendChild(document.createTextNode(`${child}`));
    }
  }
  return elem as T;
}

export function createElementStyle(style = {}) {
  return Object.entries(style)
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ");
}

export function observeEl(
  el: string | Element,
  listener: MutationCallback,
  options: MutationObserverInit = { childList: true },
) {
  let hasAttachedElementObserver = false;
  const elementObserver = new MutationObserver(listener);

  const documentObserver = new MutationObserver(() => {
    if (hasAttachedElementObserver) {
      // in case another update happens before disconnect completes
      documentObserver.disconnect();
      return;
    }
    const element = typeof el === "string" ? selectDOM(el) : el;
    if (!element) {
      return;
    }
    // Run on updates
    elementObserver.observe(element, options);
    // Run the first time
    listener.call(elementObserver, [], elementObserver);
    // do not run this again
    hasAttachedElementObserver = true;
    documentObserver.disconnect();
  });

  documentObserver.observe(document.getRootNode(), {
    childList: true,
    subtree: true,
  });

  return elementObserver;
}
