import * as path from "path";
import * as fs from "fs-extra";
import { WebpackCompilerPlugin } from "webpack-compiler-plugin";
import * as WebpackUserscript from "webpack-userscript";
import { header as defaultHeaderObj } from "../../scripts/header.default";
import { Dists, Paths } from "../constants";
import {
  getCompileEntry,
  getConfig,
  // getGitCommitHash,
  getProjectNames,
  isProdMode,
} from "../utils";

const DEFAULT_VERSION = process.env.VERSION || "0.0.0";
const DEV_SERVER = process.env.DEV_SERVER || "http://localhost:8080";
const RELEASE_BRANCH = "release";

console.log(`
> DEV_SERVER=${DEV_SERVER}
> DEFAULT_VERSION=${DEFAULT_VERSION}
`);

export default [
  getConfig({
    entry: {},
    plugins: [
      new WebpackCompilerPlugin({
        listeners: {
          // Clear the release target folder on build start
          buildStart: () => fs.removeSync(Paths.RELEASE),
          // Copy the compiled library and npm distributables
          buildEnd: () =>
            [Dists.LIB, Dists.NPM].forEach((folder) => {
              const from = `${Paths.COMPILE}/${folder}`;
              if (!fs.existsSync(from)) return;
              fs.copySync(from, `${Paths.RELEASE}/${folder}`, {
                // Only include folders or JS files
                filter: (src, dest) => {
                  const shouldInclude = /[\d\w_-](\.js)?$/.test(src);
                  if (shouldInclude) {
                    src.endsWith(".js") &&
                      console.log(
                        "\x1b[32m\x1b[1msuccess\x1b[0m",
                        path.relative(process.cwd(), dest),
                        "[copied]\n",
                      );
                  } else {
                    console.log(
                      "\x1b[93m\x1b[1mwarning\x1b[0m",
                      path.relative(process.cwd(), dest),
                      "[ignored]\n",
                    );
                  }
                  return shouldInclude;
                },
              });
            }),
        },
        name: "Copy",
        stageMessages: {},
      }),
    ],
  }),
  // Build user script for each project
  ...getProjectNames().map((name) => {
    return getConfig({
      entry: { [name]: path.resolve(Paths.COMPILE, Dists.SRC, `${name}.js`) },
      output: {
        filename: "[name].js",
        globalObject: "this",
        path: Paths.RELEASE,
      },
      plugins: [
        new WebpackUserscript.UserscriptPlugin({
          headers: (initialHeaderObj, entryPoint) => {
            // Get the list of dependencies extracted in the build:compile stage
            const required: string[] =
              require(path.resolve(Paths.COMPILE, Dists.SRC, `${name}.json`)) ??
              [];

            // Get the supplementary header object for each user script
            const scriptHeaderObj: WebpackUserscript.HeadersProps =
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              require(getCompileEntry(name)).header ?? {};

            // Override defaults with userscript defined headers
            const headerObj = {
              ...initialHeaderObj,
              version: DEFAULT_VERSION,
              ...defaultHeaderObj,
              ...scriptHeaderObj,
            };

            // Use github as host in production mode else local server
            // pin release to commit hash for production
            // const gitCommitHash = getGitCommitHash().substr(0, 7);
            const gitCommitHash = DEFAULT_VERSION;
            const uriBase = isProdMode()
              ? `${initialHeaderObj.homepage}/raw/${gitCommitHash}`
              : DEV_SERVER;
            // Append each path with a resource key to override cache for local dev
            const urlSuffix = isProdMode()
              ? ""
              : `?v=${Math.random().toString(36).substring(7)}`;
            const uri = (path: string) => `${uriBase}/${path}${urlSuffix}`;

            // Plugin will emit the file ending with .user.js
            const downloadURL = uri(entryPoint.fileInfo.userjsFile);
            const updateURL = downloadURL
              .replace(`/${gitCommitHash}/`, `/${RELEASE_BRANCH}/`)
              .replace(/\?.+/, "");

            const finalHeaderObj = {
              ...headerObj,
              downloadURL,
              require: required
                .map(uri)
                .concat(
                  (Array.isArray(scriptHeaderObj.require)
                    ? scriptHeaderObj.require
                    : [scriptHeaderObj.require].filter(Boolean)) as string[],
                ),
              updateURL,
            };

            return finalHeaderObj;
          },
          metajs: false,
        }),
      ],
    });
  }),
];
