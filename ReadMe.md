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
const UltimateGuitar = require("ultimate-guitar")

let do_it = async () => {
	const guitar = new UltimateGuitar()
	const data = await guitar.fetch_data(UltimateGuitar.FIRST)
	console.log(data)
}
do_it()
```

---

### Sample code (Random data gathered)
``` nodejs
const UltimateGuitar = require("ultimate-guitar")

let do_it = async () => {
	const guitar = new UltimateGuitar()
	const data = await guitar.fetch_data(UltimateGuitar.RANDOM)
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
``` nodejs
const UltimateGuitar = require("ultimate-guitar")

let do_it = async () => {
	const guitar = new UltimateGuitar()
	const data = await guitar.fetch_data()
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

### Sample Code (get_chords)
``` nodejs
const UltimateGuitar = require("ultimate-guitar")

let do_it = async () => {
	const data = await guitar.get_chords("https://tabs.ultimate-guitar.com/tab/i-belong-to-the-zoo/sana-chords-2405013")
	console.log(data)
}
do_it()
```


### Output (Success)
``` JSON
{
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
  "error": "Error message"
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

### Additional details
> The changes regarding to this package was suggested by Mr. Gem Rey Rañola, one of my colleagues in our local college.
