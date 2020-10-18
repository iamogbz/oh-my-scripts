import * as path from "path";
import * as WebpackUserscript from "webpack-userscript";
import { Paths } from "../constants";
import { getConfig, getProjectNames } from "../utils";

export default getProjectNames().map((name) =>
  getConfig({
    entry: { [name]: path.resolve(Paths.RELEASE, "src", `${name}.js`) },
    output: {
      filename: "[name].js",
      path: Paths.RELEASE,
    },
    plugins: [
      new WebpackUserscript({
        headers: path.resolve(Paths.SCRIPTS, name, "header.json"),
        metajs: false,
      }),
    ],
  })
);
