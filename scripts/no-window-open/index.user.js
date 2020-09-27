// ==UserScript==
// @name         Block Window Open
// @namespace    https://github.com/iamogbz/oh-my-scripts
// @version      0.0.1
// @author       iamogbz
// @description  blocks window open
// @icon         https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/assets/monkey_128.png
// @updateURL    https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/scripts/no-window-open/index.user.js
// @downloadURL  https://raw.githubusercontent.com/iamogbz/oh-my-scripts/master/scripts/no-window-open/index.user.js
// @supportURL   https://github.com/iamogbz/oh-my-scripts/issues
// @include      *://*/*
// @grant        none
// ==/UserScript==

module.exports = (function() {
  "use strict";
  window.open = url => {
    console.log(`window.open(${url})`);
    return null;
  };
})();
