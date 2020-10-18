import * as path from "path";

export const NodeEnv = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
};

export const BuildStage = {
  COMPILE: "compile",
  PACKAGE: "package",
};

const resolve = (relative: string | TemplateStringsArray) =>
  path.resolve(process.cwd(), `${relative}`);

export const Paths = {
  RELEASE: resolve`dist`,
  SCRIPTS: resolve`scripts`,
};
