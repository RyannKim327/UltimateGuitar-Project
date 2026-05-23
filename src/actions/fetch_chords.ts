import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";
import { error_ } from "../utils/logs.js";
import { GuitarTabs } from "../utils/interfaces.js";

export default function fetchChords(URL: string) {

  return async (
    url_or_response: string | GuitarTabs,
  ) => {
    /*
     * INFO: Here's the parameters and their description/use
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
        return null;
      });

    if (data === null || typeof data !== "string") {
      return {
        status: 404,
        response: "Result not found or invalid data received",
      };
    }

    const $ = cheerio.load(data);

    try {
      const storeAttr = $("div[class='js-store']").attr("data-content");
      if (!storeAttr) throw new Error("Store data not found");
      
      let output = JSON.parse(storeAttr);
      let result = output.store.page.data.tab_view.wiki_tab.content;
      return {
        status: 200,
        response: result.replace(/(\[\/ch\]|\[\/tab\]|\[tab\]|\[ch\])/gi, ""),
      };
    } catch (err: any) {
      return {
        status: 404,
        response: "There's a problem in fetching the chords: " + err.message,
      };
    }
  }
}
