// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require("child_process");

const run = (command) => execSync(command).toString().trim();

const branch = process.env.BRANCH_NAME || run("git branch --show-current");
const releaseBranch = "gh-pages";

try {
  run(`git ls-remote --exit-code --heads origin '${branch}'`);
} catch (e) {
  throw new Error(`Branch '${branch}' needs to exist on remote to run release`);
}

console.log("current branch:", branch);
const dryRun = branch != "main";

module.exports = {
  branches: [{ name: branch, channel: releaseBranch }],
  dryRun,
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/exec",
      {
        [dryRun ? "verifyConditionsCmd" : "verifyReleaseCmd"]: `env VERSION=${
          dryRun
            ? run("git describe --tags --abbrev=0")
            : "${nextRelease.version}"
        } pnpm run build`,
      },
    ],
    {
      path: "@qiwi/semantic-release-gh-pages-plugin",
      branch: releaseBranch,
      src: "dist",
      msg: "chore(release): scripts and libraries <%= nextRelease.gitTag %> [skip ci]\n\n<%= nextRelease.notes %>",
    },
  ],
};
