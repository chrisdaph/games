# Kids Games

A kid-friendly games site. Currently one category, **Bible Games for Kids**: jigsaw
puzzles for three age groups, and a Ten Commandments matching game — all original
flat-illustration SVG art, no external image dependencies.

## Site structure

```
/index.html                              Kids Games hub
/bible/index.html                        Bible Games category page
/bible/puzzle-little-explorer/index.html    picker — ages 2–5
/bible/puzzle-little-explorer/<puzzle>.html one page per puzzle
/bible/puzzle-story-adventurer/index.html   picker — ages 6–8
/bible/puzzle-story-adventurer/<puzzle>.html
/bible/puzzle-faith-builders/index.html     picker — ages 9–12
/bible/puzzle-faith-builders/<puzzle>.html
/bible/ten-commandments-match.html       matching game
/puzzles.js                              shared jigsaw engine, scene art, puzzle data
/commandments.js                         matching-game logic
/styles.css                              shared styling for every page
```

`puzzles.js` is loaded by every picker and puzzle page; which one it acts as is read
from `<body data-group="...">` (picker) or `<body data-puzzle="...">` (a single
puzzle), both set in the page's own HTML. `commandments.js` is only loaded by
`ten-commandments-match.html`.

## Running it

No build step or server required. Just open `index.html` in any modern browser
(double-click it, or right-click → Open With → your browser).

## What's inside

- **Little Explorers (ages 2–5):** 5 puzzles, 4–6 pieces each
- **Story Adventurers (ages 6–8):** 5 puzzles, 9–16 pieces each
- **Faith Builders (ages 9–12):** 5 puzzles, 25–35 pieces each
- **Ten Commandments Match:** a tap-to-match game for all ages (Exodus 20)

Puzzle pieces are draggable (mouse and touch) and arranged in trays on either side
of the grid, sized so every piece fits without a bottom-tray overflow on typical
screens.
