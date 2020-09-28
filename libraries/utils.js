function ns(str) {
  return `iamogbz/oh-my-scripts/${str}`;
}

function debounce(fn, wait) {
  let timeoutId;
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      fn(...args);
    }, wait);
  };
}

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

function createElement({
  attributes = {},
  children = [],
  events = {},
  tagName,
}) {
  const elem = document.createElement(tagName);
  for (const [eventType, listener] of Object.entries(events)) {
    elem.addEventListener(eventType, listener);
  }
  for (const [attrName, value] of Object.entries(attributes)) {
    if (typeof value === "boolean" && !value) continue;
    elem.setAttribute(attrName, value);
  }
  for (const child of children) {
    if (
      child === null ||
      ["boolean", "function", "symbol", "undefined"].includes(typeof child)
    ) {
      console.error(`Appending child of type '${child}' is not supported.`);
    }
    elem.appendChild(
      typeof child === "object"
        ? createElement(child)
        : document.createTextNode(String(child))
    );
  }
  return elem;
}

function createElementStyle(style = {}) {
  return Object.entries(style)
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ");
}
