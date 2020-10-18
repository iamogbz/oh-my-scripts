import { execSync } from "child_process";
import * as path from "path";
import { NormalModule } from "webpack";
import { WebpackCompilerPlugin } from "webpack-compiler-plugin";
import { Paths } from "../constants";
import { getCompileEntries, getConfig } from "../utils";

export default getConfig({
  entry: getCompileEntries(),
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript"],
            },
          },
          "ts-loader",
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        lib: {
          test: /[\\/]libraries[\\/](.*?).ts$/,
          name(module: NormalModule) {
            // get the name. E.g. libraries/fileName.ts
            const libraryName = module.resource.match(
              /[\\/]libraries[\\/](.*?).ts$/
            )![1];
            return `lib/${libraryName}`;
          },
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: NormalModule) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )![1];
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm/${packageName.replace("@", "")}`;
          },
        },
      },
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  },
  output: {
    filename: "[name].js",
    path: Paths.RELEASE,
  },
  plugins: [
    new WebpackCompilerPlugin({
      listeners: {
        buildStart: () => execSync(`rm -rf ${Paths.RELEASE}`),
      },
      name: "Compiler",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    fallback: { buffer: require.resolve("buffer/") },
    modules: [path.resolve("."), path.resolve("./node_modules")],
  },
  target: "web",
});
