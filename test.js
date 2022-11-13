const a = require("./index")

//let b = a.searchDatas("yellow")
let x = async () => {
	let c = await a.randomData("yellow")
	let d = await a.firstData("yellow")
	console.log(c)
	console.log(d)
}
x()