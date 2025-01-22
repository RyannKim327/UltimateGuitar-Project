import axios from "axios";
import cheerio from "cheerio";

import { GuitarTabs, CATEGORY, METHOD_RESULT } from "./utils/interfaces";

import { error_, log_ } from "./utils/logs";

// TODO: To create a Method for result count release
// export const FIRST_RESULT: METHOD_RESULT = "first_result";
// export const RANDOM_RESULT: METHOD_RESULT = "random_results";
// export const ALL_RESULTS: METHOD_RESULT = "all_results";

// TODO: To filter out all the content by category
export const VIDEO: CATEGORY = 100;
export const TAB: CATEGORY = 200;
export const CHORDS: CATEGORY = 300;
export const BASS: CATEGORY = 400;
export const POWER: CATEGORY = 600;
export const DRUMS: CATEGORY = 700;
export const UKALELE: CATEGORY = 800;

export async function searchSong(
  title: string,
  artist?: string | null,
  category?: CATEGORY,
): Promise<{
  status: number;
  responses: GuitarTabs | string;
}> {
  /*
   * INFO: Here's the parameter and the requirements of it
   * title: string [A required parameter to search a song, basically song title]
   * artist: string [An optional parameter, just to make it easier to search and filter]
   * category: CATEGORY [This optional parameter uses customized parameter, which is also inside of the project]
   */

  // let request_result = ALL_RESULTS;
  let type: string = "&view_state=advanced";

  if (category) {
    type = `&type=${category}`;
  }

  const data = await axios
    .get(
      `https://www.ultimate-guitar.com/search.php?title=${encodeURI(title)}${type}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
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

    if (artist) {
      const art = new RegExp(artist, "gi");
      value = value.filter((per: GuitarTabs) => {
        return per.artist_name && art.test(per.artist_name);
      });
    }

    return {
      status: 200,
      responses: value,
    };
  }

  // TODO: To throw a error result
  return {
    status: 404,
    responses: "No result found",
  };
}

export async function fetchChords(url_or_response: string | GuitarTabs) {
  /*
   * INFO: Here's the parameters and their ddescription/use
   * url_or_response: string|GuitarTabs
   * string must be equal to url of the ultimate guitar tabs
   * GuitarTabs is a customized interface where it automatically call the url once you insert it.
   */
  let url: string = "";

  if (typeof url === "string") {
    url = url_or_response;
  }
  if (url_or_response.tab_url) {
    url = url_or_response.tab_url;
  }

  const data = await axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      error_("Fetch Chords", error);
      return {
        status: 404,
        message: "Result not found",
      };
    });

  const $ = cheerio.load(data);

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
