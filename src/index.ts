import fetchChordsFactory from "./actions/fetch_chords.js";
import searchSongFactory from "./actions/search_songs.js";

import * as category from "./utils/categories.js";

const URL = "https://www.ultimate-guitar.com"

export const fetchChords = fetchChordsFactory(URL)
export const searchSong = searchSongFactory(URL)
export { category }

export function guitar() {
	return {
		fetch: fetchChords,
		search: searchSong,
		category,
	}
}
