import * as fs from "fs";
import * as path from "path";
import { Configuration } from "webpack";
import { BuildStage, NodeEnv, Paths } from "./constants";

export function isDevMode() {
  return process.env.NODE_ENV === NodeEnv.DEVELOPMENT;
}

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

export function getCompileEntries() {
  return getProjectNames().reduce(
    (acc, name) => ({
      ...acc,
      [`src/${name}`]: path.resolve(Paths.SCRIPTS, name, "index.user.ts"),
    }),
    {}
  );
}

export function getStageEntry(name: string) {
  return { [name]: path.resolve(Paths.RELEASE, "src", `${name}.js`) };
}

export function getConfig(diff: Partial<Configuration>) {
  return {
    mode: process.env.NODE_ENV,
    ...diff,
  };
}
