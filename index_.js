const axios = require("axios");
const cheerio = require("cheerio");

class UltimateGuitar {
  static FIRST = "first";
  static RANDOM = "random";

  constructor() { }

  async init(title) {
    let res = await axios
      .get(
        `https://www.ultimate-guitar.com/search.php?search_type=title&value=${title}`,
      )
      .then((r) => {
        return r.data;
      })
      .catch((e) => {
        console.error("Error [Package TUG]: " + e);
        return null;
      });
    let $ = cheerio.load(res);
    let data = $("div[class='js-store']").attr("data-content");
    let json = JSON.parse(data);
    let datas = json.store.page.data.results;
    this.result = datas;
  }

  static async get_chords(url) {
    let res = await axios
      .get(url)
      .then((r) => {
        return r.data;
      })
      .catch((e) => {
        console.error("Error [Package TUG]: " + e);
        return null;
      });
    let $ = cheerio.load(res);
    let output = $("div[class='js-store']").attr("data-content");
    let data = JSON.parse(output);
    try {
      let datas = data.store.page.data.tab_view.wiki_tab.content;
      return datas.replace(/(\[\/ch\]|\[\/tab\]|\[tab\]|\[ch\])/gi, "");
    } catch {
      return {
        error: "Something went wrong.",
      };
    }
  }

  async fetch_data(method = "all") {
    let res = await this.result;
    let lists = [];
    if (method === "first") {
      let i = 0;
      while (res[i]["tab_url"] == undefined || res[i]["id"] == undefined) {
        i++;
      }
      let d = res[i];
      const chrds = await UltimateGuitar.get_chords(d["tab_url"]);
      return {
        title: d["song_name"],
        artist: d["artist_name"],
        key: d["tonality_name"],
        type: d["type"],
        url: d["tab_url"],
        chords: chrds,
      };
    } else {
      for (let i in res) {
        if (res[i]["tab_url"] != undefined && res[i]["id"] != undefined) {
          let d = res[i];
          let data = {
            title: d["song_name"],
            artist: d["artist_name"],
            key: d["tonality_name"],
            type: d["type"],
            url: d["tab_url"],
          };
          lists.push(data);
        }
      }

      if (method === "random") {
        let _ = lists[Math.floor(Math.random() * lists.length)];
        const chrds = await UltimateGuitar.get_chords(_.url);
        _["chords"] = chrds;
        return _;
      } else {
        return lists;
      }
    }
  }
}
module.exports = UltimateGuitar;
