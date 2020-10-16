interface Window {
  // https://openuserjs.org/libs/Marti/GM_setStyle
  GM_setStyle(params: { data: string }): void;
  // https://www.tampermonkey.net/documentation.php#GM_xmlhttpRequest
  GM_xmlhttpRequest(details: Record<string, unknown>): void;
}
