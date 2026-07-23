# Kids Games

A kid-friendly games site with two categories: **Bible Games for Kids** (jigsaw
puzzles for three age groups, a Ten Commandments matching game, and a Bible
crossword, all original flat-illustration SVG art, no external image
dependencies) and **Toddler Games** (four behavior and emotional-regulation
games for ages 2-5).

## Site structure

```
/index.html                              Kids Games hub
/bible/index.html                        Bible Games category page
/bible/puzzle-little-explorer/index.html    picker, ages 2-5
/bible/puzzle-little-explorer/<puzzle>.html one page per puzzle
/bible/puzzle-story-adventurer/index.html   picker, ages 6-8
/bible/puzzle-story-adventurer/<puzzle>.html
/bible/puzzle-faith-builders/index.html     picker, ages 9-12
/bible/puzzle-faith-builders/<puzzle>.html
/bible/ten-commandments-match.html       matching game
/bible/bible-crossword.html              crossword game (3 puzzles: Jesus, Noah, Moses)
/toddler/index.html                      Toddler Games category page
/toddler/stop-and-go.html                impulse control (wait for green, then tap)
/toddler/feelings-match.html             emotional vocabulary matching game
/toddler/balloon-breathing.html          slow-breathing calm down game
/toddler/good-choice.html                behavior scenario game
/puzzles.js                              shared jigsaw engine, scene art, puzzle data
/commandments.js                         matching-game logic
/crossword.js                            crossword engine (grid, clues, on-screen keyboard)
/toddler.js                              logic for all four toddler games
/styles.css                              shared styling for every page
/sitemap.xml                             lists all public pages
/robots.txt                              allows crawling, points to the sitemap
```

`puzzles.js` is loaded by every picker and puzzle page; which one it acts as is read
from `<body data-group="...">` (picker) or `<body data-puzzle="...">` (a single
puzzle), both set in the page's own HTML. `commandments.js` is only loaded by
`ten-commandments-match.html`. `crossword.js` is only loaded by
`bible-crossword.html` and builds its grid/clues from a `CROSSWORDS` object
defined at the top of the file. `toddler.js` is loaded by all four toddler game
pages and reads which game to run from `<body data-game="...">`.

## SEO

Every page follows the same pattern: SEO meta tags in `<head>` (unique title, meta
description, canonical, Open Graph, Twitter card, plus JSON-LD structured data such as
BreadcrumbList / Game / FAQPage), a single `<h1>` and a short description, then the
primary content (game or card grid), then a `.seo-content` block below it with
original copy about the story, how to play, and an FAQ. Keep `sitemap.xml` in sync
when adding or removing pages.

## Running it

No build step or server required. Just open `index.html` in any modern browser
(double-click it, or right-click → Open With → your browser).

## What's inside

- **Little Explorers (ages 2-5):** 5 puzzles, 4-6 pieces each
- **Story Adventurers (ages 6-8):** 5 puzzles, 9-16 pieces each
- **Faith Builders (ages 9-12):** 5 puzzles, 25-35 pieces each
- **Ten Commandments Match:** a tap-to-match game for all ages (Exodus 20)
- **Bible Crossword:** 3 word puzzles (Jesus, Noah, Moses) for ages 5+, tap clues and spell answers on an on-screen keyboard
- **Stop and Go:** tap only when the light is green, practicing waiting and impulse control
- **Feelings Match:** a tap-to-match game pairing faces to feelings
- **Balloon Breathing:** a guided slow-breathing calm down activity
- **Good Choice:** short behavior scenarios with two responses to pick from

Puzzle pieces are draggable (mouse and touch) and arranged in trays on either side
of the grid, sized so every piece fits without a bottom-tray overflow on typical
screens.
