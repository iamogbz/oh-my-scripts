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
  }

  async prepareHTML(fileContent: string) {
    const text = "```markdown\n" + fileContent + "```";
    return request("https://api.github.com/markdown", {
      method: "POST",
      data: JSON.stringify({ text }),
    })
      .then((r) => r.text?.())
      .then((renderedHtml) => {
        return renderedHtml
          ?.replace(/<a/g, `<a target="_blank"`)
          .replace(/href="#/g, `style="cursor:default" no-href="#`)
          .replace(".collapse-button{", ".collapse-button{display:none;")
          .replace(".collapse-content{max-height:0;", ".collapse-content{");
      });
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
