// rigmarole to get html2canvas types to work with typescript imports
import { default as Html2Canvas } from "html2canvas";
const html2canvasFn = require("html2canvas") as typeof Html2Canvas;
export { html2canvasFn as html2canvas };
