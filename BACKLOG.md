# Backlog

Ideas worth doing later, with enough context to pick them up cold. Newest
first within each section. When one is done, delete it here and record the
decision in `DESIGN.md`.

## Hosting

### Warm kitchen in its own repository (noted 2026-11-16)

One public repository per project, served by GitHub Pages from its `main` branch root at
`https://sarakc.github.io/<repo>/`, as `sarakc/tempo` already is and the music viewer will
be. This repository then holds only the Vue site, and no project commits to its `main` on a
schedule.

- **New repo `sarakc/warm-kitchen` (public):** today's `public/warm-kitchen/` at its root
  (`warm_kitchen_finder.html`, `cookbook/index.html`), `.nojekyll`,
  `scripts/update-warm-kitchen-cookbook.mjs` with its output path changed to
  `cookbook/index.html`, and `sync-cookbook.yml` (weekly, Mondays, plus the manual run).
  It needs no build or deploy step: committing the refreshed cookbook is the deploy.
- **Same URLs:** `/warm-kitchen/warm_kitchen_finder.html` and `/warm-kitchen/cookbook/` stay
  where they are, and the cookbook's `../warm_kitchen_finder.html` link still works.
- **Cutover:** turn on Pages in the new repo, check both URLs, then delete
  `public/warm-kitchen/`, `scripts/update-warm-kitchen-cookbook.mjs` and
  `.github/workflows/sync-cookbook.yml` here, and check both URLs again after the site
  deploys.
- **Before moving:** the local `warm-kitchen` project folder (beside this checkout) is not a git repo, and its
  `warm_kitchen_finder.html` differs from the one here (this one has the later commits,
  `ad5942b1`). Confirm which is current, move the `.docx` aside, then clone the new repo
  there.
- Tempo is already hosted this way but is not linked from the home page; add a link if
  wanted.
- This repository's working tree had uncommitted changes on 2026-11-16 (deleted `dist/`
  files, `package.json`, `package-lock.json`, `.gitignore`, `public/index.html`); settle
  them before the cutover commit.

## /threads

### Abstract embeddings as a similarity signal (noted 2026-11-15)

Add a semantic signal to the similarity engine
(`src/components/threads/similarity.mjs`) from paper abstracts, so items that
are about the same thing in different words sit together — not only items
that share tags, people or title words.

- **Data:** add an optional `abstract` field to items (papers first; talks
  can borrow their project's abstract). Document it in
  `public/threads/README.md` and let `scripts/check-items.mjs` accept it.
- **Model:** SPECTER2 (`allenai/specter2_base` with the proximity adapter) —
  trained on citation links between scientific papers, so its notion of
  "close" suits a research collection. Run once, offline, in the build; the
  page never loads a model.
- **Build:** embed `title + [SEP] + abstract`, cache vectors beside the items
  file (e.g. `items.embeddings.json`, keyed by id and a hash of the text so
  only changed items re-embed), and score pairs by cosine. Feed it into
  `scorePair` as one more signal — weight around 3, alongside tags — and like
  the other signals, leave it out when either item has no abstract.
- **Reasons:** say "similar abstracts" in the detail line, as titles say
  "similar titles" now.
- **Check:** rerun `npm run build-similarity`; the "same work?" hints should
  get sharper, and the honors thesis (currently unlinked) may find a neighbour.

This is the same move Unified makes with audio embeddings next to its
metadata signals.

### Data to confirm in `drafts/threads-research.json` (2026-11-15)

- The Malta 2025 talk's `project`: low-resource translation, or the
  dissertation? (The build's "same work?" check flags it.)
- CogSciDIY's year (2021 is an estimate) and the AI-literacy workshops'
  (2024, their start).
- The INNET 2014 talk title (paraphrased from the CV) and the Helsinki 2023
  talk's `project` (`fieldwork-annotation`).
- `languages` for the translation and emergency-response work.
- "Are These Programmers Ripe Enough to Eat?": under review, but the item
  keeps an arXiv link.
- Left out so far: SRI internship, awards, student-society leadership,
  conference organising.
