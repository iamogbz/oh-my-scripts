import * as path from "path";
import * as fs from "fs-extra";
import { WebpackCompilerPlugin } from "webpack-compiler-plugin";
import * as WebpackUserscript from "webpack-userscript";
import * as defaultHeaderObj from "../../scripts/header.default.json";
import { Dists, Paths } from "../constants";
import {
  getConfig,
  getProjectNames,
  getResourceKey,
  isProdMode,
} from "../utils";

export default [
  getConfig({
    entry: {},
    plugins: [
      new WebpackCompilerPlugin({
        listeners: {
          buildStart: () => fs.removeSync(Paths.RELEASE),
          buildEnd: () =>
            [Dists.LIB, Dists.NPM].forEach((folder) => {
              const from = `${Paths.COMPILE}/${folder}`;
              if (!fs.existsSync(from)) return;
              fs.copySync(from, `${Paths.RELEASE}/${folder}`, {
                filter: (src) => !src.split(".js")[1],
              });
            }),
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
            const required: string[] =
              require(path.resolve(Paths.COMPILE, Dists.SRC, `${name}.json`)) ??
              [];
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const scriptHeaderObj: WebpackUserscript.HeaderObject = require(path.resolve(
              Paths.SCRIPTS,
              name,
              `header.json`
            ));
            const headerObj = {
              ...defaultHeaderObj,
              ...scriptHeaderObj,
            };
            const uriBase = isProdMode()
              ? `${data.homepage}/raw/master/dist`
              : "http://localhost:8080";
            const uri = (path: string) =>
              `${uriBase}/${path}?v=${getResourceKey()}`;
            return {
              ...headerObj,
              downloadURL: uri(data.filename.replace(".js", ".user.js")),
              require: required.map(uri).concat(scriptHeaderObj.require ?? []),
            };
          },
          metajs: false,
        }),
      ],
    });
  }),
];
