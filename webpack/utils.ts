import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { Configuration } from "webpack";
import { BuildStage, NodeEnv, Paths } from "./constants";

export function isProdMode() {
  return process.env.NODE_ENV !== NodeEnv.DEVELOPMENT;
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

function getScriptPath(name: string, file: string) {
  return path.resolve(Paths.SCRIPTS, name, file);
}

export function getHeaderEntry(name: string) {
  return getScriptPath(name, "header.ts");
}

export function getCompileEntry(name: string) {
  return getScriptPath(name, "index.user.ts");
}

export function getCompileEntries() {
  return getProjectNames().reduce(
    (acc, name) => ({ ...acc, [`src/${name}`]: getCompileEntry(name) }),
    {},
  );
}

export function getConfig(diff: Partial<Configuration>) {
  return {
    mode: NodeEnv.PRODUCTION,
    ...diff,
  };
}

export function getGitCommitHash() {
  return execSync("git rev-parse HEAD").toString().trim();
}
