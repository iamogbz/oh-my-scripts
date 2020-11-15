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
  public toggleActionSource = "source";
  public toggleActionRender = "render";
  public frameStyle = {
    background: "white",
    border: "none",
    display: "none",
    height: "100%",
    left: 0,
    padding: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  };

  setup() {
    onAjaxedPagesRaw(() => {
      if (!(isCommit() || isPRFiles() || isSingleFile())) return;
      this.initFeature();
    });
  }

  abstract async prepareHTML(
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
      frameElem.style.display = "none";
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
      if (
        !frameElem.contentWindow ||
        !frameElem.parentElement ||
        button.disabled
      )
        return;
      frameElem.style.display = "block";
      const frameParent = frameElem.parentElement;
      frameParent.style.overflow = "hidden";
      const height = `${
        frameElem.contentWindow.document.body.scrollHeight + 32
      }px`;
      frameParent.style.height = height;
      frameParent.style.maxHeight = height;
      return this.selectButton(button);
    };
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
            viewBox: "0 0 14 16",
            width: 14,
          },
          children: [
            {
              attributes: {
                d:
                  "M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z",
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
            viewBox: "0 0 12 16",
            width: 12,
          },
          children: [
            {
              attributes: {
                d: `M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45
                1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z`,
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

  frameElement(props: Record<string, string | undefined>) {
    return createElement<HTMLIFrameElement>({
      attributes: {
        class: this.featureClass,
        style: createElementStyle(this.frameStyle),
        ...props,
      },
      tagName: "iframe",
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
    if (selectExists(`iframe.${this.featureClass}`, bodyElem)) {
      return selectDOM<HTMLIFrameElement>(
        `iframe.${this.featureClass}`,
        bodyElem
      );
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
