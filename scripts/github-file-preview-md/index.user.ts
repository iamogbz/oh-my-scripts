import hljs from "highlight.js/lib/core";
import markdown from "highlight.js/lib/languages/markdown";

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
}

(function () {
  "use strict";
  hljs.registerLanguage("md", markdown);
  new ExtendFilePreviewMD().setup();
})();
