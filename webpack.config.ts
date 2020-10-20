import { isCompileStage } from "./webpack/utils";

module.exports = require(`./webpack/configs/${
  isCompileStage() ? "compile" : "package"
}`);
