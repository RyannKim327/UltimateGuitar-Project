import CATEGORIES from "../utils/categories.js";
import { CATEGORY, GuitarTabs } from "../utils/interfaces.js";
import { error_, log_ } from "../utils/logs.js";
import { gotScraping } from "got-scraping";
import * as cheerio from "cheerio";

export default function searchSong(URL: string) {
  return async (
    title: string,
    artist?: string | number | CATEGORY | null,
    category?: CATEGORY,
  ): Promise<{
    status: number;
    responses: GuitarTabs[] | string;
  }> => {
    /*
     * INFO: Here's the parameter and the requirements of it
     * title: string [A required parameter to search a song, basically song title]
     * artist: string [An optional parameter, just to make it easier to search and filter]
     * category: CATEGORY [This optional parameter uses customized parameter, which is also inside of the project]
     */

    if (typeof artist === "number" && CATEGORIES.includes(artist)) {
      category = artist;
      artist = undefined;
    }

    // let request_result = ALL_RESULTS;
    let type: string = "&view_state=advanced";

    if (category != null) {
      type = `&type=${category}`;
    }

    const data = await gotScraping
      .get(
        `${URL}/search.php?title=${encodeURI(title)}${type}`,
      )
      .then((response) => {
        return response.body;
      })
      .catch((err: any) => {
        error_("Search", err);
        return null;
      });

    if (data === null) {
      log_(
        "Search",
        "There is no result found or there's a problem with the program",
      );
    } else {
      const $ = cheerio.load(data);
      let result = JSON.parse(
        $("div[class='js-store']").attr("data-content") ?? "{}",
      );

      let value = result.store.page.data.results;
      value = value.filter(
        (per: GuitarTabs) => per.type?.toLowerCase() !== "pro",
      );

      value = value.filter((per: GuitarTabs) => {
        return per.marketing_type === undefined;
      });

      if (typeof artist === "string") {
        const art = new RegExp(artist, "gi");
        value = value.filter((per: GuitarTabs) => {
          return per.artist_name && art.test(per.artist_name);
        });
      }

      return {
        status: value.length > 0 ? 200 : 500,
        responses: value.length > 0 ? value : "No results found",
      };
    }

    // TODO: To throw a error result
    return {
      status: 404,
      responses: "There are some error in fetching the datas",
    };
  }
}
