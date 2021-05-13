import {
  createElement,
  createElementStyle,
  getTagNS,
  observeEl,
  selectAll,
  selectDOM,
  selectExists,
  selectOrThrow,
} from "./dom";
import {
  getCommitSha,
  getRepoPath,
  getUserRepo,
  githubApi,
  isCommit,
  isPRFiles,
  isSingleFile,
  onAjaxedPagesRaw,
} from "./github";
import { getFileType, isAbsolutePath } from "./paths";
import { request } from "./request";

export function filePreviewNS(str: string | TemplateStringsArray) {
  return `iamogbz-gh-file-preview-${str}`;
}

export abstract class ExtendFilePreview {
  public id!: string;
  public featureClass!: string;
  public fileTypes!: Set<string>;
  public frameTagName = "iframe";
  public toggleActionSource = "source";
  public toggleActionRender = "render";
  public frameStyle: Record<string, number | string> = {
    background: "white",
    border: "none",
    display: "block",
    height: "100%",
    left: 0,
    padding: 0,
    position: "absolute",
    top: 0,
    width: "100%",
    visibility: "hidden",
  };

  initCondition() {
    return isCommit() || isPRFiles() || isSingleFile();
  }

  setup() {
    onAjaxedPagesRaw(() => {
      if (!this.initCondition()) return;
      this.initFeature();
    });
  }

  abstract prepareHTML(
    fileContent?: string,
    filePath?: string
  ): Promise<string | undefined>;

  pathToFile(filePath: string) {
    return `${getUserRepo()}/${filePath}`;
  }

  pathToBlob(filePath: string) {
    return `https://raw.githubusercontent.com/${this.pathToFile(filePath)}`;
  }

  getFileContent(filePath: string) {
    return this.safeFetch(
      isAbsolutePath(filePath) ? filePath : this.pathToBlob(filePath)
    )
      .then((r) => r.text?.())
      .catch((e) => {
        console.info(e);
        if (isAbsolutePath(filePath)) return undefined;
        const [ref, ...rest] = filePath.split("/");
        return githubApi
          .v3(`${this.pathToApi(rest.join("/"))}?ref=${ref}`)
          .then((r) => atob(r.content))
          .catch((e) => {
            console.error(e);
            return undefined;
          });
      });
  }

  safeFetch(input: RequestInfo, init?: RequestInit) {
    return request(input, init).then((r) => {
      if (r.status !== 200) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
      return r;
    });
  }

  isSupportedFile(filePath: string) {
    return this.fileTypes.has(getFileType(filePath));
  }

  pathToApi(filePath: string) {
    return `repos/${getUserRepo()}/contents/${filePath}`;
  }

  selectButton(element: HTMLElement) {
    const selectedButton = selectDOM(
      `.BtnGroup.${this.featureClass} .BtnGroup-item.selected`
    );
    if (selectedButton) selectedButton.classList.remove("selected");
    element.classList.add("selected");
    element.blur();
  }

  showSource(frameElem: HTMLIFrameElement) {
    return (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      if (button.disabled || !frameElem) return;
      frameElem.style.visibility = "hidden";
      const frameParent = frameElem.parentElement;
      frameParent?.style.removeProperty("overflow");
      frameParent?.style.removeProperty("height");
      frameParent?.style.removeProperty("max-height");
      return this.selectButton(button);
    };
  }

  showRendered(frameElem: HTMLIFrameElement) {
    return (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const frameParent = this.getContainerElement(frameElem);
      const scrollHeight = this.getScrollHeight(frameElem);
      if (!frameParent || !scrollHeight || button.disabled) return;
      frameElem.style.visibility = "visible";
      frameParent.style.overflow = "hidden";
      const height = `${scrollHeight}px`;
      frameParent.style.height = height;
      frameParent.style.maxHeight = height;
      frameParent.scrollLeft = 0;
      return this.selectButton(button);
    };
  }

  getContainerElement(frameElem: HTMLIFrameElement) {
    return frameElem.parentElement;
  }

  getScrollHeight(frameElem: HTMLIFrameElement) {
    if (!frameElem.contentWindow) return 0;
    return frameElem.contentWindow.document.body.scrollHeight + 32;
  }

  updateToggle(button: HTMLButtonElement, frameElem: HTMLIFrameElement) {
    button.disabled = !frameElem;
    if (button.dataset.toggleAction === this.toggleActionRender) {
      button.onclick = this.showRendered(frameElem);
    }
    if (button.dataset.toggleAction === this.toggleActionSource) {
      button.onclick = this.showSource(frameElem);
    }
    button.setAttribute(
      "aria-label",
      (button.disabled
        ? button.dataset.labelDisabled
        : button.dataset.labelEnabled) ?? ""
    );
  }

  viewerButtonToggleGroup({
    frameElem,
    isFileList,
  }: {
    frameElem: HTMLIFrameElement;
    isFileList: boolean;
  }) {
    const disabled = frameElem ? false : true;
    const disabledTooltip = "HTML render toggle disabled";
    const svgTagNS = getTagNS("svg");
    const sourceButton = createElement<HTMLButtonElement>({
      attributes: {
        "aria-current": "true",
        class: `btn btn-sm BtnGroup-item tooltipped tooltipped-${
          isFileList ? "w" : "n"
        } source ${isFileList ? "js-source" : ""} ${
          isFileList ? "" : "selected"
        }`,
        "data-disable-with": "",
        "data-label-disabled": disabledTooltip,
        "data-label-enabled": `Display the source ${
          isFileList ? "diff" : "blob"
        }`,
        "data-toggle-action": this.toggleActionSource,
        disabled,
      },
      children: [
        {
          attributes: {
            "aria-hidden": "true",
            class: "octicon octicon-code",
            height: 16,
            version: "1.1",
            viewBox: "0 0 16 16",
            width: 16,
          },
          children: [
            {
              attributes: {
                d: "M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z",
                "fill-rule": "evenodd",
              },
              tagName: "path",
              tagNS: svgTagNS,
            },
          ],
          tagName: "svg",
          tagNS: svgTagNS,
        },
      ],
      events: {
        click: this.showSource(frameElem),
      },
      tagName: "button",
    });

    const renderButton = createElement<HTMLButtonElement>({
      attributes: {
        class: `btn btn-sm BtnGroup-item tooltipped tooltipped-${
          isFileList ? "w" : "n"
        } rendered ${isFileList ? "js-rendered" : ""}`,
        disabled: disabled,
        "data-disable-with": "",
        "data-label-disabled": disabledTooltip,
        "data-label-enabled": `Display the ${
          isFileList ? "rich diff" : "rendered blob"
        }`,
        "data-toggle-action": this.toggleActionRender,
      },
      children: [
        {
          attributes: {
            "aria-hidden": "true",
            class: "octicon octicon-file",
            height: 16,
            version: "1.1",
            viewBox: "0 0 16 16",
            width: 16,
          },
          children: [
            {
              attributes: {
                d: `M3.75 1.5a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V6H9.75A1.75 1.75 0 018 4.25V1.5H3.75zm5.75.56v2.19c0 .138.112.25.25.25h2.19L9.5 2.06zM2 1.75C2 .784 2.784 0 3.75 0h5.086c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237v8.086A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25V1.75z`,
                "fill-rule": "evenodd",
              },
              tagName: "path",
              tagNS: svgTagNS,
            },
          ],
          tagName: "svg",
          tagNS: svgTagNS,
        },
      ],
      events: {
        click: this.showRendered(frameElem),
      },
      tagName: "button",
    });
    this.updateToggle(sourceButton, frameElem);
    this.updateToggle(renderButton, frameElem);
    return createElement({
      attributes: { class: `BtnGroup ${this.featureClass}` },
      children: [sourceButton, renderButton],
      tagName: "span",
    });
  }

  frameElement(attrs: Record<string, string | undefined>) {
    return createElement<HTMLIFrameElement>({
      attributes: {
        class: this.featureClass,
        style: createElementStyle(this.frameStyle),
        ...attrs,
      },
      tagName: this.frameTagName,
    });
  }

  addButtonsToFileHeaderActions(
    actionsElem: HTMLElement,
    frameElem: HTMLIFrameElement
  ) {
    const target = `.BtnGroup.${this.featureClass}`;
    if (selectExists(target, actionsElem)) {
      selectDOM(target, actionsElem)?.childNodes.forEach((elem) => {
        this.updateToggle(elem as HTMLButtonElement, frameElem);
      });
      return;
    }
    actionsElem.insertBefore(
      this.viewerButtonToggleGroup({
        frameElem,
        isFileList: isPRFiles() || isCommit(),
      }),
      actionsElem.firstChild
    );
  }

  async addFrameToFileBody(
    bodyElem: HTMLBodyElement,
    filePath: string,
    canDefer: boolean
  ) {
    if (canDefer && !selectExists(".js-blob-wrapper", bodyElem)) {
      return undefined;
    }
    const frameSelector = `${this.frameTagName}.${this.featureClass}`;
    if (selectExists(frameSelector, bodyElem)) {
      return selectDOM<HTMLIFrameElement>(frameSelector, bodyElem);
    }
    const frameElem = this.frameElement({
      src: `https://rawgit.com/${this.pathToFile(filePath)}`,
      srcDoc: await this.prepareHTML(
        await this.getFileContent(filePath),
        filePath
      ),
    });
    bodyElem.style.position = "relative";
    return bodyElem.appendChild(frameElem);
  }

  extendHtmlFileDetailsElements(commitSha: string) {
    return () =>
      Promise.all(
        selectAll(".file.Details").map(async (elem) => {
          const fileHeaderElem = selectOrThrow<HTMLElement>(
            ".file-header",
            elem
          );
          if (!fileHeaderElem.dataset.path) return;
          const filePath = `${commitSha}/${fileHeaderElem.dataset.path}`;
          if (!this.isSupportedFile(filePath)) return;
          try {
            const frameElem = await this.addFrameToFileBody(
              selectOrThrow(".js-file-content", elem),
              filePath,
              true
            );
            if (!frameElem) return;
            this.addButtonsToFileHeaderActions(
              selectOrThrow(
                ".file-actions>.flex-items-stretch",
                fileHeaderElem
              ),
              frameElem
            );
          } catch (e) {
            console.error(e);
          }
        })
      );
  }

  initDiff(commitSha?: string) {
    if (!commitSha) return;
    observeEl("#files", this.extendHtmlFileDetailsElements(commitSha), {
      childList: true,
      subtree: true,
    });
  }

  initCommit() {
    this.initDiff(getCommitSha());
  }

  initPRFiles() {
    this.initDiff(
      selectDOM<HTMLInputElement>(".js-reviews-container #head_sha")?.value
    );
  }

  async initSingleFile() {
    const fileHeaderElem = selectOrThrow(".Box.mt-3>.Box-header.py-2");
    const filePath = getRepoPath().replace("blob/", "");
    if (!this.isSupportedFile(filePath)) return;
    const frameElem = await this.addFrameToFileBody(
      selectOrThrow(".Box.mt-3>.Box-body"),
      filePath,
      false
    );
    if (!frameElem) return;
    this.addButtonsToFileHeaderActions(
      selectOrThrow(".d-flex", fileHeaderElem),
      frameElem
    );
  }

  initFeature() {
    return Promise.all([
      isPRFiles() && this.initPRFiles(),
      isSingleFile() && this.initSingleFile(),
      isCommit() && this.initCommit(),
    ]).then((enabled) => enabled.some(Boolean));
  }
}
