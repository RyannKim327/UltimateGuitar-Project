# Ultimate Guitar Scraper

A Node.js package for scraping guitar tabs, chords, and other musical content from Ultimate Guitar.

## Category

**Music & Audio** - Guitar Tabs & Chords Scraper

This package falls under the music and audio category, specifically designed for:
- 🎸 Guitar enthusiasts and musicians
- 🎵 Music education and learning
- 📝 Tab and chord collection tools
- 🔍 Music content aggregation

## Installation

```bash
npm install ultimate-guitar
```

## Quick Start (ES Modules)

```javascript
import { searchSong, fetchChords, category } from 'ultimate-guitar';

// Search for a song
const result = await searchSong('Hello', 'Adele');
console.log(result);
```

## API Reference

### searchSong(title, artist?, category?)

Search for songs on Ultimate Guitar.

**Parameters:**
- `title` (string, required): The song title to search for
- `artist` (string, optional): The artist name
- `category` (CATEGORY, optional): Filter by content type

**Available Categories:**
- `VIDEO` (100): Video lessons
- `TAB` (200): Guitar tabs
- `CHORDS` (300): Guitar chords
- `BASS` (400): Bass tabs
- `POWER` (600): Power tabs
- `DRUMS` (700): Drum tabs
- `UKULELE` (800): Ukulele chords

#### Usage Examples

**Basic search:**
```javascript
import { searchSong } from 'ultimate-guitar';

const result = await searchSong('Hello');
console.log(result);
```

**Search with artist:**
```javascript
import { searchSong } from 'ultimate-guitar';

const result = await searchSong('Hello', 'Adele');
console.log(result);
```

**Search with category filter:**
```javascript
import { searchSong, category } from 'ultimate-guitar';

// Search for chords only
const result = await searchSong('Hello', 'Adele', category.CHORDS);
console.log(result);
```

**Search with category but without artist:**
```javascript
import { searchSong, category } from 'ultimate-guitar';

const result = await searchSong('Hello', null, category.CHORDS);
// OR
const result2 = await searchSong('Hello', category.CHORDS);
console.log(result);
```

### fetchChords(url_or_response)

Fetch the actual chord/tab content from a search result.

**Parameters:**
- `url_or_response` (string | GuitarTabs): Either a URL string or a response object from searchSong

#### Usage Examples

**Using search result object:**
```javascript
import { searchSong, fetchChords } from 'ultimate-guitar';

const searchResult = await searchSong('Hello', 'Adele');
if (searchResult.status === 200) {
  const chords = await fetchChords(searchResult.responses[0]);
  console.log(chords);
}
```

**Using direct URL:**
```javascript
import { fetchChords } from 'ultimate-guitar';

const chords = await fetchChords(
  'https://tabs.ultimate-guitar.com/tab/adele/hello-chords-1775924'
);
console.log(chords);
```

## Response Format

### Search Response

```javascript
{
  "status": 200,
  "responses": [
    {
      "id": 1775924,
      "song_id": 1626522,
      "song_name": "Hello",
      "artist_id": 20519,
      "artist_name": "Adele",
      "type": "Chords",
      "version": 1,
      "votes": 2103,
      "difficulty": "",
      "rating": 4.84306,
      "tonality_name": "Fm",
      "tab_url": "https://tabs.ultimate-guitar.com/tab/adele/hello-chords-1775924",
      "artist_url": "https://www.ultimate-guitar.com/artist/adele_20519"
      // ... additional metadata
    }
    // ... more results
  ]
}
```

### Fetch Response

```javascript
{
  "status": 200,
  "response": "[Intro]\nEm  G/D  D  C\n\n[Verse]\n   Em G/D  D C\nHello, it's me.\n..."
}
```

## Example Output

When you run a search for "Hello Adele", you'll get results like:

```javascript
// Search results include multiple versions and types:
// - Chords (versions 1, 2, 3)
// - Guitar Tabs (versions 1, 2) 
// - Bass Tabs
// - Video lessons
// - Ukulele Chords
// - Official tabs

// Each result contains:
// - Song and artist information
// - Tab type and difficulty
// - User ratings and votes
// - Direct links to content
// - Album and artist artwork
```

When you fetch the actual content, you'll get the formatted chords/tabs:

```
[Intro]
Em  G/D  D  C

[Verse]
   Em G/D  D C
Hello, it's me.
       Em         G/D              D                 C          Em  G/D   D    C
I was wondering if after all these years you'd like to meet, to go over everything
...
```

## Status Codes

The API returns standard HTTP status codes:

- **200**: Success - Request completed successfully
- **404**: Not Found - Song or content not found
- **500**: Server Error - Internal server error

## Error Handling

```javascript
import { searchSong } from 'ultimate-guitar';

try {
  const result = await searchSong('NonexistentSong');
  if (result.status === 404) {
    console.log('Song not found');
  }
} catch (error) {
  console.error('Error:', error.message);
}
```

## TypeScript Support

This package includes TypeScript definitions. Import types as needed:

```typescript
import { searchSong, fetchChords, category, GuitarTabs } from 'ultimate-guitar';

const result = await searchSong('Hello', 'Adele');
```

## Changelog

### Version 3.0.0 (May 23, 2026)
- **Breaking Change**: Switched project to ES Modules (ESM). Node.js 16+ is now required.
- **Bot Challenge Fix**: Replaced `axios` with `got-scraping` to bypass Cloudflare bot protection.
- Improved reliability of network requests using browser-mimicking TLS fingerprints.

### Version 2.0.5 (January 26, 2026)
- Updated dependencies for better security
- Improved error handling
- Enhanced TypeScript support
- Fixed category filtering issues
- Performance optimizations

### Version 2.0.0
- Complete rewrite in TypeScript
- Improved API design
- Better error handling
- Added category filtering
- Enhanced search capabilities

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

[GitHub Repository](https://github.com/RyannKim327/UltimateGuitar-Project)

## Issues

Report bugs and feature requests at: [GitHub Issues](https://github.com/RyannKim327/UltimateGuitar-Project/issues)

---

**Note:** This package scrapes content from Ultimate Guitar. Please respect their terms of service and use this package responsibly.
