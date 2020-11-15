// https://openuserjs.org/libs/Marti/GM_setStyle
declare function GM_setStyle(params: { data: string }): void;
// https://www.tampermonkey.net/documentation.php#GM_addStyle
declare function GM_addStyle(css: string): void;
// https://www.tampermonkey.net/documentation.php#GM_getResourceText
declare function GM_getResourceText(name: string): string;
// https://www.tampermonkey.net/documentation.php#GM_xmlhttpRequest
declare function GM_xmlhttpRequest(details: Record<string, unknown>): void;
