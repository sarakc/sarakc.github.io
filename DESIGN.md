# Design decisions

What the site looks like and why. Read this before changing anything visual;
update it when a decision changes. Mirrored into Claude's project memory.

Companion docs: [`PROJECT_MAP.md`](PROJECT_MAP.md) for where files live,
[`public/threads/README.md`](public/threads/README.md) for the `items.json` schema.

## One register

**The home page is canonical for the site, and `/threads` follows it.**
White ground, indigo `#2c3e50` text, `#29a9ff` blue for links, and the
system sans stack `body` has always used. Any new page defaults to this.

Decided 2026-09-03, superseding the 2026-09-02 rule that let `/threads`
(then `/threads`) diverge into its own typographic register. That divergence
gave the page three faces — a serif display, IBM Plex Sans, and IBM Plex
Mono for every label — and the result read as a separate publication
bolted to the side of the site rather than a page of it.

What survives from the divergence, because it earns its place:

- **The serif, on item titles only.** Newsreader still sets the title of
  each item in the list and the rail. It is the one place the page is
  presenting *someone else's work*, and the shift in voice is doing real
  work there.
- **The type colours.** The `--t-*` dots are informational — they encode
  form and type — so they stay exactly as they were. (Since 2026-11-16 they
  colour only loved things; Sara's own work is ink. See "Encoding and
  navigation".)
- **The whole structure.** Graph, rail, tag chips, list. None of that
  changed; only its type and scale did.

What went: the mono utility face, every uppercase-and-letter-spaced label,
the 9.5–10px type sizes, and the duplicate `--web-*` token set. Labels are
now sentence-case sans at 12.5–13px, and the page draws from the same
tokens as the home page.

## Ink — the current /threads (2026-11-15)

**Minimal and elegant, with as little text as possible.** Three directions were
compared in [`inspiration/threads-minimal-options.html`](inspiration/threads-minimal-options.html)
(A · Ink, B · Wash, C · Timeline) after a busier shape-and-colour study
([`inspiration/threads-editorial-atlas.html`](inspiration/threads-editorial-atlas.html))
read as too much text. Ink was chosen.

- **No visible heading.** "Threads" is a screen-reader-only `h1`. The shared
  top nav carries `← website` on the left, `cv` on the right.
- **One line of controls:** tags as plain words (most used first, eight shown,
  then `more`), and `network · list` on the right. No counts, no type cards,
  no chips, no `all`. The active tag is underlined and carries a `×`.
- **Monochrome graph.** Hollow ink circles, hairline curved edges, a ruled grid
  at 3.5% and nothing else beneath. Blue appears only on what you touch: the
  hovered node fills ink, its edges light blue; the selected node fills blue.
  Colour fields, sweeps and type-coloured dots are gone.
- **Labels carry the whole title and the year.** The year sits on its own line
  in the sans at 600 weight, above the full title in the serif, wrapped at 30
  characters. No truncation. Items without a `year` show the title alone.
- **The whole label is a target.** Hovering or clicking a title or year acts
  on its node, not just the dot.
- **One detail line under the graph** replaces the rail: title, then
  creator · type · year · `open ↗`. Empty at rest; hover previews (faded if
  something else is pinned); click pins and adds the note. It is a fixed band
  under the graph (see Zoom), so pointing at something never moves the graph.
- **The list is year and title.** Clicking a row opens the same detail.

This supersedes the rail (decision 10), the type cards (9), the colour fields
and sweeps (3) and the type-coloured dots. *Partly reversed 2026-11-16 by
"Encoding and navigation" below: dots carry realm, tier and time again, and
loved things draw with the `--t-*` tokens; labels, edges and the ground stay
Ink.*

## Encoding and navigation (2026-11-16)

The atlas should read before you read a label, and any one item should be a
link away. It must hold for a 1962 novel, an album or a podcast as well as a
2024 workshop paper. Spec:
[`docs/superpowers/specs/2026-11-15-threads-atlas-navigation-and-encoding-design.md`](docs/superpowers/specs/2026-11-15-threads-atlas-navigation-and-encoding-design.md).

- **One type table**, [`src/components/threads/types.mjs`](src/components/threads/types.mjs).
  Each type has a default owner (`mine`), a form (read, listen, watch, look,
  post), a tier (1–3), a rank weight for the detail toggle, ring or solid,
  and a plain noun. A new type is one row; `check-items` reads its list from
  there. An item's `mine: true|false` overrides the default.
- **Colour = realm.** Sara's own work is ink. A loved thing takes its type's
  `--t-*` token, or its form's base hue when the type has none (`--t-book`,
  `--t-podcast`, `--t-video`, `--t-art`, `--t-post`). Colour sits on the dots
  only; labels, edges and leaders stay ink. Solid dots carry a 0.75px ink
  edge at 35% so pale hues (`--t-book`) still read as dots.
- **Size and fill = tier.** Tier 1 (a finished work you'd hand someone: paper,
  thesis, book, album, film) is a 7px solid dot; tier 2 (ongoing or
  container-shaped: project, course, podcast, video, art) 5px solid; tier 3
  (a single appearance or short piece: talk, poster, service, post) a 3.5px
  dot at half opacity (a ring until 2026-11-16). Radius no longer follows
  degree.
- **Position = similarity, and only that.** Items settle where their
  similarity links put them, so clusters are topics, not eras. There is no
  time axis and no year marks. (A gentle left-to-right year pull ran
  2026-11-15 to 2026-11-17; Sara dropped it because it set unrelated work
  side by side — the 2022 ComputEL paper beside the 2013 INNET fellowship —
  and still put some 2020 work after 2022 work.) Year stays one weak signal
  inside the similarity score (0.75), and every label still shows its year.
  Year is always publication or release year, never when Sara met the thing.
- **Opacity = focus**, and nothing else. Nothing fades with age.
- **Blue = touch.** A pinned dot gets a 2px blue halo 3px outside its edge;
  hover gets the same halo in ink at 50%. Fills no longer change on hover or
  pin, because the fill carries realm. Edges and leaders light blue as before.
- **A presentation orbits its paper.** A tier-3 item with exactly the title
  (case, accents and punctuation aside) of a tier-1 or tier-2 item in the
  same realm is drawn as a 2.5px ring in a constant-size arc just outside
  that dot, not as a node of its own — including at another venue or year
  (MELT 2025, Tsukuba 2026). The research draft draws 28 works for 35 items.
  This *refines* "every presentation is its own node": each one is still its
  own item — pinnable, searchable, linkable, a row in the list — but the
  drawing shows one work. Hovering or pinning the family labels each ring with
  its kicker (`2024 · WMT @ EMNLP`); focusing a ring focuses its paper's
  family. `check-items` prints the orbits it finds.
- **A link to an item:** `#/threads?item=<id>` opens with that item pinned
  and framed, clearing a topic if one hides it (a pin is on show at every zoom).
  Pinning writes `item=` in place and unpinning removes it (`router.replace`),
  so Back leaves the page. An unknown id is dropped quietly.
- **`/` search.** A magnifier before the zoom, or `/`, opens one
  input at the top left (`find…`, hairline underline). Every word typed must
  start a word of the title, creator, venue, tags, people or year, over the
  whole collection; title matches rank first, then tier, then newest. Six
  rows at most, in the label's own format; arrowing or pointing previews,
  Enter pins. Escape closes; a second Escape unpins.
- **Pinning frames the neighbourhood.** The camera zooms just enough to frame
  the pinned dot and its neighbours (80px margin, never out past the fit,
  never in past 2.5× the fit) — or doesn't move if they are already in view at
  about that zoom. Never on hover; unpinning never moves the camera. Reduced
  motion jumps instead of tweening.
- **Text that isn't research-shaped.** The kicker is `year · venue`, else
  `year · creator`, else the year. The detail line is
  `creator · venue · year`, with the type's noun standing in for a missing
  venue (never the raw type id), left out when the creator already names the
  role.

## Before launch (2026-11-16)

- **The research atlas is the live collection.** `public/threads/items.json`
  is the CV-drafted research atlas (copied from `drafts/threads-research.json`,
  which is now superseded). The old example collection is gone: its six items
  were placeholders, not Sara's, and must never reach the graph.
  `check-threads` uses a made-up fixture, `scripts/fixtures/small-undated.json`.
- **Tags read as words.** `tags.mjs` turns `responsible-ai` into
  "responsible AI" and keeps `low-resource` hyphenated. A collection may add a
  top-level `"tags": { "primary": [...], "labels": {...} }`: primary tags lead
  the topic line in that order and are all shown before `more`.
- **Short venues.** An item's `venueShort` is the label's form of a long venue
  ("Ph.D. dissertation"); the detail line keeps the full `venue`.
- **Finished works are always named.** A tier-1 dot whose label fits nowhere
  beside it may stand its label off on a leader up to 210px away (others stop
  at 90px), so a dense cluster never leaves the dissertation unlabelled.
- **The list names the venue when a title repeats**, so a paper and its
  poster no longer read as duplicate rows.
- **The door says Threads** (its tooltip and label said "Connections").
- **An item can belong to more than one project.** `project` takes one key
  or a list; sharing any one key is the "same work" similarity signal.
- **Southern Quechua, not Quechua.** Language values use `southern-quechua`
  (shown "Southern Quechua") unless Sara says a piece covered Quechua broadly.
- **The retag is applied.** 36 items, 35 topics, nine primary (morphology,
  analogy, language contact, machine translation, LLMs, mechanistic
  interpretability, low-resource, responsible AI, language documentation).
  The current paper is its own node, "in progress" in place of a year.
- **The list reads like the CV (2026-11-17).** `cvGroups` (cvgroups.mjs)
  sorts Sara's own work under the CV's sections in the CV's order —
  education, research experience, publications, invited talks, conference
  presentations, teaching, leadership, policy & service — newest first, work
  in progress leading with "in progress" after its title in place of a year.
  A talk is invited when it says `invited: true` or its byline says
  "invited". Things beyond the CV follow in groups by kind (books, music, …).
  Group names are small dim sans, lowercase like the rest of the page.
- **The home page is one window, menu included (2026-11-17).** The menu bar
  added with /threads sat above a page that was already 100vh tall, so home
  scrolled by the menu's 41px. `#app` is a full-height column on home and the
  page takes what the menu leaves (App.vue). On phones the content is taller
  than the screen and still scrolls.
- **No timeline (2026-11-17).** The year pull and the faint first/last year
  marks are gone; layout is similarity alone. `check-graph` asserts that
  changing every year moves nothing.
- **Type rank leads the detail toggle.** `rankItems` weighs type rank ×6 (was
  ×4) so link count can't lift a well-linked talk above a service item.
- **Ready for things beyond the CV.** `genres` is a set signal (1.5) for
  books and music; an item that isn't Sara's and has no `people` counts its
  `creator`, so one artist's albums sit together.
- **Everything by default, one wordless switch for research only** (Sara,
  2026-11-16: no "loved things" text anywhere). Two dots beside
  `network · list`, ink and colour; pressed, the colour dot empties and only
  CV items (`isMine`) remain. It appears only when the collection holds both,
  so not at launch.
- **A paper's talks and posters are paler copies of its dot** (Sara's pick
  from five, 2026-11-16, replacing 2.5px hollow rings). At rest they sit in
  a tight, uneven orbit half behind the dot (0.45–0.85 r off centre, angle
  from a hash of the id), each paler than the last; when the family is
  hovered or pinned they glide out to an arc beside it (2r + 9 from the
  centre), each labelled with its venue and year, and fold back 320ms after
  focus leaves so the pointer can reach them. Sara's fallback, if the orbit
  reads badly: the same copies stacked like cards.
- **No hollow rings anywhere.** A lone tier-3 item (a talk, poster or
  service with no paper) is a small solid dot at half opacity.

## Similarity — where things sit (2026-11-15)

Edges and distances come from a **similarity score**, after the engine in
Sara's music library, Unified. It suits the subject: analogical inflection
is similarity in a space, and the dissertation's retrieval pipeline is
nearest-neighbour search.

- **Signals**, each scored 0–1 and blended by weight: same `project` (4),
  tags (3), title wording (2.5), co-authors (2.5), languages (2), methods
  (1.5), venue community (1), explicit `connects` (3), year closeness (0.75).
  Shared values count more the rarer they are. A signal neither item has
  data for is left out rather than scored zero.
- **Every presentation is its own item.** A paper and its posters and talks
  are separate items (a same-titled one is *drawn* orbiting its paper since
  2026-11-16 — see "Encoding and navigation"); the shared `project` key — and, where the key is
  missing, similar title wording — pulls them together. The build lists
  close-titled pairs whose keys disagree, as a prompt to fix the data.
- **Each item keeps its three strongest neighbours** (score ≥ 0.2), so the
  graph shows the strongest ties, not every shared tag. The cliques that
  shared-tag edges made are gone.
- **Distance means difference.** Link length shortens with score. A
  relaxation pass then pushes apart any labels that would touch, which bends
  distances a little in exchange for legibility.
- **Hovering a neighbour while an item is pinned says why** in the detail
  line: "linked by same project · Andrea D. Sims · maltese". Values shared by
  a third or more of the collection are never offered as the reason.
- **Computed offline.** `npm run build-similarity -- <items file>` writes
  `<name>.similarity.json` beside it. The page reads that file when it
  exists and falls back to shared-tag edges when it doesn't.

Labels lead with "year · venue" so repeat presentations of one paper are told
apart. The layout sorts items by id before settling, so it never depends on
the order they arrive in.

**Candidates, not edges.** The file holds each item's eight strongest pairs
(and a few nearest `weak` ones that miss the thresholds); the page draws each
*visible* item's best three. With everything shown that is exactly the graph
the build would draw; with a filter or a detail step it is still a sensible
one, instead of leaving works stranded whose links ran through hidden talks.
A `weak` pair is drawn fainter and only where an item has nothing stronger.

## Zoom — the graph fits the window (2026-11-15)

"The graph shouldn't take up more than the browser window; zoom instead of
scroll." Before this, 35 full-title labels at full size made a canvas twice
the window's height and read as a wall of text.

- **One window, no page scroll.** The canvas takes the rest of the window
  under the controls; the detail band (118px) sits beneath it. The layout is
  a "world" shaped to the window's aspect ratio, and opens fitted to it.
- **Move like a map.** Scroll or pinch zooms about the pointer, drag pans,
  double-click zooms in (shift: out), `+` `−` `0` from the keyboard, arrows
  pan when the canvas has focus. A strip in the bottom-right corner holds
  `− + fit`. Panning is clamped so the drawing never leaves the window.
- **Type stays one size at every zoom; detail is what changes.** Labels are
  placed afresh in screen space (`placeOnScreen` in `graph.mjs`), most
  important first. Every dot first gets a *short* label — the year · venue
  kicker and the title up to its colon, at most two lines — then labels grow
  to the full title wherever there is room. A label that fits nowhere beside
  its dot may stand off a little way on a hairline leader; one that still
  fits nowhere is left out until you zoom in, and hovering its dot shows it
  in full, on top. A pinned item is always labelled, and pinning moves its
  neighbours to the front of the queue. Labels never touch another label or
  another dot, at any zoom — `check-graph` tests six zooms.
- **Edges are redrawn in screen space**, so a stroke keeps its weight however
  far you zoom; only its course scales. Dots stay their size too.
- **Zoom is the detail control** (Sara, 2026-11-16: "make level of detail
  and zoom one unified control, so they covary together"). The three rings
  are gone. The whole collection is laid out once (`subLayout` shows a part
  of it at the same places, links re-chosen among what is on show), and the
  zoom, as a ratio of the fitted zoom, picks the step: under 0.85× the main
  pieces of work (about a third), the fitted view adds the talks and posters
  that presented them (about two thirds), from 1.3× everything. One − or +
  from the fit crosses a step. Three 5px dots between − and + fill left to
  right with the step on show; clicking one zooms to it. A pinned item, its
  links, and a search preview stay on show at every zoom, so links and
  search no longer raise a level. Ranking (`rankItems`) puts works — papers,
  theses, projects, courses — above showings of them, then orders by link
  strength. Collections of twelve or fewer have one step and no dots.
- **Long venues are cut at a word** ("University of Cologne…"); the detail
  band gives them whole. A subtitle after a colon starts its own line.

## Where /threads comes from

Sources in [`inspiration/`](inspiration/):

- **Julie Mehretu** (`large_JM_0390...jpg`, the two example PNGs) — the
  governing reference. Depth comes from *layering* on a light ground, never
  from darkening. Ruled architectural underlay, long sweeping arcs, saturated
  colour marks floating above graphite line work.
- **`connections.html`** — the earlier sketch. Curved "Mehretu-ish bezier
  swoops" for edges rather than straight lines; nodes as filled circles with
  an ink hairline; the candy accent set.
- **`example-techno-aliases-node-graph.png`** — labels always on, in mono;
  node size carrying meaning; cluster names in the margins.
- **`discover-redesign.html`** — graph plus a fixed detail rail, instead of a
  card floating over the canvas.
- **`inspiration-brainstorming.txt`** — the adjectives: minimalist, uncluttered,
  playful, artsy, unpretentious, exploratory, elegant.

Three directions were rendered and rejected in favour of this one: a dark
"Observatory", a loud riso "Field Notes", and a quiet "Corpus". Dark was ruled
out explicitly — no black backgrounds.

## Palette

Tokens live at the top of [`src/assets/base.css`](src/assets/base.css).

Ground and ink are the home page's, unchanged:

| token | value | role |
| --- | --- | --- |
| `--page-bg` | `#ffffff` | page ground |
| `--page-bg-soft` | `#fcfdfe` | the graph canvas, a half-step off white |
| `--page-ink` | `#2c3e50` | text, node strokes, edges |
| `--page-dim` | `#7a8896` | secondary text, mono labels |
| `--accent-blue` | `#29a9ff` | the live accent — explicit links, selection, hover |

Type colours are the Paper set from `connections.html`, deepened one step
toward the Mehretu palette so they hold their own against white:

| form | type | token | value |
| --- | --- | --- | --- |
| read | book | `--t-book` | `#f2c744` |
| read | paper | `--t-paper` | `#c99a1e` |
| listen | podcast | `--t-podcast` | `#b49ae4` |
| listen | music | `--t-music` | `#7f5fc4` |
| watch | video | `--t-video` | `#4f9bd1` |
| watch | film | `--t-film` | `#2e6fae` |
| look | art | `--t-art` | `#5fc48c` |
| post | post | `--t-post` | `#ff7a66` |

On `/threads` since 2026-11-16 these colour loved things only, on the dot
alone; a type without its own token uses its form's base hue (the lighter
shade, or `--t-post`). Sara's own work is ink.

Decided 2026-09-03: **hue encodes form, shade encodes type.** Two types you
take in the same way share a hue, so the dots group by form before you read a
label, and the type cards read as groups before you read a single one.
Added 2026-09-02: `film` as a second shade of watch, and `art` as a new
**look** form in green — the one hue the set had left open. This replaced six
unrelated hues, where the colour carried no information until you consulted
the key.

`textbook` was merged into `book` (a one-item split costing a legend row) and
`track` became `music`. `paper` was added — the page's own blurb promised
papers and the ontology had no room for one.

Every dot carries a `--page-ink` hairline, which is what lets pale fills sit on
a white ground without dissolving.

## Type

| role | face | used for |
| --- | --- | --- |
| body / UI | `--page-sans` — the system stack, as on the home page | everything: running text, labels, dates, tags, counts, legend |
| item titles | `--page-serif` — Newsreader 400 | the title of each item, in the list and the rail |

Newsreader is the only web font the site loads (`public/index.html`).
IBM Plex Sans and IBM Plex Mono were dropped when the mono register went —
two fewer families on every page load.

There is deliberately no mono stack in `base.css` any more. If a future
label wants to feel technical, reach for size and colour, not a third face.

## The /threads decisions

1. **Edges are brushstrokes that bow outward.** Each edge is a filled sliver
   between two quadratic curves sharing their ends, so it tapers to a point
   at each node and swells in the middle (more shared tags, more swell). Every
   edge bows *away from the centre of the drawing*. Revised 2026-11-15: edges
   used to bow alternately left and right, which sent them straight through
   the middle of a tightly linked cluster, and five fully linked papers drew
   a pentagram. Bowing outward wraps the same links into loose orbital loops.
   Edges are ink at low opacity; an explicit `connects` is a little darker;
   whatever touches the hovered or selected node turns `--accent-blue`.
   Each edge also has its own hand, hashed from its two ids so it never
   changes under a filter: how far it bows, uneven pressure along its length
   and across its two sides, an occasional flick past one node, and on about
   half, a hairline retrace bowing slightly wider.
2. **Nodes mean something.** Radius is degree (`4.5 + degree × 1.1`, capped at
   10). Labels: year · venue above, title below, at a size that never
   changes — how much of each label shows depends on zoom (see Zoom).
   A node connected to four items should look like it. Labels are placed after the simulation settles
   (`placeLabels` in `graph.mjs`): each tries right, left, above, below and
   keeps the slot that overlaps least with other nodes and labels, most
   connected node first, and steers away from slots that edges run through.
   The collision radius grows with the label block so two nodes never settle
   a label apart. `check-graph` fails on any overlap.
3. **There's an underlay.** A ruled grid at 5.5% opacity, five sweeping arcs at
   8%, and four colour fields at 8%, all beneath the data. This is the fix
   for "flat" — it gives the canvas a floor without adding anything to read.
   Arcs and fields came down from 13% and 11% on 2026-09-02: at those
   values they competed with the edges, and an arc through a label read as
   a strikethrough. Labels also carry a 3px halo in the ground colour so
   nothing behind them cuts through the text.
4. **Two views, toggled — graph first.** `network` and `list` are switched
   from the topline; the graph is the default. They are alternatives, not a
   stack: the list no longer sits under the graph, which made the page read
   as one long scroll with the graph as a header. Selecting a node fills the
   rail and dims everything more than one hop away. Narrow screens get the
   list and no toggle. Revised 2026-09-03.
8. **Every filtered state says so, and offers the way out.** An `all` chip
   leads the tag row; empty graph ground clears a pinned node; the rail
   carries a `× clear`; the list says what it is filtered by. A view that
   hides things without saying it is hiding them is a dead end.
9. **Type cards are the key.** A row of cards sits directly under the
   heading, one per type present, each with its colour dot and count. Click
   one to filter by type; it stacks with a tag chip. They replaced a blurb
   line and a bottom legend that grouped types into four forms (read,
   listen, watch, post) — the grouping was one more thing to decode, and
   the cards say the same with the colours themselves. Decided 2026-09-02.
10. **The rail rests quietly.** With nothing selected it shows only the
   `everything` line and counts. The explanatory paragraphs it used to carry
   ("pick a point…", "lines are shared tags…") were cut the same day; the
   page should be understood by using it. The noun for an entry is `item`,
   everywhere — never `thing`.
5. **The layout settles, then freezes.** `d3-force` runs 340 ticks up front and
   stops; positions are then scaled to fit the viewBox. A perpetually drifting
   simulation reads as unfinished and never stops costing frames.
6. **Motion happens once.** Edges fade in, slightly staggered, over 900ms,
   nodes fade in behind them, then everything holds still. Disabled under `prefers-reduced-motion`.
7. **Mobile gets the list.** A twelve-node graph on a 375px screen helps no
   one. Same content, no half-broken canvas.

## The door

A small constellation at the end of the top menu, after cv
([`ThreadsGlyph.vue`](src/components/threads/ThreadsGlyph.vue)): four dots
on three threads, a tree rather than a closed shape, 15px, at the menu
words' 60% ink and blue on hover with its hub dot swelling. Unlabelled, so
it reads as a third page with no name. Hidden on /threads itself.

Sara's pick, 2026-11-16, from eight shapes (strand, brushstroke, loop,
running stitch, constellation, needle, ∴, weave) and five places (after cv,
before home, end of the icon line, beside her name, bottom-right corner).
It replaced a five-node pentagon glyph fixed to the bottom-right corner,
which read as a pentagon rather than a network.

Rejected: a link hidden in a bio word, the final full stop of a paragraph, a
`w-e-b` key sequence. All either too hidden or too cute.

## Content

The graph needs roughly 15–20 items to feel inhabited. At six it produces two
edges. The design degrades more gracefully than the old one — labelled,
sized nodes still say something without edges — but this is the real
constraint on the page, and it's a content problem, not a design one.

Add items with `npm run add-item` (opens [`tools/add-item.html`](tools/add-item.html)),
then `npm run check-items` and `npm run check-graph`.

## Hosting — one repository per project (2026-11-19)

This repository holds only the Vue site. Each project is its own public repository, served
by GitHub Pages from its `main` root at `https://sarakc.github.io/<repo>/`: `sarakc/tempo`,
`sarakc/warm-kitchen` (the finder and the cookbook, with its weekly Google Docs sync) and the
music viewer `sarakc/music-explorer`. No project commits to this repository's `main` on a
schedule.

Warm kitchen moved out on 2026-11-19 (`public/warm-kitchen/`,
`scripts/update-warm-kitchen-cookbook.mjs` and `.github/workflows/sync-cookbook.yml`
removed here); its URLs are unchanged.
