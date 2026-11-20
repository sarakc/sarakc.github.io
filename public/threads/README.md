# `items.json` — schema

Each entry in `items.json` is one item on the `/threads` page. Add an item by appending an object to the `items` array, committing, and pushing. Github Pages rebuilds in a minute or two.

Run `npm run check-items` before pushing to catch typos.
Pass a draft path after `--` to validate a preview collection, for example
`npm run check-items -- drafts/threads-paper-candidates.json`.

## Required fields

| field    | type   | notes                                                              |
| -------- | ------ | ------------------------------------------------------------------ |
| `id`     | string | unique slug, kebab-case. Used for `connects:` references.          |
| `type`   | string | one of the types in [`src/components/threads/types.mjs`](../../src/components/threads/types.mjs): `paper`, `thesis`, `book`, `music`, `film`, `project`, `course`, `podcast`, `video`, `art`, `service`, `talk`, `poster`, `post`. The table there sets each type's dot size and colour family. |
| `title`  | string | the title of the item.                                             |
| `added`  | string | ISO date `YYYY-MM-DD`. Newer items sort to the top of the list.    |
| `tags`   | array  | strings; lowercase, kebab-case. The page builds the tag chip row from the union of every item's tags — there is no separate tag list. |

## Optional fields

| field      | type   | notes                                                                |
| ---------- | ------ | -------------------------------------------------------------------- |
| `url`      | string | where it lives on the web, if it lives anywhere. Without one the detail line shows no link — fine for a paper book, a conversation, or a lecture. |
| `creator`  | string | author / artist / host. Italicized under the title.                  |
| `year`     | number | four-digit publication or release year: paper publication, album release, film release, and so on — never the year it came into your life. Shown in graph labels, detail lines, and the list. It is a weak similarity signal but does not create a time axis or directly position a node. |
| `mine`     | boolean | your own work. Talks, posters, theses, courses, service and projects are yours unless `mine: false`; papers, books, posts and everything else are things you love unless `mine: true`. Own work is drawn in ink; loved things take their type's colour. |
| `note`     | string | your one-paragraph reason for including it. The voice that does the actual work — what made this useful, and to whom. |
| `venue`    | string | short venue or host: `WMT`, `SCiL`, `University of Malta`. Shown after the year in the graph label and in the detail line. |
| `venueShort` | string | the label form of a long venue (`OSU` for `Ph.D. dissertation, The Ohio State University`). The graph label uses it; the detail line keeps the full `venue`. Without it, a long venue is cut at a word. |
| `project`  | string or array | kebab-case key shared by every item presenting the same work — a paper, its posters, its talks. A list (`["dissertation", "evidence-augmented-mt"]`) puts an item in more than one; sharing any one key counts. It is a strong similarity signal. A talk or poster whose normalized title exactly matches its paper is still a separate searchable item, but is drawn as a small orbit around the paper rather than as a standalone node. |
| `people`   | array  | co-authors and collaborators, excluding Sara. Rare names count for more than names on everything. An item that isn't yours and has no `people` counts its `creator` instead, so two albums by one artist sit together. |
| `languages`| array  | languages the work studies, lowercase kebab-case: `maltese`, `mandarin`, `southern-quechua` (always Southern Quechua, not bare Quechua). |
| `methods`  | array  | how the work was done, kebab-case: `llm-evaluation`, `computational-modeling`. |
| `genres`   | array  | for books, music and the like, what `methods` is for research: `poetry`, `ambient`, `essay`. Keeps genre words out of `tags`, so topics stay shared between your work and the things you love. |
| `community`| array  | the research community of the venue: `computational-linguistics`, `morphology`, `language-documentation`. |
| `connects` | array  | ids of other items this is explicitly tied to. Drawn as an accent-blue edge in the graph view. Auto-edges from shared tags appear automatically; only use `connects:` for the strong "this led me to that" links. |

## Research and everything else

Both live in the same file and the same graph, and everything is on show by
default. Own work (`mine`) is ink; anything else takes its type's colour.
When the collection holds both, a wordless switch of two dots (ink and
colour) appears beside `network · list`: pressed, it shows research only.
Bridges between the two come from shared topic `tags` and from `connects`;
give every non-CV item at least one topic your research also uses.

## Similarity

`npm run build-similarity -- <items file>` scores every pair of items and
writes `<items file name>.similarity.json` beside it; the page uses those
edges when the file exists and shared tags when it doesn't. Signals and
weights live in [`src/components/threads/similarity.mjs`](../../src/components/threads/similarity.mjs):
same `project` (4), tags (3), title wording (2.5), people (2.5),
languages (2), methods (1.5), genres (1.5), community (1), explicit `connects` (3), year
closeness (0.75). Shared values count more the rarer they are. The file holds
each item's eight strongest pairs above a score of 0.2, plus its nearest
`weak` ones below it; the page draws each visible item's three strongest.
Rebuild after editing items: `check-graph` fails while the file is out of date.

The build also lists pairs whose titles read like the same work but whose
`project` keys disagree — the cue to add or fix a key.

Research types: `talk`, `poster`, `thesis`, `course`, `project`, `service`
alongside `paper`. A talk or poster with exactly its paper's title is drawn as
a small ring orbiting the paper rather than a node of its own; `check-items`
lists the orbits it finds.

## Example

```json
{
  "id": "limon-hurting-kind",
  "type": "book",
  "title": "The Hurting Kind",
  "creator": "Ada Limón",
  "url": "https://www.adalimon.net/the-hurting-kind",
  "year": 2022,
  "added": "2026-04-12",
  "tags": ["poetry", "attention"],
  "connects": ["allusionist-mixed-up"],
  "note": "Read on a long flight. The line about the donkeys is the one that stuck."
}
```

## Type → color

The colored dot in the list and the node fill in the graph come from `type`.
Sara's own work is ink; loved things use the type/form colors below. Every
solid dot carries a subtle `--page-ink` edge.

| form | type | token | value |
| --- | --- | --- | --- |
| read | `book` | `--t-book` | `#f2c744` |
| read | `paper` | `--t-paper` | `#c99a1e` |
| listen | `podcast` | `--t-podcast` | `#b49ae4` |
| listen | `music` | `--t-music` | `#7f5fc4` |
| watch | `video` | `--t-video` | `#4f9bd1` |
| watch | `film` | `--t-film` | `#2e6fae` |
| look | `art` | `--t-art` | `#5fc48c` |
| post | `post` | `--t-post` | `#ff7a66` |

Hue encodes **form**, shade encodes **type** — two types you take in the same
way share a hue, so the dots group before you read a single label. Size and
fill encode the tier defined in `types.mjs`; there are no separate type cards.

Add a new type once in the `TYPES` table in
[`src/components/threads/types.mjs`](../../src/components/threads/types.mjs).
Add a `--t-<type>` token in [`src/assets/base.css`](../../src/assets/base.css)
only when the type needs a color distinct from its form's base hue.

## Adding items the easy way

`npm run add-item` opens [`tools/add-item.html`](../../tools/add-item.html): a
form with type swatches, tag autocomplete from tags already in use, a picker
for `connects`, live validation matching `check-items.mjs`, and a preview of
how the entry will look. In Chrome or Edge it saves straight back to this
file; elsewhere it hands you a download.

Then:

```
npm run build-similarity   # the lines between items; rebuild after any edit
npm run check-items        # schema
npm run check-graph        # the layout still works, and the similarity file is current
```
