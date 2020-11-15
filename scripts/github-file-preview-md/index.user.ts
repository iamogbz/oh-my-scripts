import { selectDOM } from "libraries/dom";
import { isSingleFile, onAjaxedPagesRaw } from "libraries/github";
import { ExtendFilePreview, filePreviewNS } from "libraries/github-file";
import { request } from "libraries/request";

class ExtendFilePreviewMD extends ExtendFilePreview {
  constructor() {
    super();
    this.id = filePreviewNS`extend-md`;
    this.fileTypes = new Set(["md"]);
    this.featureClass = filePreviewNS`extend-md`;
    this.frameTagName = "div";
    this.frameStyle.height = "auto";
    this.frameStyle.overflow = "scroll hidden";
  }

  async prepareHTML(fileContent: string) {
    const text = "```markdown\n" + fileContent.replace(/`/g, "\\`") + "```";
    return request("https://api.github.com/markdown", {
      method: "POST",
      data: JSON.stringify({ text }),
    })
      .then((r) => r.text?.())
      .then((renderedHtml) => {
        if (!renderedHtml) return "";
        const lineNumber = (n: number) =>
          `<span class="blob-num bg-gray-light js-line-number" style="display: inline-block; margin-right: 10px">${n}</span>`;
        return this.replaceText(
          renderedHtml.replace(/\\`/g, "`"),
          "<pre>",
          "</pre>",
          (text) =>
            text
              ?.split(/\r?\n/)
              .map((line, i) => `${lineNumber(i + 1)}${line}`)
              .join("\n")
        );
      });
  }

  replaceText(
    text: string,
    startTag: string,
    endTag: string,
    replaceFn: (content: string) => string
  ): string {
    const startIndex = text.indexOf(startTag);
    const endIndex = text.lastIndexOf(endTag);
    return (
      text.substring(0, startIndex) +
      startTag +
      replaceFn(text.substring(startIndex + startTag.length, endIndex)) +
      endTag +
      text.substring(endIndex + endTag.length)
    );
  }

  frameElement(attrs: Record<string, string | undefined>) {
    const frame = super.frameElement(attrs);
    frame.removeAttribute("srcdoc");
    frame.innerHTML = attrs.srcDoc!;
    return frame;
  }

  getScrollHeight(frameElem: HTMLIFrameElement) {
    return frameElem.scrollHeight;
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

  setup() {
    onAjaxedPagesRaw(() => {
      if (!isSingleFile()) return;
      this.initFeature();
    });
  }
}

(function () {
  "use strict";
  new ExtendFilePreviewMD().setup();
})();
