import * as path from "path";

export const NodeEnv = Object.freeze({
  DEVELOPMENT: "development",
  PRODUCTION: "production",
});

export const BuildStage = Object.freeze({
  COMPILE: "compile",
  PACKAGE: "package",
});

const resolve = (relative: string | TemplateStringsArray) =>
  path.resolve(process.cwd(), `${relative}`);

export const Paths = Object.freeze({
  COMPILE: resolve`tmp`,
  RELEASE: resolve`dist`,
  SCRIPTS: resolve`scripts`,
});

export const Dists = Object.freeze({
  LIB: "lib",
  NPM: "npm",
  SRC: "src",
});

export const RegExps = Object.freeze({
  // get the name. E.g. node_modules/packageName/not/this/part.js
  // or node_modules/packageName
  NPM: /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
  // get the name. E.g. libraries/fileName.ts
  LIB: /[\\/]libraries[\\/](.*?)\.ts$/,
});
