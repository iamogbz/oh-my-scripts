import { ExtendFilePreview, filePreviewNS } from "libraries/github-file";
import { request } from "libraries/request";

class ExtendFilePreviewAPIB extends ExtendFilePreview {
  constructor() {
    const id = filePreviewNS`extend-apib`;
    super(id, id, new Set(["apib"]));
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
