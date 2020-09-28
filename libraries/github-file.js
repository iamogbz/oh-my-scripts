function filePreviewNS(str) {
  return `iamogbz-gh-file-preview-${str}`;
}

class ExtendFilePreview {
  constructor() {
    this.id = null;
    this.featureClass = null;
    this.fileTypes = new Set();
    this.toggleActionSource = "source";
    this.toggleActionRender = "render";
    this.frameStyle = {
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
  }

  setup() {
    onAjaxedPagesRaw(() => {
      if (!(isCommit() || isPRFiles() || isSingleFile())) return;
      this.initFeature();
    });
  }

  prepareHTML(fileContent, filePath) {
    throw new Error("Unimplemented method 'prepareHTML'");
  }

  pathToBlob(filePath) {
    return `https://raw.githubusercontent.com/${getUserRepo()}/${filePath}`;
  }

  getFileContent(filePath) {
    return this.safeFetch(
      isAbsolutePath(filePath) ? filePath : this.pathToBlob(filePath)
    )
      .then((r) => r.text())
      .catch((e) => {
        console.info(e);
        if (isAbsolutePath(filePath)) return null;
        const [ref, ...rest] = filePath.split("/");
        return githubApi
          .v3(`${this.pathToApi(rest.join("/"))}?ref=${ref}`)
          .then((r) => atob(r.content))
          .catch((e) => {
            console.error(e);
            return null;
          });
      });
  }

  safeFetch(input, init) {
    return request(input, init).then((r) => {
      if (r.status !== 200) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
      return r;
    });
  }

  isSupportedFile(filePath) {
    return this.fileTypes.has(getFileType(filePath));
  }

  pathToApi(filePath) {
    return `repos/${getUserRepo()}/contents/${filePath}`;
  }

  selectButton(element) {
    const selectedButton = selectDOM(
      `.BtnGroup.${this.featureClass} .BtnGroup-item.selected`
    );
    if (selectedButton) selectedButton.classList.remove("selected");
    element.classList.add("selected");
    element.blur();
  }

  showSource(frameElem) {
    return (event) => {
      const button = event.currentTarget;
      if (button.disabled || !frameElem) return;
      frameElem.style.display = "none";
      const frameParent = frameElem.parentElement;
      frameParent.style.removeProperty("overflow");
      frameParent.style.removeProperty("height");
      frameParent.style.removeProperty("max-height");
      return this.selectButton(button);
    };
  }

  showRendered(frameElem) {
    return (event) => {
      const button = event.currentTarget;
      if (button.disabled || !frameElem) return;
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

  updateToggle(button, frameElem) {
    button.disabled = frameElem === null;
    if (button.dataset.toggleAction === this.toggleActionRender) {
      button.onclick = this.showRendered(frameElem);
    }
    if (button.dataset.toggleAction === this.toggleActionSource) {
      button.onclick = this.showSource(frameElem);
    }
    button.setAttribute(
      "aria-label",
      button.disabled
        ? button.dataset.labelDisabled
        : button.dataset.labelEnabled
    );
  }

  viewerButtonToggleGroup({ frameElem, isFileList }) {
    const disabled = frameElem ? false : true;
    const disabledTooltip = "HTML render toggle disabled";
    const svgTagNS = getTagNS("svg");
    const sourceButton = createElement({
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

    const renderButton = createElement({
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

  frameElement(props) {
    return createElement({
      attributes: Object.assign(
        {
          class: this.featureClass,
          style: createElementStyle(this.frameStyle),
        },
        props
      ),
      tagName: "iframe",
    });
  }

  addButtonsToFileHeaderActions(actionsElem, frameElem) {
    const target = `.BtnGroup.${this.featureClass}`;
    if (selectExists(target, actionsElem)) {
      selectDOM(target, actionsElem).childNodes.forEach((elem) => {
        this.updateToggle(elem, frameElem);
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

  addFrameToFileBody(bodyElem, filePath, canDefer) {
    if (canDefer && !selectExists(".js-blob-wrapper", bodyElem)) {
      return null;
    }
    if (selectExists(`iframe.${this.featureClass}`, bodyElem)) {
      return selectDOM(`iframe.${this.featureClass}`, bodyElem);
    }
    return this.getFileContent(filePath)
      .then((html) => this.prepareHTML(html, filePath))
      .then((frameHtml) => {
        const frameElem = this.frameElement({
          src: `https://htmlpreview.github.io/?${this.pathToBlob(filePath)}`,
          srcDoc: frameHtml,
        });
        bodyElem.style.position = "relative";
        return bodyElem.appendChild(frameElem);
      });
  }

  extendHtmlFileDetailsElements(commitSha) {
    return () =>
      Promise.all(
        selectAll(".file.Details").map((elem) => {
          const fileHeaderElem = selectOrThrow(".file-header", elem);
          if (!fileHeaderElem.dataset.path) return;
          const filePath = `${commitSha}/${fileHeaderElem.dataset.path}`;
          if (!this.isSupportedFile(filePath)) return;
          return this.addFrameToFileBody(
            selectOrThrow(".js-file-content", elem),
            filePath,
            true
          )
            .then((frameElem) =>
              this.addButtonsToFileHeaderActions(
                selectOrThrow(
                  ".file-actions>.flex-items-stretch",
                  fileHeaderElem
                ),
                frameElem
              )
            )
            .catch((e) => console.error(e));
        })
      );
  }

  initCommit() {
    observeEl("#files", this.extendHtmlFileDetailsElements(getCommitSha()), {
      childList: true,
      subtree: true,
    });
  }

  initPRFiles() {
    const commitSha = selectDOM(".js-reviews-container #head_sha").value;
    observeEl("#files", this.extendHtmlFileDetailsElements(commitSha), {
      childList: true,
      subtree: true,
    });
  }

  initSingleFile() {
    const fileHeaderElem = selectOrThrow(".Box.mt-3>.Box-header.py-2");
    const filePath = getRepoPath().replace("blob/", "");
    if (!this.isSupportedFile(filePath)) return;
    return this.addFrameToFileBody(
      selectOrThrow(".Box.mt-3>.Box-body.blob-wrapper"),
      filePath,
      false
    ).then((frameElem) => {
      this.addButtonsToFileHeaderActions(
        selectOrThrow(".d-flex", fileHeaderElem),
        frameElem
      );
    });
  }

  initFeature() {
    return Promise.all([
      isPRFiles() && this.initPRFiles(),
      isSingleFile() && this.initSingleFile(),
      isCommit() && this.initCommit(),
    ]).then((enabled) => enabled.some(Boolean));
  }
}

// ==Inline HTML==
function noPrefix(p) {
  return isAbsolutePath(p) || p.startsWith("/");
}
function insertInto($, selector, tagName, content = "", attributes = {}) {
  const elem = document.createElement(tagName);
  for (const [name, value] of Object.entries(attributes)) {
    elem.setAttribute(name, value);
  }
  elem.innerHTML = content;
  $(selector).append(elem.outerHTML);
}

function inline({
  base,
  html,
  folder = "",
  load = (path) => Promise.resolve(""),
}) {
  const $ = cheerio.load(html);
  const retrieve = (target) => {
    const noPre = noPrefix(target);
    return load(noPre ? target : normalisePath(`${folder}/${target}`));
  };

  const resources = {
    css: {
      callback: (v) => {
        if (!v.attribs.href) return;
        return retrieve(v.attribs.href).then((content) => {
          insertInto($, "head", "style", content, { type: "text/css" });
        });
      },
      cleanup: true,
      selector: `link[rel="stylesheet"]`,
      tasks: [],
    },
    img: {
      callback: (v) => {
        const target = v.attribs.src;
        if (!target) return;
        const newSrc = noPrefix(target) ? target : `${base}/${target}`;
        $(v).attr("src", newSrc);
      },
      selector: `img`,
      tasks: [],
    },
    /*
     * This just removes the javascript tags without replacements
     */
    js: {
      callback: (v) => Promise.resolve(),
      cleanup: true,
      selector: `script[src*=".js"]`,
      tasks: [],
    },
  };

  const tasks = [];
  for (const [, r] of Object.entries(resources)) {
    if (!r.selector) continue;
    const c = $(r.selector);
    c.each((_, v) => r.tasks.push(r.callback(v)));
    tasks.push(Promise.all(r.tasks).then(() => r.cleanup && c.remove()));
  }

  return Promise.all(tasks).then(() => $.html());
}
