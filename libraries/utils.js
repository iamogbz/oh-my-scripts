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

function hasDomLoaded() {
  return (
    document.readyState === "interactive" || document.readyState === "complete"
  );
}

const domLoaded = new Promise((resolve) => {
  if (hasDomLoaded()) {
    resolve();
  } else {
    document.addEventListener("DOMContentLoaded", resolve, {
      capture: true,
      once: true,
      passive: true,
    });
  }
});

function selectAll(selectors, baseElement) {
  if (arguments.length === 1) {
    return Array.apply(null, document.querySelectorAll(String(selectors)));
  }
  return baseElement
    ? Array.apply(null, baseElement.querySelectorAll(String(selectors)))
    : [];
}

function selectDOM(selectors, baseElement) {
  if (arguments.length === 1) {
    return document.querySelector(String(selectors));
  }
  return baseElement && baseElement.querySelector(String(selectors));
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

function createElement({ attributes = {}, children = [], tagName }) {
  const elem = document.createElement(tagName);
  for (const [attrName, value] of Object.entries(attributes)) {
    if (typeof value === "boolean" && !value) continue;
    elem.setAttribute(attrName, value);
  }
  for (const child of children) {
    elem.appendChild(typeof child === "object" ? createElement(child) : child);
  }
  return elem;
}

function createElementStyle(style = {}) {
  return Object.entries(style)
    .map(([name, value]) => `${name}: ${value};`)
    .join(" ");
}
