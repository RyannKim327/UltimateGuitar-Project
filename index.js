const axios = require("axios")
const cheerio = require("cheerio")

let searchDatas = async (title) => {
	let res = await axios.get(`https://www.ultimate-guitar.com/search.php?search_type=title&value=${title}`).then(r => {
		return r.data
	}).catch(e => {
		console.error("Error [Package TUG]: " + e)
		return null
	})
	let $ = cheerio.load(res)
	let data = $("div[class='js-store']").attr("data-content")
	let json = JSON.parse(data)
	let datas = json.store.page.data.results
	return datas
}

let chords = async (url) => {
	let res = await axios.get(url).then(r => {
		return r.data
	}).catch(e => {
		console.error("Error [Package TUG]: " + e)
		return null
	})
	let $ = cheerio.load(res)
	let output = $("div[class='js-store']").attr("data-content")
	let data = JSON.parse(output)
	try{
		let datas = data.store.page.data.tab_view.wiki_tab.content
		return datas.replace(/(\[\/ch\]|\[\/tab\]|\[tab\]|\[ch\])/gi,"")
	}catch{
		return "Something went wrong."
	}
}

let firstData = async (title) => {
	let res = await searchDatas(title).then(r => {
		return r
	}).catch(e => {
		console.error("Error [Package TUG]: " + e)
		return null
	})
	let i = 0
	while(res[i]["tab_url"] == undefined || res[i]["id"] == undefined){
		i += 1
	}
	let d = res[i]
	let chrds = await chords(d["tab_url"])
	let data = {
		title: d["song_name"],
		artist: d["artist_name"],
		key: d["tonality_name"],
		type: d["type"],
		chords: chrds
	}
	return data
}

let randomData = async (title) => {
	let res = await searchDatas(title).then(r => {
		return r
	}).catch(e => {
		console.error("Error [Package TUG]: " + e)
		return null
	})
	let i = Math.floor(Math.random() * res.length)
	while(res[i]["tab_url"] == undefined || res[i]["id"] == undefined){
		i += Math.floor(Math.random() * res.length)
	}
	let d = res[i]
	let chrds = await chords(d["tab_url"])
	let data = {
		title: d["song_name"],
		artist: d["artist_name"],
		key: d["tonality_name"],
		type: d["type"],
		chords: chrds
	}
	return data
}

module.exports = {
	firstData,
	randomData
}