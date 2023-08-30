import { isCompileStage } from "./webpack/utils";

const configName = isCompileStage() ? "compile" : "package";
const configModule = `./webpack/configs/${configName}`;
module.exports = require(configModule);
