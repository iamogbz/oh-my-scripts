const API_V3 =
  location.hostname === "github.com"
    ? "https://api.github.com/"
    : `${location.origin}/api/v3/`;
const REGEX_COMMIT = "commits?/[0-9a-f]{5,40}";
const REGEX_PR = "^pull/\\d+";
const STORAGE_KEY_GH_TOKEN = ns`GITHUB_TOKEN`;

class APIError extends Error {
  constructor(...messages) {
    super(messages.join("\n"));
  }
}

function getGithubToken() {
  return window.localStorage.getItem(STORAGE_KEY_GH_TOKEN);
}

function setGithubToken(value) {
  window.localStorage.setItem(STORAGE_KEY_GH_TOKEN, value);
}

function getCleanPathname() {
  return location.pathname.replace(/^[/]|[/]$/g, "");
}

function getUserRepo() {
  return getCleanPathname().split("/").slice(0, 2).join("/");
}

function getRepoPath() {
  return getCleanPathname().split("/").slice(2).join("/");
}

function getCommitSha() {
  const match = getRepoPath().match(REGEX_COMMIT);
  if (!match) return null;
  return match[0].split("/")[1];
}

function getApiError(apiResponse) {
  if (
    typeof apiResponse.message === "string" &&
    apiResponse.message.includes("API rate limit exceeded")
  ) {
    return new APIError(
      "Rate limit exceeded.",
      getGithubToken()
        ? "It may be time for a walk!"
        : "Set your token in the options or take a walk!",
      " 🍃 🌞"
    );
  }

  if (apiResponse.message === "Bad credentials") {
    return new APIError(
      "The token seems to be incorrect or expired. Update it in the options."
    );
  }

  return new APIError(
    "Unable to fetch.",
    getGithubToken()
      ? "Ensure that your token has access to this repo."
      : "Maybe adding a token in the options will fix this issue.",
    JSON.stringify(apiResponse, null, "\t")
  );
}

function apiV3(query, options = { accept404: false }) {
  const personalToken = getGithubToken();

  return request(API_V3 + query, {
    headers: Object.assign(
      {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": ns`user-script`,
      },
      personalToken ? { Authorization: `token ${personalToken}` } : {}
    ),
  }).then(function (response) {
    return response.text().then(function (textContent) {
      // The response might just be a 200 or 404, it's the REST equivalent of `boolean`
      const apiResponse =
        textContent.length > 0
          ? JSON.parse(textContent)
          : { status: response.status };

      if (
        response.ok ||
        (options.accept404 === true && response.status === 404)
      ) {
        return apiResponse;
      }

      throw getApiError(apiResponse);
    });
  });
}

const githubApi = { v3: apiV3 };

function isPR() {
  return new RegExp(REGEX_PR).test(getRepoPath());
}

function isPRFiles() {
  return new RegExp(`${REGEX_PR}/files`).test(getRepoPath());
}

function isPRCommit() {
  return new RegExp(`${REGEX_PR}/${REGEX_COMMIT}`).test(getRepoPath());
}

function isSingleCommit() {
  return new RegExp(`^${REGEX_COMMIT}`).test(getRepoPath());
}

function isSingleFile() {
  return /^blob\//.test(getRepoPath());
}

function isCommit() {
  return isSingleCommit() || isPRCommit();
}

function onAjaxedPagesRaw(callback) {
  document.addEventListener("pjax:end", callback);
  callback();
}
