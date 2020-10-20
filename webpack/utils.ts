import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { Configuration } from "webpack";
import { BuildStage, NodeEnv, Paths } from "./constants";

export function isProdMode() {
  return process.env.NODE_ENV === NodeEnv.PRODUCTION;
}

export function isCompileStage() {
  return process.env.BUILD_STAGE === BuildStage.COMPILE;
}

export function isPackageStage() {
  return process.env.BUILD_STAGE === BuildStage.PACKAGE;
}

export function getProjectNames() {
  return fs
    .readdirSync(Paths.SCRIPTS, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((dir) => dir.name);
}

export function getCompileEntry(name: string) {
  return path.resolve(Paths.SCRIPTS, name, "index.user.ts");
}

export function getCompileEntries() {
  return getProjectNames().reduce(
    (acc, name) => ({ ...acc, [`src/${name}`]: getCompileEntry(name) }),
    {}
  );
}

export function getConfig(diff: Partial<Configuration>) {
  return {
    mode: process.env.NODE_ENV,
    ...diff,
  };
}

export function getGitCommitHash() {
  return execSync("git rev-parse HEAD").toString();
}

export function getResourceKey(size = 7) {
  return isProdMode()
    ? getGitCommitHash().substr(0, size)
    : Math.random().toString(36).substring(size);
}
