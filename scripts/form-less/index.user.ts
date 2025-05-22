import { selectAll } from "../../libraries/dom";

(function main() {
  "use strict";
  // detect if there are any form fields in the page that are not disabled or etc
  // if there are attach a listener to the page for when the user exits the page
  // show a modal with the detected form fields all checked and allowed to be unchecked [Close page] [Back to page] [Stash form values]
  // dismiss the modal to not save and exit the page
  // When editing a form field show button that brings up modal to select a stashed form value [field name] [value] [relative date time] [spinner]

  // == Setup ==
  const WINDOW_ON_BEFORE_UNLOAD_MSG =
    "You have filled in a form on this page. Do you want to remember the values for next time?";
  let STATE_HAS_UNSAVED_FIELDS = false;

  function setPageHasUnsavedFields() {
    STATE_HAS_UNSAVED_FIELDS = true;
  }

  function setPageFieldsBeenSaved() {
    STATE_HAS_UNSAVED_FIELDS = false;
  }

  const submitHook = () => {
    setPageFieldsBeenSaved();
  };

  const exitHook: OnBeforeUnloadEventHandlerNonNull = (e) => {
    if (!STATE_HAS_UNSAVED_FIELDS) return null;
    const evt = e || window.event;
    evt.preventDefault();

    // For IE and Firefox
    if (evt) {
      // @ts-expect-error - IE specific
      evt.returnValue = WINDOW_ON_BEFORE_UNLOAD_MSG;
    }

    // For Safari
    return WINDOW_ON_BEFORE_UNLOAD_MSG;
  };

  function setPageHooks() {
    document.onsubmit = submitHook;
    window.onbeforeunload = exitHook;
  }

  function selectValidFormFields() {
    const formFieldSelectors = ["hidden", "password", "reset", "submit"]
      .map((t) => `input:not([type='${t}'])`)
      .concat("select", "textarea")
      .join(",");
    return selectAll(formFieldSelectors);
  }

  function setInputListeners() {
    selectValidFormFields().forEach((e) =>
      e.addEventListener("input", setPageHasUnsavedFields),
    );
  }

  function init() {
    // GM_setStyle({ data: POPUP_ELEMENT_CSS });
    setInputListeners();
    setPageHooks();
  }

  // == Run ==
  init();
})();
