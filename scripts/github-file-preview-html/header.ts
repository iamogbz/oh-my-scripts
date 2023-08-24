import { HeadersProps } from "webpack-userscript";

export const header: HeadersProps = {
  description: "Render HTML files in github",
  grant: ["GM_xmlhttpRequest"],
  include: ["*://github.com/*"],
  name: "GitHub File Preview HTML",
};
