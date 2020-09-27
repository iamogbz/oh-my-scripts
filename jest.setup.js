const NOOP = () => undefined;
// https://www.tampermonkey.net/documentation.php
const monkeyGlobals = [
  "GM_addStyle",
  "GM_deleteValue",
  "GM_download",
  "GM_getResourceText",
  "GM_getResourceURL",
  "GM_getTab",
  "GM_getTabs",
  "GM_info",
  "GM_listValues",
  "GM_log",
  "GM_notification",
  "GM_openInTab",
  "GM_registerMenuCommand",
  "GM_saveTab",
  "GM_setClipboard",
  "GM_setStyle",
  "GM_unregisterMenuCommand",
  "GM_xmlhttpRequest",
];
for (const fnName of monkeyGlobals) {
  global[fnName] = NOOP;
  jest.spyOn(global, fnName);
}
