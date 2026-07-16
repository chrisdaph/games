# Puzzle images

Drop a real picture here to replace a puzzle's built-in flat SVG art. In
`puzzles.js`, add an `img` field to that puzzle pointing at the file, e.g.

```js
{ id:'ark', slug:'noahs-ark', ... svg:svgArk, img:'../../images/noahs-ark.jpg' },
```

`puzzleImageUrl(p)` uses `p.img` when present and falls back to `svg` otherwise,
so puzzles without an image keep working. The `../../images/…` prefix is required
because every puzzle/picker page sits two folders deep (e.g.
`/bible/puzzle-little-explorer/noahs-ark.html`).

## Image requirements

- **Aspect ratio: 4:3 (landscape).** The board slices the picture on a 4:3 grid,
  so anything else gets stretched. Crop to 4:3 first.
- **Size:** at least ~1200×900 px (bigger is fine — it is scaled down, so more
  pixels = crisper). JPG or PNG.
- **Rights:** only use images you own, have licensed, or that are public
  domain / CC0. Do not use pictures found through a web search unless the
  licence clearly allows reuse.

## Expected filenames (one per puzzle)

| Puzzle | Age group | File to add here |
|---|---|---|
| Noah's Ark | Little Explorers | `noahs-ark.jpg` |
| Baby Moses in the Basket | Little Explorers | `baby-moses.jpg` |
| The Good Shepherd | Little Explorers | `good-shepherd.jpg` |
| Jesus Blesses the Children | Little Explorers | `jesus-blesses-children.jpg` |
| Jesus Calms the Storm | Little Explorers | `jesus-calms-storm.jpg` |
| David and Goliath | Story Adventurers | `david-and-goliath.jpg` |
| Jonah and the Big Fish | Story Adventurers | `jonah-and-the-fish.jpg` |
| Daniel in the Lions' Den | Story Adventurers | `daniel-lions-den.jpg` |
| The Good Samaritan | Story Adventurers | `good-samaritan.jpg` |
| Zacchaeus in the Tree | Story Adventurers | `zacchaeus.jpg` |
| Crossing the Red Sea | Faith Builders | `crossing-red-sea.jpg` |
| The First Christmas | Faith Builders | `first-christmas.jpg` |
| Feeding the 5,000 | Faith Builders | `feeding-the-5000.jpg` |
| The Last Supper | Faith Builders | `last-supper.jpg` |
| The Empty Tomb | Faith Builders | `empty-tomb.jpg` |

Filenames match each puzzle's `slug`, so the `img` path is always
`../../images/<slug>.jpg`.
