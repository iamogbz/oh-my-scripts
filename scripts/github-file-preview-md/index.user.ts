import { selectDOM } from "libraries/dom";
import { isSingleFile } from "libraries/github";
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
    this.frameStyle.overflow = "hidden";
  }

  async prepareHTML(fileContent: string) {
    const fencedCodeTag = "```";
    const fencedCodeTagPlaceholder = "FENCED-CODE-TAG-PLACEHOLDER";
    const unfencedContent = `${fencedCodeTag}markdown\n${fileContent.replace(
      new RegExp(fencedCodeTag, "g"),
      fencedCodeTagPlaceholder
    )}${fencedCodeTag}`;

    return request("https://api.github.com/markdown", {
      method: "POST",
      data: JSON.stringify({ text: unfencedContent }),
    })
      .then((r) => r.text?.())
      .then((renderedHtml) => {
        if (!renderedHtml) return "";
        const startTag = ["<pre>", '<div style="display: flex">'];
        const endTag = ["</pre>", "</div>"];
        return this.replaceText(
          renderedHtml
            .replace(new RegExp(fencedCodeTagPlaceholder, "g"), fencedCodeTag)
            .replace(startTag[0], startTag[1])
            .replace(endTag[0], endTag[1]),
          startTag[1],
          endTag[1],
          (prerenderedMd) => {
            const lines = prerenderedMd.split(/\r?\n/);
            const renderedLineNumbers = lines
              .map(
                (_, i) =>
                  `<span class="blob-num bg-gray-light js-line-number" style="margin-right: 10px; display: inline-block; height: 20px;">${
                    i + 1
                  }</span>`
              )
              .join("");
            const renderedLines = lines
              .map(
                (line) =>
                  `<pre style="display: block; height: 20px;">${line}</pre>`
              )
              .join("\n");
            return `
              <div style="display: flex; flex-direction: column">${renderedLineNumbers}</div>
              <div style="overflow: scroll hidden">${renderedLines}</div>
            `;
          }
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
    const showSource = super.showRendered(frameElem);
    return (e: Event) => {
      frameElem.parentElement?.classList.remove("p-5", "p-xl-6");
      return showSource(e);
    };
  }

  showRendered(frameElem: HTMLIFrameElement) {
    const showRendered = super.showSource(frameElem);
    return (e: Event) => {
      frameElem.parentElement?.classList.add("p-5", "p-xl-6");
      return showRendered(e);
    };
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

  initCondition() {
    return isSingleFile();
  }
}

(function () {
  "use strict";
  new ExtendFilePreviewMD().setup();
})();
