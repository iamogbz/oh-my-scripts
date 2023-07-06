import * as path from "path";
import * as fs from "fs-extra";
import { NormalModule } from "webpack";
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
        // These are the share userscript libraries
        lib: {
          test: RegExps.LIB,
          name(module: NormalModule) {
            const libraryName = module.resource.match(RegExps.LIB)![1];
            return `${Dists.LIB}/${libraryName}`;
          },
        },
        // These are the shared npm package chunks
        npm: {
          test: RegExps.NPM,
          name(module: NormalModule) {
            const packageName = module.context?.match(RegExps.NPM)![1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `${Dists.NPM}/${packageName!.replace("@", "")}`;
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
        // Clear the compile target folder on build start
        buildStart: () => fs.removeSync(Paths.COMPILE),
      },
      name: "Compiler",
      // do not print out stage message
      stageMessages: {},
    }),
    {
      apply(compiler) {
        // For each named chunk (entry) save the list of dependencies
        // Used in the build:package stage to generate script require
        compiler.hooks.afterEmit.tap("Assets", (compilation) => {
          for (const [name, chunkGroup] of compilation.namedChunkGroups) {
            fs.outputJSONSync(
              path.resolve(Paths.COMPILE, `${name}.json`),
              chunkGroup
                .getFiles()
                // Strictly only include shared library and node modules
                .filter((fileName) =>
                  [Dists.LIB, Dists.NPM].some((d) => fileName.startsWith(d)),
                ),
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
