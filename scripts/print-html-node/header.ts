import { HeadersProps } from "webpack-userscript";

export const header: HeadersProps = {
  description:
    "Add a context menu option to print a HTML element including all styles",
  grant: ["GM_registerMenuCommand"],
  name: "Export Element",
  match: "*://*/*",
};
