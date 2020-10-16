import * as path from "path";
import * as fs from "fs";
import { Configuration } from "webpack";
import * as WebpackUserscript from "webpack-userscript";

const isDevMode = process.env.NODE_ENV === "development";
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
    contentBase: path.join(__dirname, "dist"),
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
    path: path.resolve(__dirname, "dist"),
    filename: "[name].user.js",
  },
  plugins: [
    new WebpackUserscript({
      headers: () => ({
        namespace: "https://github.com/iamogbz/oh-my-scripts",
        version: isDevMode ? `[version]-build.[buildNo]` : `[version]`,
      }),
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    fallback: { buffer: require.resolve("buffer/") },
    modules: [path.resolve("."), path.resolve("./node_modules")],
  },
  target: "web",
} as Configuration;
