import { html2canvas } from "../../libraries/html2canvas";

(function () {
  "use strict";

  const transparentColor = "transparent";

  const Types = Object.freeze({
    PDF: "pdf",
    PNG: "png",
  });

  type ExportType = (typeof Types)[keyof typeof Types];

  const params: {
    matchWords: string[];
    eventTarget: EventTarget | null;
    target: Node | null;
  } = {
    matchWords: [],
    eventTarget: null,
    target: null,
  };

  /**
   * Create keyboard event handler that triggers callback only on specific key
   * TODO: Handle multiple keys and combinations
   * TODO: options to prevent default event action and stop propagation
   */
  function onKey(params: { key: string; callback: () => void }) {
    return (event: KeyboardEvent) => {
      if (event.key === params.key) {
        params.callback();
      }
    };
  }

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
  function handleUpdateTarget(event: MouseEvent) {
    params.eventTarget = event.target;
    const selection = window.getSelection?.() ??
      document.getSelection?.() ?? {
        anchorNode: event.target as Node,
        focusNode: event.target as Node,
        toString() {
          return (
            // @ts-expect-error this is IE before version 9
            document.selection?.createRange?.()?.text ||
            this.anchorNode?.textContent ||
            this.focusNode?.textContent ||
            ""
          );
        },
      };

    const selectedText = selection.toString();
    const matchText = sanitizeText(selectedText);
    params.matchWords = matchText.split(" ");

    params.target = findLastNodeWithPredicate(
      selection.anchorNode ?? selection.focusNode,
      (node) => {
        const nodeText = sanitizeText(node.textContent || "");
        return containsAll(nodeText, params.matchWords);
      },
    );
  }
  document.addEventListener("contextmenu", handleUpdateTarget);
  document.addEventListener("mouseup", handleUpdateTarget);

  function findBackgroundColor(node: Node) {
    const backgroundElement = findLastNodeWithPredicate(node, (element) => {
      // return true if the node is an element with a background-color that is not transparent
      if (!(element instanceof Element)) {
        return false;
      }
      const computedStyle = window.getComputedStyle(element);
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

    if (backgroundElement instanceof Element) {
      const computedStyle = window.getComputedStyle(backgroundElement);
      return computedStyle.getPropertyValue("background-color");
    }
    return transparentColor;
  }

  function cloneNodeWithStyles(window: Window, node: Node) {
    // Function to copy computed styles from one element to another
    function copyComputedStyles(source: Node, target: Node) {
      if (!(source instanceof Element) || !(target instanceof Element)) return;
      const computedStyle = window.getComputedStyle(source);
      for (const style of computedStyle) {
        (target as HTMLElement).style.setProperty(
          style,
          computedStyle.getPropertyValue(style),
        );
      }
    }

    // Clone the node deeply
    const clone = node.cloneNode(true);

    // Copy styles from the original node to the cloned node
    copyComputedStyles(node, clone);

    // Recursively copy styles for all child nodes
    function copyStylesRecursively(sourceEl: Node, targetEl: Node) {
      if (!(sourceEl instanceof Element) || !(targetEl instanceof Element))
        return;
      for (let i = 0; i < sourceEl.children.length; i++) {
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
      const errorMessage =
        "Failed to open new window. Please allow popups for this site and try again.";
      const isInIframe = window.self !== window.top;
      if (isInIframe) {
        console.error(errorMessage);
        console.error("Falling back to exporting as image.");
        cloneAndDownloadImage(node);
      }
      alert(errorMessage);
      return;
    }
    const newDocument = newWindow.document;

    const clone = cloneNodeWithStyles(window, node);
    if (clone instanceof Element && clone.tagName.toLowerCase() === "body") {
      newDocument.body.outerHTML = clone.outerHTML;
    } else {
      newDocument.body.appendChild(clone);
    }
    newDocument.body.style.backgroundColor = findBackgroundColor(node);

    // Trigger the print action
    newWindow.setTimeout(() => newWindow.print(), 1000);
    newWindow.addEventListener("afterprint", function () {
      if (this.confirm("Close window after successful print?")) {
        newWindow.close();
      }
    });
  }

  /**
   * Clone node as image and trigger download
   */
  async function cloneAndDownloadImage(node: Node) {
    const clone = cloneNodeWithStyles(window, node);
    const backgroundColor = findBackgroundColor(node);
    const nodeSize = (
      findLastNodeWithPredicate(
        node,
        (element) => element instanceof Element,
      ) as Element
    )?.getBoundingClientRect() ?? {
      height: "fit-content",
      width: "fit-content",
    };

    const modalContent = document.createElement("a");
    modalContent.style.backgroundColor = backgroundColor;
    modalContent.style.cursor = "pointer";
    modalContent.style.display = "block";
    modalContent.style.height = nodeSize.height.toString();
    modalContent.style.padding = "min(1vh, 1vw)";
    modalContent.style.position = "relative";
    modalContent.style.textDecoration = "none";
    modalContent.style.top = "1vh";
    modalContent.style.userSelect = "none";
    modalContent.style.width = nodeSize.width.toString();

    const modalWrapper = document.createElement("div");
    modalWrapper.style.alignItems = "start";
    modalWrapper.style.backdropFilter = "blur(10px)";
    modalWrapper.style.backgroundColor = `color-mix(in srgb, ${backgroundColor}, ${transparentColor} 50%)`;
    modalWrapper.style.display = "flex";
    modalWrapper.style.height = "100vh";
    modalWrapper.style.justifyContent = "center";
    modalWrapper.style.left = "0";
    modalWrapper.style.opacity = "1";
    modalWrapper.style.overflow = "auto";
    modalWrapper.style.position = "fixed";
    modalWrapper.style.top = "0";
    modalWrapper.style.userSelect = "none";
    modalWrapper.style.width = "100vw";
    modalWrapper.style.visibility = "visible";
    modalWrapper.style.zIndex = `${Number.MIN_SAFE_INTEGER}`;

    // place the clone in a hidden div to enable html2canvas to render it
    modalContent.appendChild(clone);
    modalWrapper.appendChild(modalContent);
    document.body.appendChild(modalWrapper);

    // scale and position clone to fit the window
    const positionPreview = () => {
      const scale = {
        x: window.innerWidth / modalContent.clientWidth,
        y: window.innerHeight / modalContent.clientHeight,
      };
      modalContent.style.scale = `${Math.min(1, scale.x, scale.y)}`;
      modalContent.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      modalWrapper.style.zIndex = `${Number.MAX_SAFE_INTEGER}`;
    };

    // https://stackoverflow.com/questions/3906142/how-to-save-a-png-from-javascript-variable
    const canvas = await html2canvas(modalContent);
    positionPreview(); // wait for clone to be rendered before positioning it
    const imageType = "image/png";
    const dataBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : undefined), imageType);
    });
    const dataURI = URL.createObjectURL(dataBlob); // canvas.toDataURL(imageType);
    const filenameGlue = "-";
    const filename = `${["screenshot", ...params.matchWords.slice(0, 10)]
      .map((w) => w.trim())
      .filter(Boolean)
      .join(filenameGlue)
      .toLowerCase()
      .replace(/[/\\?%*:|"<>]+/g, filenameGlue)
      .replace(/[-]+/g, filenameGlue)}.${imageType.split("/")[1]}`;

    modalContent.target = "_blank";
    modalContent.href = dataURI;
    modalContent.download = filename;
    modalContent.title = `Download ${filename}`;

    // prevent modal from closing when clicking on the link
    modalContent.addEventListener("click", (e) => {
      e.stopPropagation();
      // TODO: check if download is permitted by browser
    });
    const closePreview = () => {
      modalWrapper.remove();
      URL.revokeObjectURL(dataURI); // free up memory
      document.removeEventListener("keydown", closePreviewOnEscape);
    };
    const closePreviewOnEscape = onKey({
      key: "Escape",
      callback: closePreview,
    });
    // close modal when clicking outside the link
    modalWrapper.addEventListener("click", closePreview);
    // close modal when pressing escape
    document.addEventListener("keydown", closePreviewOnEscape);
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
      console.error("Node not found!", params);
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
