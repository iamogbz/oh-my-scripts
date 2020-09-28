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
// @include      *://*github.com/*
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/feat/pr-file-filters/libraries/utils.js
// @require      https://raw.githubusercontent.com/iamogbz/oh-my-scripts/feat/pr-file-filters/libraries/github.js
// @grant        none
// ==/UserScript==

// ==State & Transitions==
const state = {
  prFileTypes: {},
  prFiles: [],
  selectedFileTypes: new Set(),
  shouldExtendFileType: true,
};

function setState(diff, callback) {
  const newState = Object.assign({}, state, diff);
  if (JSON.stringify(state) === JSON.stringify(newState)) {
    callback(false);
    return;
  }
  Object.assign(state, newState);
  callback(true);
}
// ==/State & Transitions==

// ==Helpers and Utils==
function sortObject(unsorted) {
  const sorted = {};
  function compare(a, b) {
    return a > b ? 1 : 0 - Number(a < b);
  }
  for (const key of Object.keys(unsorted).sort(compare)) {
    sorted[key] = unsorted[key];
  }
  return sorted;
}

function getPRFiles() {
  const pullUrl = getCleanPathname().replace("/pull/", "/pulls/");
  const apiUrl = `repos/${pullUrl}?per_page=1000`;
  // Uses v3 as v4 does not contain deleted status information
  return apiV3(apiUrl).then(function (result) {
    if (!result) return [];
    return result.map(function ({ status, filename }) {
      return {
        fileName: filename,
        isDeleted: status === "removed",
      };
    });
  });
}

function fileBasename(filePath) {
  return filePath.split("/").slice(-1).pop();
}

function getFileType(fileName, numfileTypes = 1) {
  const delimiter = ".";
  const [, ...fileTypes] = fileBasename(fileName).split(delimiter);
  if (fileTypes.length === 0) return null;
  if (!numfileTypes) {
    return fileTypes.join(delimiter);
  }
  return fileTypes
    .slice(Math.max(fileTypes.length - numfileTypes, 0))
    .join(delimiter);
}

function getExtendedFileType(
  fileName,
  shouldExtend = state.shouldExtendFileType
) {
  const fileType = getFileType(fileName, shouldExtend ? 0 : 1);
  return fileType ? `.${fileType}` : "No extension";
}

function groupPRFileTypes(prFiles) {
  const grouped = {};
  for (const { fileName, isDeleted } of prFiles) {
    const fileType = getExtendedFileType(fileName);
    if (!(fileType in grouped)) {
      grouped[fileType] = { count: 0, deleted: 0 };
    }

    grouped[fileType].count += 1;
    if (isDeleted) {
      grouped[fileType].deleted += 1;
    }
  }

  return sortObject(grouped);
}

function selectorNS(str) {
  return `iamogbz-pr-file-filters-${str}`;
}
// ==/Helpers and Utils==

// ==DOM Element Classes and Selectors==
const fileFilterSelectAllClass = "js-file-filter-select-all-container";
const fileFilterDeselectAllClass = selectorNS`deselect-all-file-types`;
const fileFilterExtendToggleId = selectorNS`extend-file-types-toggle`;

function getFileFilterElement() {
  return selectOrThrow(".js-file-filter");
}

function getFilterListElement() {
  return selectOrThrow(".select-menu-list .p-2", getFileFilterElement());
}

function getFilterToggleTypeElement(fileType) {
  return selectOrThrow(
    `.js-diff-file-type-option[value="${fileType}"]`,
    getFilterListElement()
  );
}
// ==/DOM Element Classes and Selectors==

// ==DOM Element Constructors==
function extendFileTypesToggle({ onChange }) {
  return createElement({
    children: [
      {
        tagName: "span",
        children: ["Use fill extension "],
      },
      {
        tagName: "input",
        attributes: {
          checked: state.shouldExtendFileType,
          id: fileFilterExtendToggleId,
          onchange: onChange,
          type: "checkbox",
        },
      },
    ],
    tagName: "label",
  });
}

function fileTypeToggle({ deletedCount, fileType, onChange, totalCount }) {
  const nonDeletedCount = totalCount - deletedCount;
  function markupCount(count) {
    return `(${count})`;
  }
  return createElement({
    attributes: { class: "d-flex" },
    children: [
      {
        attributes: { class: "pl-1 mb-1" },
        children: [
          {
            attributes: {
              class: "js-diff-file-type-option",
              onchange: onChange,
              type: "checkbox",
              value: fileType,
              "data-deleted-files-count": deletedCount,
              "data-non-deleted-files-count": nonDeletedCount,
            },
            tagName: "input",
          },
          fileType,
          {
            attributes: {
              class: "text-normal js-file-type-count",
              "data-all-file-count-markup": markupCount(totalCount),
              "data-deleted-file-count-markup": markupCount(deletedCount),
              "data-non-deleted-file-count-markup": markupCount(
                nonDeletedCount
              ),
            },
            children: [markupCount(totalCount)],
            tagName: "span",
          },
        ],
        tagName: "label",
      },
    ],
    tagName: "div",
  });
}

function selectAllToggle({ count, onClick }) {
  const typeMarkup = count > 1 ? "types" : "type";
  const selectAllMarkup = `Select all ${count} file ${typeMarkup}`;
  const allSelectedMarkup = `All ${count} file ${typeMarkup} selected`;
  return createElement({
    attributes: {
      class: "ml-1",
      style: createElementStyle({ padding: "4px 0 0" }),
    },
    children: [
      {
        attributes: { style: createElementStyle({ cursor: "pointer" }) },
        children: [
          {
            attributes: {
              class: "js-file-filter-select-all",
              hidden: true,
              type: "checkbox",
            },
            tagName: "input",
          },
          {
            attributes: {
              className: `${fileFilterSelectAllClass} no-underline text-normal text-gray`,
              "data-all-selected-markup": allSelectedMarkup,
              "data-select-all-markup": selectAllMarkup,
              onclick: onClick,
            },
            children: [allSelectedMarkup],
            tagName: "span",
          },
        ],
        tagName: "label",
      },
    ],
    tagName: "div",
  });
}

function deselectAllToggle({ count, onClick }) {
  const typeMarkup = count > 1 ? "types" : "type";
  const deselectAllMarkup = `Deselect all ${count} file ${typeMarkup}`;
  const allDeselectedMarkup = `All ${count} file ${typeMarkup} deselected`;
  return createElement({
    attributes: {
      class: "ml-1",
      style: createElementStyle({ padding: "6px 0 0" }),
    },
    children: [
      {
        attributes: { style: createElementStyle({ cursor: "pointer" }) },
        children: [
          {
            attributes: {
              hidden: true,
              type: "checkbox",
            },
            tagName: "input",
          },
          {
            attributes: {
              className: `${fileFilterDeselectAllClass} no-underline text-normal text-blue`,
              "data-all-deselected-markup": allDeselectedMarkup,
              "data-deselect-all-markup": deselectAllMarkup,
              onclick: onClick,
            },
            children: [deselectAllMarkup],
            tagName: "span",
          },
        ],
        tagName: "label",
      },
    ],
    tagName: "div",
  });
}
// ==/DOM Element Constructors==

// ==Update DOM from State==
function extendFileDetailsElements() {
  for (const elem of selectAll(".file.Details")) {
    const fileHeaderElem = selectOrThrow(".file-header", elem);
    if (!fileHeaderElem.dataset.path) {
      return;
    }

    const fileType = getExtendedFileType(fileHeaderElem.dataset.path);
    fileHeaderElem.dataset.fileType = fileType;
    elem.dataset.fileType = fileType;
  }
}

function updateFilterDeselectAllElement() {
  const { prFileTypes } = state;
  const fileTypes = Object.keys(prFileTypes);
  state.selectedFileTypes = new Set(
    fileTypes.filter((fileType) => getFilterToggleTypeElement(fileType).checked)
  );
  const deselectElement = selectOrThrow(
    `.${fileFilterDeselectAllClass}`,
    getFilterListElement()
  );
  const isShowingSomeTypes = state.selectedFileTypes.size > 0;
  deselectElement.classList.remove(
    `text-${isShowingSomeTypes ? "gray" : "blue"}`
  );
  deselectElement.classList.add(`text-${isShowingSomeTypes ? "blue" : "gray"}`);
  const { deselectAllMarkup, allDeselectedMarkup } = deselectElement.dataset;
  deselectElement.innerText = isShowingSomeTypes
    ? deselectAllMarkup
    : allDeselectedMarkup;
}

function onDeselectAllToggle() {
  if (state.selectedFileTypes.size > 0) {
    for (const fileType of state.selectedFileTypes) {
      getFilterToggleTypeElement(fileType).click();
    }
  } else {
    updateFilterDeselectAllElement();
  }
}

function extendFilterListElement() {
  const filterList = getFilterListElement();
  filterList.textContent = "";
  const { prFileTypes } = state;
  const fileTypes = Object.keys(prFileTypes);
  const onChange = debounce(updateFilterDeselectAllElement, 50);
  for (const fileType of fileTypes) {
    const props = {
      deletedCount: prFileTypes[fileType].deleted,
      fileType,
      onChange,
      totalCount: prFileTypes[fileType].count,
    };
    filterList.append(fileTypeToggle(props));
  }

  filterList.append(
    selectAllToggle({ count: fileTypes.length, onClick: onChange })
  );
  const onClick = debounce(onDeselectAllToggle, 50);
  filterList.append(deselectAllToggle({ count: fileTypes.length, onClick }));
  updateFilterDeselectAllElement();
}

function updateFileTypesState() {
  setState(
    {
      prFileTypes: groupPRFileTypes(state.prFiles),
    },
    function (updated) {
      if (updated) {
        extendFileDetailsElements();
        extendFilterListElement();
      }
    }
  );
}

function onShouldExtendToggle() {
  const extendToggleElement = selectOrThrow(`#${fileFilterExtendToggleId}`);
  setState(
    {
      shouldExtendFileType: extendToggleElement
        ? extendToggleElement.checked
        : false,
    },
    function (updated) {
      if (updated) {
        const filterListElement = getFilterListElement();
        const numFileTypes = Object.keys(state.prFileTypes).length;
        if (state.selectedFileTypes.size !== numFileTypes) {
          selectOrThrow(
            `.${fileFilterSelectAllClass}`,
            filterListElement
          ).click();
        }

        updateFileTypesState();
      }
    }
  );
}
// ==/Update DOM from State==

function setupFilters(prFiles) {
  state.prFiles = prFiles;
  const selectMenuHeader = selectOrThrow(
    ".select-menu-header",
    getFileFilterElement()
  );
  if (selectExists(`#${fileFilterExtendToggleId}`, selectMenuHeader)) return;
  selectMenuHeader.append(
    extendFileTypesToggle({ onChange: onShouldExtendToggle })
  );
  updateFileTypesState();
}

onAjaxedPagesRaw(function () {
  "use strict";
  if (!isPRFiles()) return;
  return getPRFiles().then(setupFilters);
});
