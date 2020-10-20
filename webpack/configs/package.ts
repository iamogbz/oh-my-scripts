import * as path from "path";
import { execSync } from "child_process";
import { WebpackCompilerPlugin } from "webpack-compiler-plugin";
import * as WebpackUserscript from "webpack-userscript";
import * as defaultHeaderObj from "../../scripts/header.default.json";
import { Dists, Paths } from "../constants";
import { getConfig, getProjectNames, isProdMode } from "../utils";

export default [
  getConfig({
    entry: {},
    plugins: [
      new WebpackCompilerPlugin({
        listeners: {
          buildStart: () => execSync(`rm -rf ${Paths.RELEASE}`),
          compileStart: () =>
            [Dists.LIB, Dists.NPM].forEach((folder) =>
              execSync(
                `mkdir -p ${Paths.RELEASE} && cp -r ${Paths.COMPILE}/${folder} ${Paths.RELEASE}`
              )
            ),
        },
        name: "Copy",
      }),
    ],
  }),
  ...getProjectNames().map((name) => {
    return getConfig({
      entry: { [name]: path.resolve(Paths.COMPILE, Dists.SRC, `${name}.js`) },
      output: {
        filename: "[name].js",
        path: Paths.RELEASE,
      },
      plugins: [
        new WebpackUserscript({
          headers: (data: WebpackUserscript.DataObject) => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const required: string[] =
              require(path.resolve(Paths.COMPILE, Dists.SRC, `${name}.json`)) ??
              [];
            const headerObj = {
              ...defaultHeaderObj,
              require: [],
            };
            const uriBase = isProdMode()
              ? `${data.homepage}/raw/master/dist`
              : "http://localhost:8080";
            const uri = (path: string) => `${uriBase}/${path}`;
            return {
              ...headerObj,
              downloadURL: uri(data.filename),
              require: required.map(uri),
            };
          },
          metajs: false,
        }),
      ],
    });
  }),
];
