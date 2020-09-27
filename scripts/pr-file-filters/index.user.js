// ==UserScript==
// @name         PR File Filters
// @namespace    https://github.com/iamogbz/oh-my-scripts
// @version      0.0.1
// @author       iamogbz
// @description  Extend GitHub PR File Types Filter
// @icon         https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/assets/monkey_128.png
// @updateURL    https://raw.githubusercontent.com/iamogbz/oh-my-scripts/feat/pr-file-filters/scripts/pr-file-filters/index.user.js
// @downloadURL  https://raw.githubusercontent.com/iamogbz/oh-my-scripts/feat/pr-file-filters/scripts/pr-file-filters/index.user.js
// @supportURL   https://github.com/iamogbz/oh-my-scripts/issues
// @include      *://*.github.com/*
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/feat/pr-file-filters/libraries/github.js
// @grant        none
// ==/UserScript==

function getPRFiles() {
  const pullUrl = getCleanPathname().replace("/pull/", "/pulls/");
  const apiUrl = `repos/${pullUrl}?per_page=1000`;
  // Uses v3 as v4 does not contain deleted status information
  return apiV3(apiUrl).then(function (result) {
    return result.map(function ({ status, filename }) {
      return {
        fileName: filename,
        isDeleted: status === "removed",
      };
    });
  });
}

function setupFilters() {}

onAjaxedPagesRaw(function () {
  "use strict";
  if (!isPRFiles()) return;
  getPRFiles().then(setupFilters);
});
