import { doEvery } from "../../libraries/interval";

(function () {
  "use strict";
  const URL_PARAM_SORT_NAME = "s";
  const URL_PARAM_SORT_VALUE = "review-count-rank";

  doEvery({
    condition: () => {
      const searchParams = new URL(window.location.href).searchParams;
      return (
        searchParams.has(URL_PARAM_SORT_NAME) &&
        searchParams.get(URL_PARAM_SORT_NAME) !== URL_PARAM_SORT_VALUE
      );
    },
    callback: () => {
      // redirect to add url param
      const pageUrl = new URL(window.location.href);
      pageUrl.searchParams.set(URL_PARAM_SORT_NAME, URL_PARAM_SORT_VALUE);
      window.location.href = pageUrl.href;
    },
  });
})();
