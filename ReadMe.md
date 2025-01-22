### Tabs Ultimate Guitar
#### Ryann Kim Sesgundo

---
### Introduction
> The project is not written in typescript, some function and use was changed by the developer.

---
### .searchSong(title: string, artist?: string|null, category?: CATEGORY[import from the package])
```NodeJs
// Here's the sample code
const {searchSong} = require("ultimate-guitar")

(async function(){
	const result = await searchSong("Hello")
	console.log(result)
})

// INFO: You may also use this format

const {searchSong, CHORDS} = require("ultimate-guitar")
(async function(){
	const result = await searchSong("Hello", "Adele", CHORDS)
	// OR
	const result = await searchSong("Hello", null, CHORDS)
})

```

### .fetchChords(url_or_response: string|GuitarTabs)
```NodeJs
// Here's the sample code
const {searchSong, fetchChords} = require("ultimate-guitar")

(async function(){
	const result = await searchSong("Hello")
	const g = await fetchChords(result.responses[0])
	console.log(q)
})

// OR

const {searchSong, fetchChords} = require("ultimate-guitar")

(async function(){
	const result = await searchSong("Hello")
	const g = await fetchChords(
    "https://tabs.ultimate-guitar.com/tab/adele/hello-chords-1775924",
  );
  console.log(q);

```

---
### Status
> The program returns `two status code`, either `200` or `404`. Basically the 200 response is success and 404 is not found or error.
Bugs and errors are still expected to this project, but still trying to improve it and make the error lesser or can handle by the program.

---

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

