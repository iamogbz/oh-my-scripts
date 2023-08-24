import { HeadersProps } from "webpack-userscript";
import { inline } from "../../libraries/dom-inline";
import { ExtendFilePreview, filePreviewNS } from "../../libraries/github-file";
import { fileDirname } from "../../libraries/paths";

export const header: HeadersProps = {
  description: "Render HTML files in github",
  grant: ["GM_xmlhttpRequest"],
  include: ["*://github.com/*"],
  name: "GitHub File Preview HTML",
};

class ExtendFilePreviewHTML extends ExtendFilePreview {
  constructor() {
    const id = filePreviewNS`extend-html`;
    super(id, id, new Set(["html", "xhtml"]));
  }

  prepareHTML(fileContent: string, filePath: string) {
    return inline({
      base: fileDirname(this.pathToBlob(filePath)),
      folder: fileDirname(filePath),
      html: fileContent.replace(/<a/g, `<a target="_blank"`),
      load: this.getFileContent.bind(this),
    });
  }

  getScrollHeight(frameElem: HTMLIFrameElement) {
    if (!frameElem.contentWindow) return 0;
    return frameElem.contentWindow.document.body.scrollHeight + 1;
  }
}

(function () {
  "use strict";
  new ExtendFilePreviewHTML().setup();
})();
