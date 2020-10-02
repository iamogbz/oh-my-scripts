// ==UserScript==
// @name         GitHub File Preview HTML
// @namespace    https://github.com/iamogbz/oh-my-scripts
// @version      0.0.1
// @author       iamogbz
// @description  Render HTML files in github
// @icon         https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/assets/monkey_128.png
// @updateURL    https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/scripts/github-file-preview-html/index.user.js
// @downloadURL  https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/scripts/github-file-preview-html/index.user.js
// @supportURL   https://github.com/iamogbz/oh-my-scripts/issues
// @include      *://*github.com/*
// @require      https://raw.githubusercontent.com/iamogbz/cheerio/web/dist/main.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/ns.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/dom.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/path.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/request.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/github.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/github-file.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

class ExtendFilePreviewHTML extends ExtendFilePreview {
  constructor() {
    super();
    this.id = filePreviewNS`extend-html`;
    this.fileTypes = new Set(["html", "xhtml"]);
    this.featureClass = filePreviewNS`extend-html`;
  }

  prepareHTML(fileContent, filePath) {
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
