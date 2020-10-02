function request(url, options) {
  if (!window["GM_xmlhttpRequest"]) return fetch(url, options);
  return new Promise((resolve, reject) => {
    const onload = (result) => {
      resolve({
        blob: () => Promise.resolve(result.response),
        headers: result.responseHeaders,
        json: () => Promise.resolve(JSON.parse(result.responseText)),
        ok: result.status >= 200 && result.status < 300,
        status: result.status,
        statusText: result.statusText,
        text: () => Promise.resolve(result.responseText),
        url: result.finalUrl,
        useFinalUrl: true,
      });
    };
    const details = Object.assign(
      {
        onabort: reject,
        onerror: reject,
        onload,
        ontimeout: reject,
        url,
      },
      options
    );
    window["GM_xmlhttpRequest"](details);
  });
}
