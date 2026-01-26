import * as guitar from "./index";

async function test() {
  const search = await guitar.searchSong("Hello Adelle");
  console.log(`Search ${JSON.stringify(search, null, 2)}`);
  const gather = await guitar.fetchChords(search.responses[0]);
  console.log(`Fetch ${JSON.stringify(gather, null, 2)}`);
}

test();
