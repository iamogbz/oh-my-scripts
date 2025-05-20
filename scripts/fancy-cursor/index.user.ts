const Constants = {
  CURSOR_ID: "fancy-cursor",
  OUTLINE_ID: "fancy-outline",
  // used to ensure the backdrop is never fully transparent
  BACKDROP_ID: "fancy-backdrop",
  SIZE: "2px",
  SPACE: "10px",
  Z_INDEX: Number.MAX_SAFE_INTEGER.toString(),
};

(function () {
  "use strict";

  const setCursorStyle = (element: HTMLElement | undefined) => {
    element?.style.setProperty("cursor", "none", "important");
  };

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
    setCursorStyle(cursor);
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
    setCursorStyle(outline);
    return outline;
  };

  const mousePosition = {
    x: NaN,
    y: NaN,
  };

  const cursor = getCustomCursor();

  // TODO: this is a bit of a hack, but we need to ensure that the outline
  // is not displayed on over complicated element trees
  function allChildrenHaveAtMostSingleChildElement(node: Node) {
    if (!node) return true;
    const element = node as HTMLElement;
    if (element.childElementCount > 1) {
      return false;
    }
    if (element.childElementCount < 1) {
      return true;
    }
    return Array.from(element.children || []).every(
      allChildrenHaveAtMostSingleChildElement,
    );
  }

  const updateCursorPosition = () => {
    cursor.style.left = `${mousePosition.x}px`;
    cursor.style.top = `${mousePosition.y}px`;
  };

  const outline = getCustomOutline();
  const backdrop = outline.cloneNode() as HTMLElement;
  backdrop.id = Constants.BACKDROP_ID;
  document.body.appendChild(backdrop);

  const updateOutlinePosition = () => {
    const target = getElementByCursor();

    outline.style.zIndex = Constants.Z_INDEX;
    if (!target || !allChildrenHaveAtMostSingleChildElement(target)) {
      outline.style.left = `calc(${mousePosition.x}px - ${Constants.SPACE}/2)`;
      outline.style.top = `calc(${mousePosition.y}px - ${Constants.SPACE}/2)`;
      outline.style.width = Constants.SPACE;
      outline.style.height = Constants.SPACE;
      outline.style.borderRadius = Constants.SPACE;
    } else {
      const rect = target.getBoundingClientRect();
      outline.style.left = `calc(${rect.left}px - ${Constants.SPACE}/2)`;
      outline.style.top = `calc(${rect.top}px - ${Constants.SPACE}/2)`;
      outline.style.width = `calc(${rect.width}px + ${Constants.SPACE})`;
      outline.style.height = `calc(${rect.height}px + ${Constants.SPACE})`;
      outline.style.borderRadius = Constants.SIZE;
    }

    // update backdrop position
    backdrop.setAttribute("style", outline.getAttribute("style") ?? "");
    backdrop.style.mixBlendMode = "unset";
    backdrop.style.zIndex = (Number(Constants.Z_INDEX) * -1).toString();
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
      return (
        node.textContent?.trim() === element.textContent?.trim() &&
        allChildrenHaveAtMostSingleChildElement(node)
      );
    }) as HTMLElement;

    // ensure element pointer is none
    setCursorStyle(element as HTMLElement);
    setCursorStyle(topMatchingNode);

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

  setCursorStyle(document.documentElement);
  setCursorStyle(document.body);
})();
