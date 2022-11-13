# Tabs Ultimate Guitar

### Sample code (First data gathered)
``` nodejs
const tabs = require("ultimate-guitar")

let do_it = async () => {
	let data = await tabs.firstData("song title")
	console.log(data)
}
do_it()
```

### Sample code (Random data gathered)
``` nodejs
const tabs = require("ultimate-guitar")

let do_it = async () => {
	let data = await tabs.randomData("song title")
	console.log(data)
}
do_it()
```

### Output (Sample)
``` JSON
{
	"title": "Song Title",
	"artist": "Artist/Band name",
	"key": "Sample Key",
	"type": "Chords/Tabs"
	"chords": "Chords Gathered"
}
```

> Bugs and errors are still expected to this project, but still trying to improve it and make the error lesser or can handle by the program.

### Credits
1. Lester Navarra
2. John Paul Caigas
3. Mart Anthony Salazar
4. Salvador
5. Earl
6. John Jeremy Antiguo
7. John Roy Lapida Calimlim
8. Mark Kevin Manalo
9. Freecodecamp
10. Tutorialspoint
