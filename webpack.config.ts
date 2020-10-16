import * as path from "path";
import * as fs from "fs";
import { Configuration, NormalModule } from "webpack";
import { WebpackCompilerPlugin } from "webpack-compiler-plugin";
import { execSync } from "child_process";

const IS_DEV_MODE = process.env.NODE_ENV === "development";
const FOLDER_RELEASE = path.resolve(__dirname, "dist");
const FOLDER_SCRIPTS = path.resolve(__dirname, "scripts");
const PROJECTS = fs
  .readdirSync(FOLDER_SCRIPTS, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((dir) => dir.name);

const CONFIG_SHARED: Configuration = {
  mode: IS_DEV_MODE ? "development" : "production",
};

const CONFIGURATIONS: Configuration[] = [
  {
    ...CONFIG_SHARED,
    entry: PROJECTS.reduce(
      (acc, name) => ({
        ...acc,
        [`src/${name}`]: path.resolve(FOLDER_SCRIPTS, name, "index.user.ts"),
      }),
      {}
    ),
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
      path: FOLDER_RELEASE,
    },
    plugins: [
      new WebpackCompilerPlugin({
        listeners: {
          buildStart: () => execSync(`rm -rf ${FOLDER_RELEASE}`),
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
  },
];

export default CONFIGURATIONS;
