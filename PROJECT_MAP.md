# Project map

Where things live in this repo, so you don't have to go rediscovering it.

Run it locally with `npm run serve` → <http://localhost:8080>. The `/threads` page is at
<http://localhost:8080/#/threads> (hash routing, so the `#` matters).

To preview the paper candidates without changing the live collection, open
<http://localhost:8080/#/threads?preview=papers>. This preview works only in the
development server; production builds always use `public/threads/items.json`.

## Site shell

| file | what it does |
| --- | --- |
| `src/main.js` | app entry; mounts `App.vue`, installs the router, imports `assets/main.css` |
| `src/App.vue` | the top nav (`home` · `cv`) plus `<router-view />`. `/threads` is deliberately absent — it's reached by the glyph. `home` hides itself on `/threads`, which has its own "back to website" link |
| `src/router/index.js` | routes: `/` → `HomeView`, `/threads` → `ThreadsView`. Hash history (GitHub Pages friendly) |
| `src/assets/base.css` | **the palette.** One site token set (`--page-*`, `--accent-blue`, `--page-sans`/`--page-serif`, `--page-max`/`--page-gutter`), then the `--t-*` type colours; legacy Vue-scaffold tokens below. See `DESIGN.md` |
| `src/assets/main.css` | imports `base.css`, plus global link styles |
| `vue.config.js` | build config; `publicPath: '/'`, page title |

## Home page

| file | what it does |
| --- | --- |
| `src/components/HomeView.vue` | the whole landing page — header photo, name, and the four About / Research / Resume / Contact blocks |
| `src/components/WelcomeItem.vue` | layout wrapper for one of those blocks (icon + heading + slot) |
| `src/components/icons/*.vue` | the inline SVG icons used by those blocks |
| `src/assets/*.jpg`, `*.png`, `*.svg` | photos and logos (`montana.jpg` is the header image, `osu-brutus.jpg` is the Brutus easter egg link) |

## `/threads` — the recommendations page

| file | what it does |
| --- | --- |
| `src/components/ThreadsView.vue` | page shell: fetches `items.json`, holds the tag filter, detail level, hover and selection; keeps `?item=` in step with the pin; opens `/` search |
| `src/components/threads/GraphView.vue` | renders the graph at window size — camera (zoom, pan, fit), screen-space edges and labels, hover and selection states, the `− + fit` strip |
| `src/components/threads/graph.mjs` | the layout maths: edge building and per-item edge choice, ranking and detail steps, force settling shaped to the window, brushstroke paths, title wrapping and short titles, label placement in the world and on screen. Pure, and tested by `check-graph` |
| `src/components/threads/similarity.mjs` | the similarity engine: signals, weights, candidate neighbours, reasons. Pure |
| `src/components/threads/types.mjs` | **the type table**: each type's default owner, form, tier, rank weight, ring/solid and noun; `markFor` (dot colour and size) and `detailMeta` (the detail line). Add a type here. Pure |
| `src/components/threads/orbits.mjs` | which talks and posters orbit their paper (`findOrbits`), works vs satellites (`splitWorks`), where the rings sit (`orbitPoints`), title folding. Pure |
| `src/components/threads/camera.mjs` | `frameCamera`: where the camera goes when an item is pinned. Pure |
| `src/components/threads/search.mjs` | `searchItems`: the `/` search matching and ranking. Pure |
| `src/components/threads/SearchBox.vue` | the `/` search input and its result rows |
| `scripts/build-threads-similarity.mjs` | writes `<items>.similarity.json` beside an items file. `npm run build-similarity -- <file>` |
| `drafts/threads-research.json` | the research atlas drafted from the CV — every paper, talk, poster, thesis, course and service role. Preview at `#/threads?preview=research` (dev only) |
| `src/components/threads/DetailLine.vue` | the one line of detail under the graph — hover previews, click pins |
| `src/components/threads/DetailRail.vue`, `TypeCards.vue` | **unused since Ink (2026-11-15)** — kept until the design settles |
| `src/components/threads/ItemCard.vue` | one row of the list view: year and title, opens to show the detail |
| `src/components/threads/TagChips.vue` | the topic line — tags as plain words |
| `src/components/threads/ThreadsGlyph.vue` | the network glyph on the home page that opens `/threads` |
| `public/threads/items.json` | **the content.** One object per recommendation |
| `public/threads/README.md` | the `items.json` schema — required/optional fields (`mine`, `year`), worked example; the type list lives in `types.mjs` |
| `scripts/check-items.mjs` | schema validator. `npm run check-items` |
| `scripts/check-graph.mjs` | layout checks against the real data. `npm run check-graph` |
| `scripts/check-threads.mjs` | unit checks for the pure modules (types, orbits, time ranks, camera, level reveal, search). `npm run check-threads` |
| `tools/add-item.html` | the item editor. `npm run add-item` |
| `inspiration/` | reference images and sketches behind the `/threads` design |

## Build & deploy

| path | what it does |
| --- | --- |
| `package.json` | scripts: `serve`, `build`, `lint`, `check-items`, `check-graph`, `check-threads`, `build-similarity` |
| `.github/` | GitHub Pages workflow |
| `dist/` | build output — generated, not hand-edited |
| `archive/` | old notes kept for reference; nothing here is live |

## Adding a recommendation

1. `npm run add-item` — opens the editor, saves back to `public/threads/items.json`.
   (Or edit the JSON by hand; schema is in `public/threads/README.md`.)
2. `npm run check-items` and `npm run check-graph`.
3. Commit and push — Pages rebuilds in a minute or two.

## Design

`DESIGN.md` at the root holds the palette, type, and the reasoning behind the
`/threads` page. Read it before changing anything visual.

`BACKLOG.md` holds ideas for later — abstract embeddings for similarity,
proposed `/threads` features, and data in the research draft still to confirm.
