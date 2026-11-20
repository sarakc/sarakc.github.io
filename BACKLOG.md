# Backlog

Ideas worth doing later, with enough context to pick them up cold. Newest
first within each section. When one is done, delete it here and record the
decision in `DESIGN.md`.

## Hosting

### Link Tempo from the home page (noted 2026-11-16)

Tempo is hosted as its own repository (`sarakc/tempo`, at `/tempo/`) but is not linked from
the home page; add a link if wanted.

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
