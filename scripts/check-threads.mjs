#!/usr/bin/env node
/* Unit checks for the pure /threads modules: the type table, orbits, time
   ranks, camera framing, level reveal and search. check-graph exercises the
   layout against whole collections; this file pins down the small rules. */
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const load = async path => JSON.parse(await readFile(resolve(root, path), 'utf8'))

import { tagLabel, orderTags } from '../src/components/threads/tags.mjs'
import { projectsOf, scorePair, context as similarityContext } from '../src/components/threads/similarity.mjs'
const failures = []
function check(label, ok, detail = '') {
  if (ok) console.log(`  ✓ ${label}`)
  else { failures.push(`${label}${detail ? ` — ${detail}` : ''}`); console.log(`  ✗ ${label}${detail ? ` — ${detail}` : ''}`) }
}
/* A module that doesn't exist yet fails its section instead of the run. */
async function section(name, fn) {
  console.log(`\n${name}`)
  try { await fn() } catch (e) { check(`${name} runs`, false, e.message) }
}

const research = (await load('drafts/threads-research.json')).items
const researchPairs = (await load('drafts/threads-research.similarity.json')).edges
const candidates = (await load('drafts/threads-paper-candidates.json')).items
/* A small synthetic collection beyond the CV: undated, no satellites, one
   detail step. Made-up items only; nothing real belongs in a fixture. */
const loved = (await load('scripts/fixtures/small-undated.json')).items

await section('type table', async () => {
  const { TYPES, UNKNOWN, KNOWN_TYPES, typeInfo, isMine, markFor, detailMeta, TIER_RADIUS } =
    await import('../src/components/threads/types.mjs')
  check('a talk is tier 3, a ring', typeInfo('talk').tier === 3 && typeInfo('talk').ring === true)
  check('an unknown type falls back to UNKNOWN', typeInfo('nonsense') === UNKNOWN)
  check('UNKNOWN is tier 2, solid, form post, rank 1.5',
    UNKNOWN.tier === 2 && !UNKNOWN.ring && UNKNOWN.form === 'post' && UNKNOWN.rank === 1.5)
  check('KNOWN_TYPES is the table', KNOWN_TYPES.length === 14 && KNOWN_TYPES.every(t => TYPES[t]))
  check('the table is frozen', Object.isFrozen(TYPES))
  check('a paper is not mine by default', isMine({ type: 'paper' }) === false)
  check('mine: true makes a paper mine', isMine({ type: 'paper', mine: true }) === true)
  check('a talk is mine by default', isMine({ type: 'talk' }) === true)
  check('mine: false makes a talk loved', isMine({ type: 'talk', mine: false }) === false)
  const ownPaper = markFor({ type: 'paper', mine: true })
  check('own paper is ink, r 7', ownPaper.colour === 'var(--page-ink)' && ownPaper.r === 7 && ownPaper.realm === 'own')
  check('a book uses its own token', markFor({ type: 'book' }).colour === 'var(--t-book, var(--t-book))')
  const lovedTalk = markFor({ type: 'talk', mine: false })
  check('a loved talk takes its form hue and ring',
    lovedTalk.realm === 'listen' && lovedTalk.colour === 'var(--t-talk, var(--t-podcast))' && lovedTalk.r === 3.5 && lovedTalk.ring === true,
    JSON.stringify(lovedTalk))
  check('an unknown type is drawn tier 2', markFor({ type: 'game' }).r === 5 && TIER_RADIUS[2] === 5)
  const TYPE_WEIGHT = { paper: 3, thesis: 3, project: 2.5, course: 2.5, service: 1.2, talk: 0.6, poster: 0.6 }
  check('rank weights reproduce TYPE_WEIGHT', Object.entries(TYPE_WEIGHT).every(([t, w]) => typeInfo(t).rank === w))
  check('the noun is dropped when creator names the role',
    detailMeta({ creator: 'Sara Court · invited talk', type: 'talk', year: 2023 }) === 'Sara Court · invited talk · 2023',
    detailMeta({ creator: 'Sara Court · invited talk', type: 'talk', year: 2023 }))
  check('the noun stands in for a missing venue',
    detailMeta({ creator: 'Ada Limón', type: 'book', year: 2018 }) === 'Ada Limón · book · 2018')
  check('venue then year without a creator', detailMeta({ type: 'paper', venue: 'WMT', year: 2024 }) === 'WMT · 2024')
  check('an unknown type never shows its raw id', !detailMeta({ type: 'game', creator: 'X' }).includes('game'))
  check('the noun is kept when the creator only contains its letters',
    detailMeta({ type: 'art', creator: 'Stuart Davis', year: 1951 }) === 'Stuart Davis · art · 1951',
    detailMeta({ type: 'art', creator: 'Stuart Davis', year: 1951 }))
})

await section('orbits', async () => {
  const { titleKey, fold, findOrbits, splitWorks, fanPoints, restPoints } = await import('../src/components/threads/orbits.mjs')
  const { levelCounts } = await import('../src/components/threads/graph.mjs')
  check('titleKey folds case, punctuation and runs of space',
    titleKey('Shortcomings  of LLMs: WMT!') === 'shortcomings of llms wmt', titleKey('Shortcomings  of LLMs: WMT!'))
  check('fold strips accents', fold('Limón') === 'limon')
  const orbits = findOrbits(research)
  check('research has 7 satellites', orbits.size === 7, [...orbits.keys()].join(', '))
  const expect = {
    'talk-2024-wmt-low-resource-translation': 'court-elsner-low-resource-translation',
    'talk-2025-melt-low-resource-translation': 'court-elsner-low-resource-translation',
    'talk-2023-scil-analogy-in-contact': 'court-sims-elsner-analogy-in-contact',
    'talk-2026-tsukuba-emergency': 'court-downing-elsner-emergency-contexts',
    'talk-2026-acl-emergency': 'court-downing-elsner-emergency-contexts',
    'talk-2022-computel-fieldwork-annotation': 'copot-et-al-fieldwork-annotation',
    'talk-2020-coling-affixoid': 'tseng-et-al-affixoid-behavior',
  }
  for (const [sat, parent] of Object.entries(expect)) check(`${sat} orbits ${parent}`, orbits.get(sat) === parent, String(orbits.get(sat)))
  check('differently titled Maltese plural talks stay nodes',
    ![...orbits.keys()].some(id => /maltese|quantifying/.test(id)))
  const talk = { id: 't', type: 'talk', title: 'X' }
  check('a loved paper does not take Sara\'s talk', findOrbits([talk, { id: 'p', type: 'paper', title: 'x.' }]).size === 0)
  check('her own paper does', findOrbits([talk, { id: 'p', type: 'paper', title: 'x.', mine: true }]).get('t') === 'p')
  check('two talks with one title stay apart', findOrbits([talk, { id: 'u', type: 'talk', title: 'X' }]).size === 0)
  check('a satellite never has satellites', (() => {
    const o = findOrbits([talk, { id: 'p', type: 'paper', title: 'X', mine: true }, { id: 's', type: 'service', title: 'X' }])
    return o.get('t') === 'p' && o.get('s') === 'p'
  })())
  check('ties go to the lowest tier, then the nearest year', (() => {
    const o = findOrbits([
      { id: 't', type: 'talk', title: 'X', year: 2020 },
      { id: 'c', type: 'course', title: 'X', year: 2020 },
      { id: 'p1', type: 'paper', title: 'X', mine: true, year: 2010 },
      { id: 'p2', type: 'paper', title: 'X', mine: true, year: 2019 },
    ])
    return o.get('t') === 'p2'
  })())
  check('loved and paper candidates have no satellites', findOrbits(loved).size === 0 && findOrbits(candidates).size === 0)
  const split = splitWorks(research, orbits)
  check('research draws 28 works', split.works.length === 28, String(split.works.length))
  check('satellites are listed under their parents, by year then id',
    split.satellites.get('court-elsner-low-resource-translation')?.map(i => i.id).join() ===
      'talk-2024-wmt-low-resource-translation,talk-2025-melt-low-resource-translation')
  const noWmt = splitWorks(research.filter(i => i.id !== 'court-elsner-low-resource-translation'), orbits)
  check('a satellite whose paper is filtered out stands as a work of its own',
    ['talk-2024-wmt-low-resource-translation', 'talk-2025-melt-low-resource-translation'].every(id => noWmt.works.some(i => i.id === id)) &&
    !noWmt.satellites.has('court-elsner-low-resource-translation') &&
    noWmt.works.length === split.works.length - 1 + 2)
  const pts = fanPoints({ x: 0, y: 0, r: 7 }, 3)
  check('fanned copies sit at 2r + 9', pts.length === 3 && pts.every(p => Math.abs(Math.hypot(p.x, p.y) - 23) < 1e-9))
  const gaps = pts.flatMap((p, i) => pts.slice(i + 1).map(q => Math.hypot(p.x - q.x, p.y - q.y)))
  check('fanned copies keep 3px apart', gaps.every(g => g >= 2 * 7 + 3 - 1e-9), gaps.map(g => g.toFixed(2)).join())
  check('the first fanned copy is lower left', pts[0].x < 0 && pts[0].y > 0)
  check('no NaN in fanned copies', pts.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)))
  check('no satellites, no points', fanPoints({ x: 0, y: 0, r: 7 }, 0).length === 0)
  const rest = restPoints({ x: 0, y: 0, r: 7 }, ['a', 'b'])
  check('copies at rest stay half behind the dot', rest.every(p => Math.hypot(p.x, p.y) <= 7 * 0.85 + 1e-9 && Math.hypot(p.x, p.y) >= 7 * 0.45 - 1e-9))
  check('copies at rest are where they were', JSON.stringify(rest) === JSON.stringify(restPoints({ x: 0, y: 0, r: 7 }, ['a', 'b'])))
  check('28 works step 10, 18, 28', JSON.stringify(levelCounts(28)) === '[10,18,28]')
})

await section('list groups', async () => {
  const { cvGroups, isInvited } = await import('../src/components/threads/cvgroups.mjs')
  const g = cvGroups([
    { id: 'p1', type: 'paper', mine: true, title: 'a', year: 2020 },
    { id: 'p2', type: 'paper', mine: true, title: 'b' },
    { id: 'p3', type: 'paper', mine: true, title: 'c', year: 2024 },
    { id: 't1', type: 'talk', title: 'd', year: 2023, creator: 'Sara Court · invited talk' },
    { id: 't2', type: 'talk', title: 'e', year: 2025 },
    { id: 'th', type: 'thesis', title: 'f', year: 2013 },
    { id: 'b1', type: 'book', title: 'g', year: 1999 },
    { id: 'm1', type: 'music', title: 'h' },
  ])
  check('CV sections in CV order, then other kinds', JSON.stringify(g.map(x => x.id)) ===
    '["education","publications","invited","presentations","kind-book","kind-music"]', JSON.stringify(g.map(x => x.id)))
  check('newest first, in progress leading', JSON.stringify(g[1].items.map(i => i.id)) === '["p2","p3","p1"]')
  check('an invited talk is told by its byline', isInvited({ creator: 'Sara Court · invited talk' }) && !isInvited({ creator: 'Court and Elsner' }))
  check('invited: false wins over the byline', !isInvited({ invited: false, creator: 'invited talk' }))
  check('empty collection, no groups', cvGroups([]).length === 0)
})

await section('camera', async () => {
  const { frameCamera } = await import('../src/components/threads/camera.mjs')
  const base = { size: { w: 1000, h: 600 }, fitK: 0.5, maxK: 1.6 }
  const centreOf = (box, c) => ({ x: ((box.x0 + box.x1) / 2) * c.k + c.x, y: ((box.y0 + box.y1) / 2) * c.k + c.y })
  const near = (a, b) => Math.abs(a - b) < 1e-6
  const finite = c => c === null || [c.k, c.x, c.y].every(Number.isFinite)
  const results = []

  const lone = { x0: 100, y0: 100, x1: 100, y1: 100 }
  const a = frameCamera({ ...base, box: lone, cam: { k: 0.5, x: 0, y: 0 } }); results.push(a)
  check('a lone item zooms to fitK·2.5 and no further', a && near(a.k, 1.25), JSON.stringify(a))
  check('and is centred above the controls', a && near(centreOf(lone, a).x, 500) && near(centreOf(lone, a).y, 290))

  const wide = { x0: 0, y0: 0, x1: 4000, y1: 100 }
  const b = frameCamera({ ...base, box: wide, cam: { k: 0.3, x: 2000, y: 2000 } }); results.push(b)
  check('pinning never zooms out past the whole-drawing fit', b && near(b.k, 0.5), JSON.stringify(b))

  const framed = { x0: 0, y0: 0, x1: 200, y1: 100 }
  const c = frameCamera({ ...base, box: framed, cam: { k: 1.5, x: 100, y: 100 } }); results.push(c)
  check('an already framed neighbourhood does not move', c === null, JSON.stringify(c))

  const part = { x0: 0, y0: 0, x1: 200, y1: 100 }
  const d = frameCamera({ ...base, box: part, cam: { k: 1.6, x: -250, y: 100 } }); results.push(d)
  check('zoomed in past the target with the frame in view: pan only',
    d && near(d.k, 1.6) && near(centreOf(part, d).x, 500) && near(centreOf(part, d).y, 290), JSON.stringify(d))

  const far = { x0: 100, y0: 100, x1: 300, y1: 200 }
  const e = frameCamera({ ...base, box: far, cam: { k: 1, x: -5000, y: -5000 } }); results.push(e)
  check('a far frame is flown to and centred',
    e && e.k >= 0.5 && e.k <= 1.25 && near(centreOf(far, e).x, 500) && near(centreOf(far, e).y, 290), JSON.stringify(e))

  const tight = { x0: 100, y0: 100, x1: 100.0001, y1: 100 }
  results.push(frameCamera({ ...base, box: tight, cam: { k: 0.5, x: 0, y: 0 } }))
  check('no NaN in any frame', results.every(finite))
})

await section('level reveal', async () => {
  const { levelFor, rankItems, levelCounts } = await import('../src/components/threads/graph.mjs')
  const { findOrbits, splitWorks } = await import('../src/components/threads/orbits.mjs')
  const orbits = findOrbits(research)
  const { works } = splitWorks(research, orbits)
  const rank = rankItems(works, researchPairs)
  const counts = levelCounts(works.length)
  const type = id => research.find(i => i.id === id).type
  check('a paper shows at the first step', levelFor('court-elsner-low-resource-translation', research, researchPairs, orbits) === 0)
  const middle = rank[counts[0]]
  check(`a ${type(middle)} first shown at the middle step reveals step 1`, levelFor(middle, research, researchPairs, orbits) === 1, middle)
  const tail = rank.at(-1)
  check(`a ${type(tail)} at the tail reveals step 2`, levelFor(tail, research, researchPairs, orbits) === 2, tail)
  check('an unknown id gives null', levelFor('no-such-item', research, researchPairs, orbits) === null)
  check('a small collection has one step', loved.every(i => levelFor(i.id, loved, null, findOrbits(loved)) === 0))
  check('a satellite reveals its paper\'s step',
    levelFor('talk-2024-wmt-low-resource-translation', research, researchPairs, orbits) === 0)
  const withoutPaper = research.filter(i => i.id !== 'court-elsner-low-resource-translation')
  check('a satellite whose paper is filtered out reveals its own step', (() => {
    const lv = levelFor('talk-2024-wmt-low-resource-translation', withoutPaper, researchPairs, orbits)
    const { works: rest } = splitWorks(withoutPaper, orbits)
    const at = rankItems(rest, researchPairs).indexOf('talk-2024-wmt-low-resource-translation')
    return Number.isInteger(lv) && lv === levelCounts(rest.length).findIndex(n => at < n)
  })())
  check('an item filtered out gives null', levelFor('court-elsner-low-resource-translation', withoutPaper, researchPairs, orbits) === null)
})

await section('filters', async () => {
  const { isFiltered, escapeStep } = await import('../src/components/threads/filters.mjs')
  check('nothing on is not filtered', isFiltered({ tag: null, researchOnly: false }) === false)
  check('a topic is filtered', isFiltered({ tag: 'x', researchOnly: false }) === true)
  check('research only is filtered', isFiltered({ tag: null, researchOnly: true }) === true)
  check('Esc unpins before it clears', escapeStep({ pinned: true, filtered: true, typing: false }) === 'unpin')
  check('Esc clears once nothing is pinned', escapeStep({ pinned: false, filtered: true, typing: false }) === 'clear')
  check('Esc on the full graph does nothing', escapeStep({ pinned: false, filtered: false, typing: false }) === null)
  check('Esc while typing does nothing', escapeStep({ pinned: true, filtered: true, typing: true }) === null)
})

await section('search', async () => {
  const { searchItems } = await import('../src/components/threads/search.mjs')
  const { typeInfo } = await import('../src/components/threads/types.mjs')
  const ids = list => list.map(i => i.id)
  const analogy = searchItems(research, 'analogy')
  check('"analogy" finds both analogy papers',
    ['court-sims-elsner-analogy-in-contact', 'elsner-court-analogical-inflection'].every(id => ids(analogy).includes(id)), ids(analogy).join(', '))
  /* Spec §7: title matches first, then tier — so within each group a paper
     is ahead of its talks. */
  const inTitle = i => /\banalogy/i.test(i.title)
  const tiersSorted = list => list.every((i, n) => n === 0 || typeInfo(list[n - 1].type).tier <= typeInfo(i.type).tier)
  check('within title and other matches, papers rank ahead of talks and posters',
    tiersSorted(analogy.filter(inTitle)) && tiersSorted(analogy.filter(i => !inTitle(i))), ids(analogy).join(', '))
  check('"2023 scil" finds the SCiL paper', ids(searchItems(research, '2023 scil')).includes('court-sims-elsner-analogy-in-contact'))
  /* In the research draft every name in people is also in creator, so a fixture. */
  const fixture = [{ id: 'x', type: 'talk', title: 'Something Else', creator: 'Sara Court', people: ['Micha Elsner'] }]
  check('a name in people alone is found', ids(searchItems(fixture, 'elsner')).includes('x'))
  const fieldsOf = i => [i.title, i.creator, i.venue, ...(i.tags || []), ...(i.people || []), String(i.year ?? '')].join(' ').toLowerCase()
  const noted = research.find(i => i.note && (i.note.match(/[a-z]{7,}/gi) || []).some(w => !fieldsOf(i).includes(w.toLowerCase().slice(0, 5))))
  const noteWord = noted && noted.note.match(/[a-z]{7,}/gi).find(w => !fieldsOf(noted).includes(w.toLowerCase().slice(0, 5)))
  check('a word only in the note does not match', noted && !ids(searchItems(research, noteWord, 100)).includes(noted.id), `${noted?.id} / ${noteWord}`)
  const lang = research.find(i => (i.languages || []).some(l => !fieldsOf(i).includes(l)))
  const langWord = lang && lang.languages.find(l => !fieldsOf(lang).includes(l))
  check('a word only in languages does not match', !lang || !ids(searchItems(research, langWord, 100)).includes(lang.id), `${lang?.id} / ${langWord}`)
  check('"AI" matches titles with AI in them', ids(searchItems(research, 'AI', 100)).includes('talk-2025-cosi-ai-basics'))
  check('punctuation and regex characters never throw',
    ['c++', '(', 'ai?', '"', '[', '\\', '.*'].every(q => Array.isArray(searchItems(research, q))))
  const langs = [
    { id: 'cpp', type: 'book', title: 'The C++ Programming Language' },
    { id: 'c', type: 'book', title: 'The C Programming Language' },
    { id: 'cs', type: 'book', title: 'C# in Depth' },
  ]
  check('"c++" finds C++ and not C', ids(searchItems(langs, 'c++')).join() === 'cpp', ids(searchItems(langs, 'c++')).join())
  check('"c#" finds C# alone', ids(searchItems(langs, 'C#')).join() === 'cs', ids(searchItems(langs, 'C#')).join())
  check('"c" still finds all three', searchItems(langs, 'c').length === 3)
  check('a lone "+" matches nothing rather than everything', searchItems(langs, '+').length === 0)
  check('nothing matches "zzzz"', searchItems(research, 'zzzz').length === 0)
  check('an empty query gives nothing', searchItems(research, '').length === 0 && searchItems(research, '   ').length === 0)
  check('accents are ignored', ids(searchItems(loved, 'episode')).includes('fixture-podcast'))
  check('at most six results', searchItems(research, 'a').length <= 6 && searchItems(research, 'a').length > 0)
  const titled = searchItems(research, 'translation', 100)
  const firstOffTitle = titled.findIndex(i => !/translation/i.test(i.title))
  check('title matches come first', firstOffTitle === -1 || titled.slice(firstOffTitle).every(i => !/translation/i.test(i.title)), ids(titled).join(', '))
})

await section('check-items', async () => {
  const { spawnSync } = await import('node:child_process')
  const run = file => spawnSync(process.execPath, [resolve(root, 'scripts/check-items.mjs'), resolve(root, file)], { encoding: 'utf8' })
  const live = run('public/threads/items.json')
  check('the live collection passes', live.status === 0, live.stdout.split('\n').filter(l => l.includes('✗')).join('; '))
  /* layoutGraph sorts by id.localeCompare, so a number there crashes the page. */
  const bad = run('scripts/fixtures/bad-id-types.json')
  check('a numeric id fails', bad.status === 1 && /\[#0\]: id must be a string/.test(bad.stdout), bad.stdout.trim())
  check('a numeric title fails', bad.status === 1 && /\[fixture-numeric-title\]: title must be a string/.test(bad.stdout), bad.stdout.trim())
})

await section('item editor', async () => {
  const { toForm, mergeItem, saveItem, deleteItem, serialise, parseCollection, validate } = await import('../tools/items-editor.mjs')
  const { KNOWN_TYPES } = await import('../src/components/threads/types.mjs')
  const { existsSync } = await import('node:fs')
  /* What "edit, then save changes" does to an item when nothing was touched. */
  const roundTrip = (items, item) => saveItem(items, item.id, mergeItem(item, toForm(item)))
  for (const file of ['public/threads/items.json', 'drafts/threads-research.json', 'drafts/threads-paper-candidates.json']) {
    if (!existsSync(resolve(root, file))) continue
    const text = await readFile(resolve(root, file), 'utf8')
    const { data } = parseCollection(text)
    let items = data.items
    for (const item of data.items) items = roundTrip(items, item)
    check(`${file}: saving every item untouched gives the same file`, serialise(data, items) === text)
  }
  const text = await readFile(resolve(root, 'public/threads/items.json'), 'utf8')
  const { data } = parseCollection(text)
  const talk = data.items.find(i => i.type === 'talk' && i.venue && i.project && i.community)
  const edited = mergeItem(talk, { ...toForm(talk), note: 'A new note.' })
  check('editing a note changes only the note',
    JSON.stringify({ ...edited, note: undefined }) === JSON.stringify({ ...talk, note: undefined }) && edited.note === 'A new note.')
  const keep = ['venue', 'project', 'community', 'place', 'people', 'methods', 'languages', 'mine', 'venueShort']
  const rich = data.items.find(i => keep.filter(f => f in i).length >= 6)
  const retitled = mergeItem(rich, { ...toForm(rich), title: rich.title + ' (revised)' })
  check('fields the form does not show survive an edit', keep.every(f => JSON.stringify(retitled[f]) === JSON.stringify(rich[f])))
  const saved = parseCollection(serialise(data, saveItem(data.items, rich.id, retitled))).data
  check('the top-level about and tags blocks survive a save',
    saved.about === data.about && JSON.stringify(saved.tags) === JSON.stringify(data.tags) &&
    JSON.stringify(Object.keys(saved)) === JSON.stringify(Object.keys(data)))
  const withUrl = data.items.find(i => i.url)
  const cleared = mergeItem(withUrl, { ...toForm(withUrl), url: '  ' })
  check('clearing a field removes it', !('url' in cleared) && cleared.venue === withUrl.venue)
  const fresh = mergeItem(null, { ...toForm(null), id: 'new-talk', type: 'talk', title: ' New Talk ', added: '2026-11-20', tags: 'Morphology, analogy', year: '2026' })
  check('a new item is written in form order, trimmed',
    JSON.stringify(fresh) === '{"id":"new-talk","type":"talk","title":"New Talk","added":"2026-11-20","tags":["morphology","analogy"],"year":2026}', JSON.stringify(fresh))
  check('every type in types.mjs can be created', KNOWN_TYPES.every(type =>
    validate({ ...fresh, id: `new-${type}`, type }, data.items, null).errors.length === 0))
  const renamed = saveItem([{ id: 'a', connects: ['b'] }, { id: 'b' }], 'b', { id: 'c' })
  check('a renamed id is chased through connects', JSON.stringify(renamed) === '[{"id":"a","connects":["c"]},{"id":"c"}]', JSON.stringify(renamed))
  const removed = deleteItem([{ id: 'a', connects: ['b'] }, { id: 'b' }], 'b')
  check('deleting an item drops links to it', JSON.stringify(removed) === '[{"id":"a"}]', JSON.stringify(removed))
  check('a file without items is refused', Boolean(parseCollection('{"about":"x"}').error) && Boolean(parseCollection('nope').error))
})

section('tags.mjs — labels and order', () => {
  check('kebab-case reads as words', tagLabel('language-contact') === 'language contact')
  check('acronyms keep their capitals', tagLabel('responsible-ai') === 'responsible AI' && tagLabel('llms') === 'LLMs')
  check('a collection label wins', tagLabel('llms', { llms: 'large language models' }) === 'large language models')
  const sample = [{ tags: ['a', 'b'] }, { tags: ['b', 'c'] }, { tags: ['b'] }]
  const plain = orderTags(sample)
  check('without primaries: most used first', plain.tags.join() === 'b,a,c' && plain.primaryCount === 0)
  const led = orderTags(sample, ['c', 'missing', 'a'])
  check('primaries lead in their own order; unused ones drop', led.tags.join() === 'c,a,b' && led.primaryCount === 2)
})

section('similarity — projects', () => {
  check('one key or a list', projectsOf({ project: 'a' }).join() === 'a' && projectsOf({ project: ['a', 'b'] }).join() === 'a,b' && projectsOf({}).length === 0)
  const items = [
    { id: 'x', title: 'Alpha', project: ['dissertation', 'paper-one'] },
    { id: 'y', title: 'Beta', project: 'dissertation' },
    { id: 'z', title: 'Gamma', project: 'other' },
  ]
  const ctx = similarityContext(items)
  const r = id => scorePair(items[0], items.find(i => i.id === id), ctx).reasons.find(p => p.signal === 'project')
  check('sharing any one key is the same project', r('y')?.contribution === 4 && r('y').values.join() === 'dissertation')
  check('no shared key gives no project reason', !r('z'))
})

section('similarity — beyond the CV', () => {
  const items = [
    { id: 'a', type: 'music', title: 'One', creator: 'Artist A', genres: ['ambient'] },
    { id: 'b', type: 'music', title: 'Two', creator: 'Artist A', genres: ['ambient'] },
    { id: 'c', type: 'talk', title: 'Three', creator: 'Sara Court', genres: [] },
    { id: 'd', type: 'talk', title: 'Four', creator: 'Sara Court' },
    ...['e', 'f', 'g', 'h'].map((id, i) => ({ id, type: 'book', title: `Book ${id}`, creator: `Writer ${i}`, genres: [`genre-${i}`] })),
  ]
  const ctx = similarityContext(items)
  const sig = (x, y, s) => scorePair(items.find(i => i.id === x), items.find(i => i.id === y), ctx).reasons.find(p => p.signal === s)
  check('a non-CV item counts its creator as people', sig('a', 'b', 'people')?.values.join() === 'Artist A')
  check('Sara\'s byline is never a shared person', !sig('c', 'd', 'people'))
  check('genres are a signal of their own', sig('a', 'b', 'genres')?.values.join() === 'ambient')
})

console.log('')
if (failures.length) {
  console.log(`${failures.length} failure${failures.length === 1 ? '' : 's'}\n`)
  process.exit(1)
}
console.log('ok\n')
