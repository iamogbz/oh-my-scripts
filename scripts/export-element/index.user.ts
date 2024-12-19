import { html2canvas } from "libraries/html2canvas";
import { doc } from "prettier";

(function () {
  "use strict";

  const Types = Object.freeze({
    PDF: "pdf",
    PNG: "png",
  });

  type ExportType = (typeof Types)[keyof typeof Types];

  const params: {
    matchWords: string[];
    eventTarget: EventTarget | null;
    target: Node | null;
    type: ExportType;
  } = {
    matchWords: [],
    eventTarget: null,
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

  /** Replace all continous newlines and whitespace in text with a single space */
  function sanitizeText(text: string) {
    return text?.replace(/\s+/g, " ").trim() ?? "";
  }

  /** Checks that text contains all words */
  function containsAll(text: string, words: string[]) {
    return words.every((word) => text.includes(word));
  }

  // Add context menu to user script
  document.addEventListener("contextmenu", function (event) {
    params.eventTarget = event.target;

    const selectedText =
      window.getSelection?.()?.toString() ??
      document.getSelection?.()?.toString() ??
      Object.getOwnPropertyDescriptor(
        document,
        "selection",
      )?.value?.createRange?.()?.text ??
      "";
    const matchText = sanitizeText(selectedText);
    params.matchWords = matchText.split(" ");

    params.target = findLastNodeWithPredicate(event.target as Node, (node) => {
      const nodeText = sanitizeText((node as HTMLElement).innerText);
      return containsAll(nodeText, params.matchWords);
    });
  });

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
        return false;
      }

      // Parse rgba values
      const rgbaMatch = backgroundColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
      );

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

  function cloneNodeWithStyles(window: Window, node: Node) {
    // Function to copy computed styles from one element to another
    function copyComputedStyles(source: Node, target: Node) {
      const computedStyle = window.getComputedStyle(source as Element);
      for (const style of computedStyle) {
        (target as HTMLElement).style.setProperty(
          style,
          computedStyle.getPropertyValue(style),
        );
      }
    }

    // Clone the node deeply
    const clone = node.cloneNode(true) as HTMLElement;

    // Copy styles from the original node to the cloned node
    copyComputedStyles(node, clone);

    // Recursively copy styles for all child nodes
    function copyStylesRecursively(sourceNode: Node, targetNode: Node) {
      const sourceEl = sourceNode as HTMLElement;
      for (let i = 0; i < sourceEl.children.length; i++) {
        const targetEl = targetNode as Element;
        copyComputedStyles(sourceEl.children[i], targetEl.children[i]);
        copyStylesRecursively(sourceEl.children[i], targetEl.children[i]);
      }
    }

    copyStylesRecursively(node, clone);

    return clone;
  }

  /**
   * Clone node into new window and print
   */
  function cloneAndPrintNode(node: Node) {
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

    const clone = cloneNodeWithStyles(window, node);
    if (clone.tagName.toLowerCase() === "body") {
      newDocument.body.outerHTML = clone.outerHTML;
    } else {
      newDocument.body.appendChild(clone);
    }
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

  async function cloneAndDownloadImage(node: Node) {
    const clone = cloneNodeWithStyles(window, node);

    // place the clone in a hidden div to enable html2canvas to render it
    const placeholderDiv = document.createElement("div");
    placeholderDiv.style.visibility = "hidden";
    placeholderDiv.appendChild(clone);
    document.body.appendChild(placeholderDiv);

    // https://stackoverflow.com/questions/3906142/how-to-save-a-png-from-javascript-variable
    const canvas = await html2canvas(clone);
    const dataURI = canvas.toDataURL("image/png");
    const filename = `${["screenshot", ...params.matchWords.slice(0, 10)]
      .join("-")
      .toLowerCase()
      .replace(/[/\\?%*:|"<>]+/g, "_")}.png`;
    const download = document.createElement("a");
    download.href = dataURI;
    download.download = filename;
    download.click();
    document.body.removeChild(placeholderDiv);
  }

  /**
   * Print the context node as specified type
   */
  function printNodeAs(type: ExportType) {
    if (params.target) {
      switch (type) {
        case Types.PDF: {
          return cloneAndPrintNode(params.target);
        }
        case Types.PNG: {
          return cloneAndDownloadImage(params.target);
        }
        default: {
          return alert(`Unsupported type: ${type}`);
        }
      }
    } else {
      console.error("Node not found!", params.eventTarget);
    }
  }

  // Add context menu item
  Object.values(Types).forEach((type) => {
    window.GM_registerMenuCommand(
      `As ${type.toUpperCase()}`,
      () => void printNodeAs(type),
      `as-${type.toLowerCase()}`,
    );
  });
})();
