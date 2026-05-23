# Ultimate Guitar Scraper

A Node.js package for scraping guitar tabs, chords, and other musical content from Ultimate Guitar.

## Features

- 🚀 **Fast & Reliable**: Efficiently searches and fetches content from Ultimate Guitar.
- 🛡️ **Bot Protection Bypass**: Uses `got-scraping` to seamlessly bypass Cloudflare and other bot detection mechanisms.
- 📦 **ES Modules**: Modern ESM-first design.
- 📘 **TypeScript Support**: Fully typed for a better developer experience.
- 🎸 **Versatile**: Supports chords, tabs, bass, ukulele, and more.

## Installation

```bash
npm install ultimate-guitar
```

## Quick Start (ES Modules)

```javascript
import { guitar } from 'ultimate-guitar';

// Setting up
const ug = guitar()

// Search for a song
const result = await search('Hello', 'Adele');
console.log(result);
```

### Alternative Wrapper Usage

```javascript
import { guitar } from 'ultimate-guitar';

const ug = guitar();
const result = await ug.search('Hello', 'Adele');
```

## API Reference

### `search(title, artist?, category?)`

Search for songs on Ultimate Guitar.

**Parameters:**
- `title` (string, required): The song title to search for.
- `artist` (string | number, optional): The artist name or a category ID. If a number is provided that matches a category, it will be treated as the category.
- `category` (number, optional): Filter by content type using the `category` export.

**Available Categories:**
- `category.VIDEO` (100)
- `category.TAB` (200)
- `category.CHORDS` (300)
- `category.BASS` (400)
- `category.POWER` (600)
- `category.DRUMS` (700)
- `category.UKULELE` (800)

#### Usage Examples

**Basic search:**
```javascript
const { guitar } = require("ultimate-guitar")
const ug = guitar()
const result = await search('Hello');
```

**Search with artist:**
```javascript
const { guitar } = require("ultimate-guitar")
const ug = guitar()
const result = await search('Hello', 'Adele');
```

**Search with category filter:**
```javascript
import { guitar } from 'ultimate-guitar';
const ug = guitar()

const result = await ug.search('Hello', 'Adele', ug.category.CHORDS);
```

### `fetch(url_or_response)`

Fetch the actual chord/tab content from a search result.

**Parameters:**
- `url_or_response` (string | GuitarTabs): Either a URL string or a response object from `searchSong`.

#### Usage Examples

```javascript
const { guitar } = require("ultimate-guitar")

const ug = guitar()
const searchResult = await ug.search('Hello', 'Adele');
if (searchResult.status === 200) {
  const chords = await ug.fetch(searchResult.responses[0]);
  console.log(chords.response);
}
```

### `guitar()`

A convenience wrapper that returns an object containing all the library's functions.

```javascript
import { guitar } from 'ultimate-guitar';

const { search, fetch, category } = guitar();
```

## Response Format

### Search Response

```typescript
{
  status: number;
  responses: GuitarTabs[] | string;
}
```

### `GuitarTabs` Interface

```typescript
interface GuitarTabs {
  id: number;
  song_id: number;
  song_name: string;
  artist_name: string;
  type: string;
  version: number;
  votes: number;
  rating: number;
  tab_url: string;
  artist_url: string;
  // ... and many more metadata fields including album/artist covers
}
```

## Changelog

### Version 4.0.0 (May 23, 2026)
- Initial release of the refactored project.
- Modernized build system and dependencies.
- Added `guitar()` wrapper function.

### Version 3.0.0
- **Breaking Change**: Switched project to ES Modules (ESM). Node.js 16+ is now required.
- **Bot Challenge Fix**: Replaced `axios` with `got-scraping` to bypass Cloudflare bot protection.

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
