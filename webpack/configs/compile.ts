import * as path from "path";
import * as fs from "fs-extra";
import { WebpackCompilerPlugin } from "webpack-compiler-plugin";
import { Dists, Paths, RegExps } from "../constants";
import { getCompileEntries, getConfig } from "../utils";

export default getConfig({
  entry: getCompileEntries(),
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.tsx?$/,
        use: ["ts-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        lib: {
          test: RegExps.LIB,
          name(module) {
            const libraryName = module.resource.match(RegExps.LIB)![1];
            return `${Dists.LIB}/${libraryName}`;
          },
        },
        npm: {
          test: RegExps.NPM,
          name(module) {
            const packageName = module.context.match(RegExps.NPM)![1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `${Dists.NPM}/${packageName.replace("@", "")}`;
          },
        },
      },
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  },
  output: {
    filename: "[name].js",
    path: Paths.COMPILE,
  },
  plugins: [
    new WebpackCompilerPlugin({
      listeners: {
        buildStart: () => {
          fs.removeSync(Paths.COMPILE);
          fs.removeSync(Paths.RELEASE);
        },
        buildEnd: () => {
          [Dists.LIB, Dists.NPM].forEach((folder) => {
            const from = `${Paths.COMPILE}/${folder}`;
            if (!fs.existsSync(from)) return;
            fs.copySync(from, `${Paths.RELEASE}/${folder}`, {
              filter: (src) => !src.split(".js")[1],
            });
          });
        },
      },
      name: "Compiler",
    }),
    {
      apply(compiler) {
        compiler.hooks.afterEmit.tap("Assets", (compilation) => {
          for (const [name, chunkGroup] of compilation.namedChunkGroups) {
            fs.outputJSONSync(
              path.resolve(Paths.COMPILE, `${name}.json`),
              chunkGroup
                .getFiles()
                .filter((fileName: string) =>
                  [Dists.LIB, Dists.NPM].some((d) => fileName.startsWith(d))
                )
            );
          }
        });
      },
    },
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: [path.resolve("."), path.resolve("./node_modules")],
  },
  target: "web",
});
