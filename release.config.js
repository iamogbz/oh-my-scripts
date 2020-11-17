// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require("child_process");

const run = (command) => execSync(command).toString().trim();
const getGitCurrentBranch = () =>
  process.env.GITHUB_REF?.replace("refs/heads/", "") ??
  run("git branch --show-current");
const getGitVersionTag = () => run("git describe --tags --abbrev=0");

const branch = getGitCurrentBranch();

try {
  run(`git ls-remote --exit-code --heads origin '${branch}'`);
} catch (e) {
  throw new Error(`Branch '${branch}' needs to exist on remote to run release`);
}

console.log("current branch:", branch);
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
