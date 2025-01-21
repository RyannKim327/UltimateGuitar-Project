import axios from "axios";
import cheerio from "cheerio";

import { error_, log_ } from "./utils/logs";

type METHOD_RESULT = string;
type CATEGORY = number;

export interface GuitarTabs {
  id: number;
  song_id: number;
  song_name: string;
  artist_id: number;
  artist_name: string;
  type: string;
  part: string;
  version: number;
  votes: number;
  difficulty: string;
  rating: number;
  date: string | number;
  status: string;
  preset_id: number;
  tab_access_type: string;
  tp_version: number;
  tonality_name: string;
  version_description: string;
  verified: number;
  recording: {
    is_accoustic: number;
    tonality_name: string;
    performance: unknown | null;
    recording_artists: unknown;
    video_urls: unknown | null;
  };
  album_cover: {
    has_album_cover: boolean;
    web_album_cover: unknown;
  };
  artist_cover: {
    has_artist_cover: boolean;
    web_artist_cover: unknown;
  };
  artist_url: string;
  tab_url: string;
  marketing_type?: string;
}

const FIRST_RESULT: METHOD_RESULT = "first_result";
const RANDOM_RESULT: METHOD_RESULT = "random_results";

export const VIDEO: CATEGORY = 100;
export const TAB: CATEGORY = 200;
export const CHORDS: CATEGORY = 300;
export const BASS: CATEGORY = 400;
export const POWER: CATEGORY = 600;
export const DRUMS: CATEGORY = 700;
export const UKALELE: CATEGORY = 800;

export async function searchSong(
  title: string,
  artist?: string,
  category?: CATEGORY,
): Promise<{
  status: number;
  responses: GuitarTabs | string;
}> {
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
  return {
    status: 404,
    responses: "No result found",
  };
}

export async function fetchChords(url_or_response: string | GuitarTabs) {
  let url: string = "";

  if (typeof url === "string") {
    url = url_or_response;
  } else if (url_or_response.tab_url) {
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
}
