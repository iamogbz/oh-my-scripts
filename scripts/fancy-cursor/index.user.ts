import { doEvery } from "../../libraries/interval";

const Constants = {
  CURSOR_ID: "fancy-cursor",
  OUTLINE_ID: "fancy-outline",
  SIZE: "2px",
  SPACE: "10px",
  Z_INDEX: Number.MAX_SAFE_INTEGER.toString(),
};

(function () {
  "use strict";

  const getCustomCursor = () => {
    const cursor =
      document.getElementById(Constants.CURSOR_ID) ||
      document.createElement("div");
    if (cursor.id) {
      return cursor;
    }
    cursor.style.backdropFilter = `blur(${Constants.SIZE})`;
    cursor.style.backgroundColor = "rgba(255, 255, 255, 1)"; // TODO: red for now
    cursor.style.borderRadius = "50%";
    cursor.style.cursor = "none";
    cursor.style.height = Constants.SIZE;
    cursor.style.mixBlendMode = "difference";
    cursor.style.opacity = "1";
    cursor.style.pointerEvents = "none";
    cursor.style.position = "fixed";
    cursor.style.touchAction = "none";
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.transition = "transform 0.1s ease";
    cursor.style.willChange = "transform";
    cursor.style.userSelect = "none";
    cursor.style.width = Constants.SIZE;
    cursor.style.zIndex = Constants.Z_INDEX;
    if (!cursor.id) {
      cursor.id = Constants.CURSOR_ID;
      document.body.appendChild(cursor);
    }
    return cursor;
  };

  const getCustomOutline = () => {
    const outline = document.createElement("div");
    if (outline.id) {
      return outline;
    }
    outline.style.borderRadius = Constants.SIZE;
    outline.style.boxSizing = "border-box";
    outline.style.backgroundColor = "rgba(255, 255, 255, 1)";
    outline.style.mixBlendMode = "difference";
    outline.style.cursor = "none";
    outline.style.pointerEvents = "none";
    outline.style.position = "fixed";
    outline.style.transitionDuration = "0.1s";
    outline.style.transitionTimingFunction = "ease";
    outline.style.transitionProperty = "height, width";
    outline.style.willChange = outline.style.transitionProperty;
    outline.style.touchAction = "none";
    outline.style.userSelect = "none";
    outline.style.zIndex = Constants.Z_INDEX;
    if (!outline.id) {
      outline.id = Constants.OUTLINE_ID;
      document.body.appendChild(outline);
    }
    return outline;
  };

  const mousePosition = {
    x: NaN,
    y: NaN,
  };

  const cursor = getCustomCursor();

  const updateCursorPosition = () => {
    cursor.style.left = `${mousePosition.x}px`;
    cursor.style.top = `${mousePosition.y}px`;
  };

  const outline = getCustomOutline();

  const updateOutlinePosition = () => {
    const target = getElementByCursor();

    if (!target || target.childElementCount > 1) {
      outline.style.zIndex = Constants.Z_INDEX;
      outline.style.left = `calc(${mousePosition.x}px - ${Constants.SPACE}/2)`;
      outline.style.top = `calc(${mousePosition.y}px - ${Constants.SPACE}/2)`;
      outline.style.width = Constants.SPACE;
      outline.style.height = Constants.SPACE;
      outline.style.borderRadius = Constants.SPACE;
      return;
    }

    const getZIndex = (node: Node | null) => {
      if (node != null && node instanceof HTMLElement) {
        const zIndex = window.getComputedStyle(node).zIndex;
        if (zIndex !== "auto") {
          return Number(zIndex);
        }
        return getZIndex(node.parentNode);
      }
      return 0;
    };

    outline.style.zIndex = (getZIndex(target) + 1).toString();
    // if target is a single element node
    const rect = target.getBoundingClientRect();
    outline.style.left = `calc(${rect.left}px  - ${Constants.SPACE}/2)`;
    outline.style.top = `calc(${rect.top}px  - ${Constants.SPACE}/2)`;
    outline.style.width = `calc(${rect.width}px + ${Constants.SPACE})`;
    outline.style.height = `calc(${rect.height}px + ${Constants.SPACE})`;
    outline.style.borderRadius = Constants.SIZE;
  };

  /**
   * Find the uppermost node that satisfies the predicate without recursion
   */
  function findLastNodeWithPredicate(
    node: Node | null,
    predicate: (node: Node) => boolean,
  ) {
    let currentNode = node;
    while (currentNode?.parentNode && predicate(currentNode.parentNode)) {
      currentNode = currentNode.parentNode;
    }
    return currentNode;
  }

  const getElementByCursor = () => {
    if (
      Number.isNaN(mousePosition.x) ||
      Number.isNaN(mousePosition.y) ||
      mousePosition.x == null ||
      mousePosition.y == null
    ) {
      return;
    }

    const element =
      document.elementFromPoint(mousePosition.x, mousePosition.y) ||
      document.querySelector(":hover") ||
      document.activeElement;

    if (!element) {
      return;
    }

    // if element is a text node, get the parent element
    const topMatchingNode = findLastNodeWithPredicate(element, (node) => {
      return node.textContent?.trim() === element.textContent?.trim();
    }) as HTMLElement;

    return topMatchingNode;
  };

  // keep track of mouse position
  const onEvent = (event: MouseEvent | Touch) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
    updateCursorPosition();
    updateOutlinePosition();
  };
  window.addEventListener("mousemove", onEvent);
  window.addEventListener("touchstart", (event) => onEvent(event.touches[0]));

  doEvery({
    condition: () => {
      const hasFancyCursor = !!document.getElementById(Constants.CURSOR_ID);
      return hasFancyCursor;
    },
    callback: () => {
      // ensure cursor is set to none
      document.body.style.cursor = "none";
      document.documentElement.style.cursor = "none";
      document.querySelectorAll("*").forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.cursor = "none";
        }
      });
    },
  });
})();
