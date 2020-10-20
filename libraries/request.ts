export function request(
  url: RequestInfo,
  options?: RequestInit
): Promise<Partial<Response>> {
  if (!window.GM_xmlhttpRequest) return fetch(url, options);
  return new Promise((resolve, reject) => {
    const onload = (result: {
      response: string;
      responseHeaders: Headers;
      status: number;
      statusText: string;
      responseText: string;
      finalUrl: string;
    }) => {
      resolve({
        blob: () => Promise.resolve(new Blob([result.response])),
        headers: result.responseHeaders,
        json: () => Promise.resolve(JSON.parse(result.responseText)),
        ok: result.status >= 200 && result.status < 300,
        status: result.status,
        statusText: result.statusText,
        text: () => Promise.resolve(result.responseText),
        url: result.finalUrl,
      });
    };
    const details = {
      onabort: reject,
      onerror: reject,
      onload,
      ontimeout: reject,
      url,
      ...options,
    };
    window.GM_xmlhttpRequest(details);
  });
}
