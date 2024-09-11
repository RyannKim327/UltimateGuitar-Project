const UltimateGuitar = require("./index");

let x = async () => {
  const guitar = new UltimateGuitar();
  const g = await guitar.init("yellow");
  const c = await guitar.fetch_data(UltimateGuitar.RANDOM);
  const d = await UltimateGuitar.get_chords(
    "https://tabs.ultimate-guitar.com/tab/i-belong-to-the-zoo/sana-chords-2405013",
  );
  console.log(d);
};
x();
