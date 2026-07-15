# Kids Games

A kid-friendly games site. Currently one category, **Bible Games for Kids**: jigsaw
puzzles for three age groups, and a Ten Commandments matching game — all original
flat-illustration SVG art, no external image dependencies.

## Site structure

- `index.html` — Kids Games hub (category list; currently just "Bible Games for Kids")
- `bible-games.html` — Bible Games category page (age-group puzzles + the Match game)
- `little-explorers.html` / `story-adventurers.html` / `faith-builders.html` — one
  page per age group, each with its own puzzle picker and play area
- `commandments.html` — Ten Commandments matching game
- `puzzles.js` — shared jigsaw engine, scene art, and puzzle data (loaded by the
  three age-group pages)
- `commandments.js` — matching-game logic (loaded by `commandments.html`)
- `styles.css` — shared styling for every page

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
