import * as hljs from "highlight.js/lib/core";
import * as markdown from "highlight.js/lib/languages/markdown";

import { selectDOM } from "libraries/dom";
import { ExtendFilePreview, filePreviewNS } from "libraries/github-file";

class ExtendFilePreviewMD extends ExtendFilePreview {
  constructor() {
    super();
    this.id = filePreviewNS`extend-md`;
    this.fileTypes = new Set(["md"]);
    this.featureClass = filePreviewNS`extend-md`;
  }

  async prepareHTML(fileContent: string) {
    return hljs.highlight("md", fileContent).value;
  }

  // swap source and rendered since github renders markdown by default
  showSource(frameElem: HTMLIFrameElement) {
    return super.showRendered(frameElem);
  }

  showRendered(frameElem: HTMLIFrameElement) {
    return super.showSource(frameElem);
  }

  addButtonsToFileHeaderActions(
    actionsElem: HTMLElement,
    frameElem: HTMLIFrameElement
  ) {
    super.addButtonsToFileHeaderActions(actionsElem, frameElem);
    selectDOM<HTMLButtonElement>(
      `.btn.BtnGroup-item[data-toggle-action="${this.toggleActionRender}"]`
    )?.click();
  }
}

(function () {
  "use strict";
  // @ts-expect-error highlight library type errors https://github.com/highlightjs/highlight.js/issues/2682
  hljs.registerLanguage("md", markdown);
  new ExtendFilePreviewMD().setup();
})();
