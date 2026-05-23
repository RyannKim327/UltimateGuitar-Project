import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";
import { error_ } from "../utils/logs.js";
import { GuitarTabs } from "../utils/interfaces.js";

export default async function fetchChords(
  url_or_response: string | GuitarTabs,
) {
  /*
   * INFO: Here's the parameters and their ddescription/use
   * url_or_response: string|GuitarTabs
   * string must be equal to url of the ultimate guitar tabs
   * GuitarTabs is a customized interface where it automatically call the url once you insert it.
   */
  let url: string = "";

  if (typeof url_or_response === "string") {
    url = url_or_response;
  }

  if (
    typeof url_or_response === "object" &&
    url_or_response !== null &&
    "tab_url" in url_or_response
  ) {
    url = url_or_response.tab_url;
  }

  const data = await gotScraping
    .get(url)
    .then((response) => {
      return response.body;
    })
    .catch((error: any) => {
      error_("Fetch Chords", error);
      return {
        status: 404,
        message: "Result not found",
      };
    });

  const $ = cheerio.load(data as string);

  let output = JSON.parse(
    $("div[class='js-store']").attr("data-content") ?? "{}",
  );

  try {
    let result = output.store.page.data.tab_view.wiki_tab.content;
    return {
      status: 200,
      response: result.replace(/(\[\/ch\]|\[\/tab\]|\[tab\]|\[ch\])/gi, ""),
    };
  } catch {
    return {
      status: 404,
      response: "There's a problem in fetching the chords",
    };
  }
}
