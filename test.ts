import { searchSong } from "./index";

let a = async () => {
  const data = await searchSong("hello", "Adele");
  console.log(data);
};

a();
