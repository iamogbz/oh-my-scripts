import * as path from "path";
import * as fs from "fs";
import { Configuration } from "webpack";
import { WebpackCompilerPlugin } from "webpack-compiler-plugin";
import * as WebpackUserscript from "webpack-userscript";
import { execSync } from "child_process";

const isDevMode = process.env.NODE_ENV === "development";
const outputFolder = path.resolve(__dirname, "dist");
const projectsFolder = path.resolve(__dirname, "scripts");
const projects = fs
  .readdirSync(projectsFolder, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((dir) => dir.name);
const entries = projects.reduce(
  (acc, name) => ({
    ...acc,
    [name]: path.resolve(projectsFolder, name, "index.user.ts"),
  }),
  {}
);

export default {
  devServer: {
    contentBase: outputFolder,
  },
  entry: entries,
  mode: isDevMode ? "development" : "production",
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
  output: {
    path: outputFolder,
    filename: "[name].user.js",
  },
  plugins: [
    new WebpackCompilerPlugin({
      listeners: {
        buildStart: () => execSync(`rm -rf ${outputFolder}`),
      },
      name: "Compiler",
    }),
    new WebpackUserscript({
      headers: () => ({
        namespace: "https://github.com/iamogbz/oh-my-scripts",
        version: isDevMode ? `[version]-build.[buildNo]` : `[version]`,
      }),
      metajs: false,
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    fallback: { buffer: require.resolve("buffer/") },
    modules: [path.resolve("."), path.resolve("./node_modules")],
  },
  target: "web",
} as Configuration;
