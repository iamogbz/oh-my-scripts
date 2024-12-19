(function () {
  "use strict";

  const Types = Object.freeze({
    PDF: "pdf",
    // PNG: "png", // TODO: add png support
  });

  const params: {
    target: Node | null;
    type: (typeof Types)[keyof typeof Types];
  } = {
    target: null,
    type: Types.PDF,
  };

  /**
   * Find the uppermost node that satisfies the predicate
   */
  function findLastNodeWithPredicate(
    node: Node | null,
    predicate: (node: Node) => boolean,
  ) {
    while (node) {
      if (predicate(node)) return node;
      node = node.parentNode;
    }
    return null;
  }

  /**
   * Find the uppermost node that does not have a next sibling
   */
  function findLastNodeInTree(node: Node | null) {
    return findLastNodeWithPredicate(node, (node: Node) => !node.nextSibling);
  }

  function findBackgroundColor(element: Element) {
    const transparentColor = "transparent";
    const backgroundElement = findLastNodeWithPredicate(element, (node) => {
      // return true if the node is an element with a background-color that is not transparent
      if (!(node instanceof Element)) {
        return false;
      }
      const computedStyle = window.getComputedStyle(node as Element);
      const backgroundColor = computedStyle.backgroundColor; // Get the background-color

      if (!backgroundColor) {
        return false; // Handle case where background-color is invalid
      }

      // If it's the transparent keyword: simple case
      if (backgroundColor === transparentColor) {
        console.log("background transparent");
        return false;
      }

      // Parse rgba values
      const rgbaMatch = backgroundColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
      );

      console.log("rgba", backgroundColor);
      if (rgbaMatch) {
        // If rgba, check the alpha channel.
        const alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1; // Default alpha is 1
        return alpha !== 0;
      }

      // For other cases (e.g., named colors), assume it's not transparent
      return true;
    });

    if (backgroundElement) {
      const computedStyle = window.getComputedStyle(
        backgroundElement as Element,
      );
      return computedStyle.getPropertyValue("background-color");
    }
    return transparentColor;
  }

  // Add context menu to user script
  document.addEventListener("contextmenu", function (event) {
    params.target = findLastNodeInTree(event.target as Node);
  });

  /**
   * Clone node into new window and print
   */
  function cloneAndPrintNode(node: Node) {
    const clone = node.cloneNode(true);

    // Create a new window
    const newWindow: Window | null = window.open(
      "",
      "",
      "width=800,height=600",
    );
    if (!newWindow) {
      alert("Please allow popups for this site and try again.");
      return;
    }
    const newDocument = newWindow.document;

    // Copy all CSS stylesheets
    Array.from(document.styleSheets).forEach((styleSheet) => {
      if (styleSheet.href) {
        const link = newDocument.createElement("link");
        link.rel = "stylesheet";
        link.href = styleSheet.href;
        newDocument.head.appendChild(link);
      } else if (styleSheet.cssRules) {
        const style = newDocument.createElement("style");
        Array.from(styleSheet.cssRules).forEach((rule) => {
          style.appendChild(newDocument.createTextNode(rule.cssText));
        });
        newDocument.head.appendChild(style);
      }
    });

    // Append the cloned node to the new document
    newDocument.body.appendChild(clone);
    newDocument.body.style.backgroundColor = findBackgroundColor(
      node as Element,
    );

    // Trigger the print action
    newWindow.setTimeout(() => newWindow.print(), 1000);
    newWindow.addEventListener("afterprint", function () {
      if (this.confirm("Close window after successful print?")) {
        newWindow.close();
      }
    });
  }

  /**
   * Print the context node as specified type
   */
  function printNodeAs(type: (typeof params)["type"]) {
    if (params.target) {
      switch (type) {
        case Types.PDF: {
          return cloneAndPrintNode(params.target);
        }
        default: {
          alert(`Unsupported type: ${type}`);
        }
      }
    } else {
      alert("Node not found!");
    }
  }

  // Add context menu item
  Object.values(Types).forEach((type) => {
    window.GM_registerMenuCommand(
      `As ${type.toUpperCase()}`,
      () => printNodeAs(type),
      `as-${type.toLowerCase()}`,
    );
  });
})();
