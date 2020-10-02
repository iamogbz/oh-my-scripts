function getQueryElement(element) {
  return element === undefined ? document : element;
}

function selectAll(selectors, baseElement) {
  const queryElement = getQueryElement(baseElement);
  return Array.apply(
    null,
    queryElement ? queryElement.querySelectorAll(String(selectors)) : []
  );
}

function selectDOM(selectors, baseElement) {
  const element = getQueryElement(baseElement);
  return element && element.querySelector(String(selectors));
}

function selectExists(...args) {
  return Boolean(selectDOM(...args));
}

function selectOrThrow(selectors, baseElement) {
  const result = selectDOM(selectors, baseElement);
  if (!result) {
    throw new Error(`Not found: ${selectors}, ${baseElement}`);
  }
  return result;
}

function isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;
}

function getTagNS(tagName) {
  if (tagName === "math") return "http://www.w3.org/1998/Math/MathML";
  if (tagName === "svg") return "http://www.w3.org/2000/svg";
  return "http://www.w3.org/1999/xhtml";
}

function createElement({
  attributes = {},
  children = [],
  events = {},
  tagName,
  tagNS = undefined,
}) {
  const elem = document.createElementNS(tagNS || getTagNS(tagName), tagName);
  for (const [eventType, listener] of Object.entries(events)) {
    elem.addEventListener(eventType, listener);
  }
  for (const [attrName, value] of Object.entries(attributes)) {
    if (typeof value === "boolean" && !value) continue;
    elem.setAttribute(attrName, value);
  }
  const unsupportedChildTypes = ["boolean", "function", "symbol", "undefined"];
  for (const child of children) {
    if (child === null || unsupportedChildTypes.includes(typeof child)) {
      console.error(`Appending child of type '${child}' is not supported.`);
    } else if (isElement(child)) {
      elem.appendChild(child);
    } else if (typeof child === "object") {
      elem.appendChild(createElement(child));
    } else {
      elem.appendChild(document.createTextNode(String(child)));
    }
  }
  return elem;
}

function createElementStyle(style = {}) {
  return Object.entries(style)
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ");
}

function observeEl(el, listener, options = { childList: true }) {
  const element = typeof el === "string" ? document.querySelector(el) : el;
  if (!element) {
    return;
  }

  // Run on updates
  const observer = new MutationObserver(listener);
  observer.observe(element, options);

  // Run the first time
  listener.call(observer, [], observer);

  return observer;
}
