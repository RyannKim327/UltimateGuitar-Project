const a = require("./index")

//let b = a.searchDatas("yellow")
let x = async () => {
	let e = await a.getChords("https://tabs.ultimate-guitar.com/tab/coldplay/yellow-chords-114080")
	console.log(e)
}
x()