// ==UserScript==
// @name         GitHub File Preview APIB
// @namespace    https://github.com/iamogbz/oh-my-scripts
// @version      0.0.1
// @author       iamogbz
// @description  Render Apiary blueprint files in github
// @icon         https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/assets/monkey_128.png
// @updateURL    https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/scripts/github-file-preview-apib/index.user.js
// @downloadURL  https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/scripts/github-file-preview-apib/index.user.js
// @supportURL   https://github.com/iamogbz/oh-my-scripts/issues
// @include      *://*github.com/*
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/ns.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/dom.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/path.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/request.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/github.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/libraries/github-file.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

import { ExtendFilePreview, filePreviewNS } from "libraries/github-file";
import { request } from "libraries/request";

class ExtendFilePreviewAPIB extends ExtendFilePreview {
  constructor() {
    super();
    this.id = filePreviewNS`extend-apib`;
    this.fileTypes = new Set(["apib"]);
    this.featureClass = filePreviewNS`extend-apib`;
  }

  prepareHTML(fileContent: string) {
    const host = "https://d31myey2oeipxs.cloudfront.net/v1";
    const apib = btoa(fileContent);
    return request(host, { headers: { "X-Blueprint": apib } })
      .then((r) => r.text?.())
      .then((renderedHtml) => {
        return renderedHtml
          ?.replace(/<a/g, `<a target="_blank"`)
          .replace(/href="#/g, `style="cursor:default" no-href="#`)
          .replace(".collapse-button{", ".collapse-button{display:none;")
          .replace(".collapse-content{max-height:0;", ".collapse-content{");
      });
  }
}

(function () {
  "use strict";
  new ExtendFilePreviewAPIB().setup();
})();
