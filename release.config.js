// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require("child_process");

const run = (command) => execSync(command).toString().trim();
const getGitCurrentBranch = () => run("echo ${GITHUB_REF##*/}");
const getGitVersionTag = () => run("git describe --tags --abbrev=0");

const branch = getGitCurrentBranch();
const dryRun = branch != "master";

module.exports = {
  branches: [branch],
  dryRun,
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/exec",
      {
        [dryRun ? "verifyConditionsCmd" : "verifyReleaseCmd"]: `env VERSION=${
          dryRun ? getGitVersionTag() : "${nextRelease.version}"
        } npm run build`,
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["dist"],
        message:
          "chore(release): scripts and libraries [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
