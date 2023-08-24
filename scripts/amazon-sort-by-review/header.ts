import { HeadersProps } from "webpack-userscript";

export const header: HeadersProps = {
  description: "Sort products best by reviews",
  grant: ["GM_xmlhttpRequest"],
  match: ["ca", "com", "co.uk"].map((tld) => `*://*.amazon.${tld}/*`),
  name: "Amazon Sort by Review",
};
