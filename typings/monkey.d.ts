declare interface Window {
  // https://openuserjs.org/libs/Marti/GM_setStyle
  GM_setStyle(params: { data: string }): void;
  // https://www.tampermonkey.net/documentation.php#GM_addStyle
  GM_addStyle(css: string): void;
  // https://www.tampermonkey.net/documentation.php#GM_getResourceText
  GM_getResourceText(name: string): string;
  // https://www.tampermonkey.net/documentation.php#GM_xmlhttpRequest
  GM_xmlhttpRequest(details: Record<string, unknown>): void;
}
