### Tabs Ultimate Guitar
#### Ryann Kim Sesgundo

---

### Disclaimer
> I didn't own the entire code, which is actually came from Lester Navarra, the one who taught me how to scrape this website.

---

### What's new!!!
1. Added URL for random and first data
2. Added all data
3. Added get chords for customized URL

---

### Sample code (First data gathered)
``` nodejs
const tabs = require("ultimate-guitar")

let do_it = async () => {
	let data = await tabs.firstData("song title")
	console.log(data)
}
do_it()
```

---

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
	"type": "Chords/Tabs",
	"url": "Url Link",
	"chords": "Chords Gathered"
}
```

---

### Sample Code (All Data)
```NodeJS
const tabs = require("ultimate-guitar")

let do_it = async () => {
	let data = await tabs.allData("song title")
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
	"type": "Chords/Tabs",
	"url": "Url Link"
}
```

---

### Sample Code (getChords)
```NodeJS
const tabs = require("ultimate-guitar")

let do_it = async () => {
	let data = await tabs.getChords("song url")
	console.log(data)
}
do_it()
```

### Output (Success)
``` JSON
{
  "resultCode": 200,
  "song_name": "Song Name",
  "artist_name": "Artist",
  "type": "Chords, Tabs, Base or any related instrument",
  "rating": 3.14,
  "tonality_name": "Key",
  "username": "The one who upload.",
  "chords": "chords here"
}
```

### Output (Error)
``` JSON
{
  "resultCode": 404,
  "message": "Error message"
}
```

> Bugs and errors are still expected to this project, but still trying to improve it and make the error lesser or can handle by the program.

### Credits
1. Lester Navarra
2. John Paul Caigas
3. Mart Anthony Salazar
4. Salvador
5. Earl Shine Sawir
6. John Jeremy Antiguo
7. John Roy Lapida Calimlim
8. Mark Kevin Manalo
9. Freecodecamp
10. Tutorialspoint