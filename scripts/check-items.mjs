#!/usr/bin/env node
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { KNOWN_TYPES as TYPE_LIST } from '../src/components/threads/types.mjs'
import { findOrbits } from '../src/components/threads/orbits.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ITEMS_PATH = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : resolve(__dirname, '..', 'public', 'threads', 'items.json')

const REQUIRED = ['id', 'type', 'title', 'added', 'tags']
/* The type table in src/components/threads/types.mjs is the one list. */
const KNOWN_TYPES = new Set(TYPE_LIST)
/* Optional structured fields the similarity build reads. */
const LIST_FIELDS = ['people', 'languages', 'methods', 'genres', 'community']
const ID_RE = /^[a-z0-9][a-z0-9-]*$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

const errors = []
const warnings = []

function err(itemRef, msg) { errors.push(`  ✗ ${itemRef}: ${msg}`) }
function warn(itemRef, msg) { warnings.push(`  ! ${itemRef}: ${msg}`) }

let raw
try {
  raw = await readFile(ITEMS_PATH, 'utf8')
} catch (e) {
  console.error(`could not read ${ITEMS_PATH}: ${e.message}`)
  process.exit(2)
}

let data
try {
  data = JSON.parse(raw)
} catch (e) {
  console.error(`items.json is not valid JSON: ${e.message}`)
  process.exit(2)
}

const items = Array.isArray(data?.items) ? data.items : null
if (!items) {
  console.error('items.json must have an "items" array at the top level')
  process.exit(2)
}

const seenIds = new Set()
const allIds = new Set(items.map(i => i?.id).filter(id => typeof id === 'string' && id))

for (const [i, item] of items.entries()) {
  const ref = typeof item?.id === 'string' && item.id ? `[${item.id}]` : `[#${i}]`

  for (const field of REQUIRED) {
    if (item[field] === undefined || item[field] === null || item[field] === '') {
      err(ref, `missing required field "${field}"`)
    }
  }

  /* The page sorts and joins on these; a number (id 5, title 1984) would pass
     the regex and the required check, then crash the layout. */
  for (const field of ['id', 'title']) {
    if (item[field] !== undefined && item[field] !== null && typeof item[field] !== 'string') {
      err(ref, `${field} must be a string, not ${typeof item[field]} ${JSON.stringify(item[field])}`)
    }
  }

  if (typeof item.id === 'string' && item.id) {
    if (!ID_RE.test(item.id)) err(ref, `id "${item.id}" must be kebab-case (lowercase, digits, hyphens)`)
    if (seenIds.has(item.id)) err(ref, `duplicate id "${item.id}"`)
    seenIds.add(item.id)
  }

  if (item.type && !KNOWN_TYPES.has(item.type)) {
    warn(ref, `unknown type "${item.type}" — known: ${[...KNOWN_TYPES].join(', ')}`)
  }

  /* `mine` marks Sara's own work; talks, posters and the like are hers by default. */
  if (item.mine !== undefined && typeof item.mine !== 'boolean') {
    err(ref, `mine must be true or false`)
  }

  if (item.added && !DATE_RE.test(item.added)) {
    err(ref, `added "${item.added}" must be YYYY-MM-DD`)
  }

  if (item.year !== undefined && (!Number.isInteger(item.year) || item.year < 1000 || item.year > 9999)) {
    err(ref, `year must be a four-digit number`)
  }

  if (item.url && !/^https?:\/\//.test(item.url)) {
    warn(ref, `url "${item.url}" does not start with http(s)://`)
  }

  if (item.tags && !Array.isArray(item.tags)) {
    err(ref, `tags must be an array`)
  } else if (Array.isArray(item.tags)) {
    for (const tag of item.tags) {
      if (typeof tag !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(tag)) {
        warn(ref, `tag "${tag}" should be lowercase kebab-case`)
      }
    }
  }

  for (const field of LIST_FIELDS) {
    if (item[field] === undefined) continue
    if (!Array.isArray(item[field]) || item[field].some(v => typeof v !== 'string' || !v.trim())) {
      err(ref, `${field} must be an array of non-empty strings`)
    }
  }
  if (item.project !== undefined) {
    const keys = Array.isArray(item.project) ? item.project : [item.project]
    if (!keys.length || keys.some(k => typeof k !== 'string' || !ID_RE.test(k))) {
      err(ref, `project ${JSON.stringify(item.project)} must be a kebab-case key, or a list of them, shared by items presenting the same work`)
    } else if (new Set(keys).size !== keys.length) {
      err(ref, `project lists the same key twice`)
    }
  }
  if (item.venue !== undefined && (typeof item.venue !== 'string' || !item.venue.trim())) {
    err(ref, `venue must be a non-empty string`)
  }
  if (item.venueShort !== undefined) {
    if (typeof item.venueShort !== 'string' || !item.venueShort.trim()) err(ref, `venueShort must be a non-empty string`)
    else if (item.venue === undefined) err(ref, `venueShort is the label form of venue; add the full venue too`)
  }

  if (item.connects) {
    if (!Array.isArray(item.connects)) {
      err(ref, `connects must be an array of ids`)
    } else {
      for (const target of item.connects) {
        if (!allIds.has(target)) err(ref, `connects: id "${target}" not found`)
        if (target === item.id) err(ref, `connects: cannot reference itself`)
      }
    }
  }
}

console.log(`checked ${items.length} items`)

/* Not a warning: which talks and posters the graph draws orbiting their
   paper, so a title edit that makes or breaks one is visible. */
const orbits = findOrbits(items.filter(i => i && typeof i.id === 'string' && i.id && i.type && typeof i.title === 'string' && i.title))
if (orbits.size) {
  console.log(`\n${orbits.size} orbit${orbits.size === 1 ? '' : 's'}:`)
  for (const [sat, parent] of orbits) console.log(`  ↳ ${sat} orbits ${parent}`)
}
if (warnings.length) {
  console.log(`\n${warnings.length} warning${warnings.length === 1 ? '' : 's'}:`)
  for (const line of warnings) console.log(line)
}
if (errors.length) {
  console.log(`\n${errors.length} error${errors.length === 1 ? '' : 's'}:`)
  for (const line of errors) console.log(line)
  process.exit(1)
}
console.log(warnings.length ? 'ok (with warnings)' : 'ok')
