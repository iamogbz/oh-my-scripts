import { inline } from "libraries/dom-inline";
import { ExtendFilePreview, filePreviewNS } from "libraries/github-file";
import { fileDirname } from "libraries/paths";

class ExtendFilePreviewHTML extends ExtendFilePreview {
  constructor() {
    super();
    this.id = filePreviewNS`extend-html`;
    this.fileTypes = new Set(["html", "xhtml"]);
    this.featureClass = filePreviewNS`extend-html`;
  }

  prepareHTML(fileContent: string, filePath: string) {
    return inline({
      base: fileDirname(this.pathToBlob(filePath)),
      folder: fileDirname(filePath),
      html: fileContent.replace(/<a/g, `<a target="_blank"`),
      load: this.getFileContent.bind(this),
    });
  }
}

(function () {
  "use strict";
  new ExtendFilePreviewHTML().setup();
})();
