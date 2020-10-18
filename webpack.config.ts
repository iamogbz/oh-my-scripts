import compileConfig from "./webpack/configs/compile";
import packageConfig from "./webpack/configs/package";
import { isCompileStage } from "./webpack/utils";

export default isCompileStage() ? compileConfig : packageConfig;
