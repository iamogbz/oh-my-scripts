import { ns } from "./ns";
import { request } from "./request";

const API_V3 =
  location.hostname === "github.com"
    ? "https://api.github.com/"
    : `${location.origin}/api/v3/`;
const REGEX_COMPARE = "compare?/([0-9a-f]{5,40})\\.{3}([0-9a-f]{5,40})";
const REGEX_COMMIT = "commits?/[0-9a-f]{5,40}";
const REGEX_PR = "^pull/\\d+";
const STORAGE_KEY_GH_TOKEN = ns`GITHUB_TOKEN`;

class APIError extends Error {
  constructor(...messages: string[]) {
    super(messages.join("\n"));
  }
}

function getGithubToken() {
  return window.localStorage.getItem(STORAGE_KEY_GH_TOKEN);
}

function getApiError(apiResponse: { message: string }) {
  if (
    typeof apiResponse.message === "string" &&
    apiResponse.message.includes("API rate limit exceeded")
  ) {
    return new APIError(
      "Rate limit exceeded.",
      getGithubToken()
        ? "It may be time for a walk!"
        : "Set your token in the options or take a walk!",
      " 🍃 🌞",
    );
  }

  if (apiResponse.message === "Bad credentials") {
    return new APIError(
      "The token seems to be incorrect or expired. Update it in the options.",
    );
  }

  return new APIError(
    "Unable to fetch.",
    getGithubToken()
      ? "Ensure that your token has access to this repo."
      : "Maybe adding a token in the options will fix this issue.",
    JSON.stringify(apiResponse, undefined, "\t"),
  );
}

function apiV3(query: string, options = { accept404: false }) {
  const personalToken = getGithubToken();

  return request(API_V3 + query, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": ns`user-script`,
      ...(personalToken ? { Authorization: `token ${personalToken}` } : {}),
    },
  }).then(function (response) {
    return response.text?.().then(function (textContent) {
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

function isPRCommit() {
  return new RegExp(`${REGEX_PR}/${REGEX_COMMIT}`).test(getRepoPath());
}

function isSingleCommit() {
  return new RegExp(`^${REGEX_COMMIT}`).test(getRepoPath());
}

export const githubApi = { v3: apiV3 };

export function getCleanPathname() {
  return location.pathname.replace(/^[/]|[/]$/g, "");
}

export function getUserRepo() {
  return getCleanPathname().split("/").slice(0, 2).join("/");
}

export function getRepoPath() {
  return getCleanPathname().split("/").slice(2).join("/");
}

export function getCommitSha() {
  const match = getRepoPath().match(REGEX_COMMIT);
  if (!match) return undefined;
  return match[0].split("/")[1];
}

function getComparedShas() {
  const match = getRepoPath().match(REGEX_COMPARE);
  if (!match) return undefined;
  return match.slice(1, 3);
}

export function getCompareHeadSha() {
  return getComparedShas()?.[1];
}

export function isCommit() {
  return isSingleCommit() || isPRCommit();
}

export function isCompare() {
  return new RegExp(REGEX_COMPARE).test(getRepoPath());
}

export function isSingleFile() {
  return /^blob\//.test(getRepoPath());
}

export function isPRFiles() {
  return new RegExp(`${REGEX_PR}/files`).test(getRepoPath());
}
