import { HeadersProps } from "webpack-userscript";

export const header: HeadersProps = {
  description: "Makes form entry less of a pain",
  grant: ["none"],
  name: "Form Less",
  require: [
    "https://raw.githubusercontent.com/Martii/UserScripts/d8d8829/lib/GM_setStyle/GM_setStyle.js",
  ],
};
