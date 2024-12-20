import "cheerio";
import { isAbsolutePath, normalisePath } from "./paths";

function noPrefix(p: string) {
  return isAbsolutePath(p) || p.startsWith("/");
}
function insertInto(
  $: cheerio.Root,
  selector: string,
  tagName: string,
  content = "",
  attributes = {},
) {
  const elem = document.createElement(tagName);
  for (const [name, value] of Object.entries(attributes)) {
    elem.setAttribute(name, `${value}`);
  }
  elem.innerHTML = content;
  $(selector).append(elem.outerHTML);
}

export async function inline({
  base,
  html,
  folder = "",
  load = () => Promise.resolve(""),
}: {
  base: string;
  html: string;
  folder: string;
  load?(url: string): Promise<string | undefined>;
}) {
  const $ = window.cheerio.load(html);
  const retrieve = (target: string) => {
    const noPre = noPrefix(target);
    return load(noPre ? target : normalisePath(`${folder}/${target}`));
  };

  const resources: Record<
    string,
    {
      callback: (v: cheerio.Element) => Promise<void>;
      cleanup?: boolean;
      selector: string;
      tasks: Promise<void>[];
    }
  > = {
    css: {
      callback: async (v) => {
        const target = $(v).attr("href");
        if (!target) return;
        return retrieve(target).then((content) => {
          insertInto($, "head", "style", content, { type: "text/css" });
        });
      },
      cleanup: true,
      selector: `link[rel="stylesheet"]`,
      tasks: [],
    },
    img: {
      callback: async (v) => {
        const target = $(v).attr("src");
        if (!target) return;
        const newSrc = noPrefix(target) ? target : `${base}/${target}`;
        $(v).attr("src", newSrc);
      },
      selector: `img`,
      tasks: [],
    },
    /*
     * This just removes the javascript tags without replacements
     */
    js: {
      callback: async () => undefined,
      cleanup: true,
      selector: `script[src*=".js"]`,
      tasks: [],
    },
  };

  const tasks = [];
  for (const [, r] of Object.entries(resources)) {
    if (!r.selector) continue;
    const c = $(r.selector);
    c.each((_, v) => r.tasks.push(r.callback(v)));
    tasks.push(Promise.all(r.tasks).then(() => r.cleanup && c.remove()));
  }

  await Promise.all(tasks);
  return $.html();
}
