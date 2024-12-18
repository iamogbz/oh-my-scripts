(function () {
  "use strict";

  const Types = Object.freeze({
    PDF: "pdf",
    PNG: "png",
  });

  const params: {
    target: Node | null;
    type: (typeof Types)[keyof typeof Types];
  } = {
    target: null,
    type: Types.PDF,
  };

  /**
   * Find the uppermost node that does not have a next sibling
   */
  function findLastNodeInTree(node: Node | null) {
    while (node) {
      if (!node.nextSibling) {
        return node;
      }
      node = node.parentNode;
    }
    return null;
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
      alert("Please allow popups for this site");
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

    // Trigger the print action
    newWindow.setTimeout(() => newWindow.print(), 1000);
    newWindow.addEventListener("afterprint", function () {
      newWindow.close();
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
