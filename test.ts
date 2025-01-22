import { CHORDS, fetchChords, searchSong } from "./index";

let a = async () => {
  const data = await searchSong("hello", null, CHORDS);
  console.log(data.responses[1]);
  const data1 = await fetchChords(data.responses[1]);
  console.log(data1);
  const data2 = await fetchChords(
    "https://tabs.ultimate-guitar.com/tab/adele/hello-chords-1775924",
  );
  console.log(data2);
};

a();
