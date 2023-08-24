import { HeadersProps } from "webpack-userscript";

export const header: HeadersProps = {
  description: "Blocks window open",
  grant: ["none"],
  name: "No Window Open",
  require: [
    "https://raw.githubusercontent.com/Martii/UserScripts/d8d8829/lib/GM_setStyle/GM_setStyle.js",
  ],
};
