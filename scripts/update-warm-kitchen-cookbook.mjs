#!/usr/bin/env node

import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const DOC_ID = process.env.COOKBOOK_GOOGLE_DOC_ID || '1E37jt7xVR03ubV2S69WDvYcHJcGBFYgHc4MaCnQkpqc'
const SOURCE_URL = `https://docs.google.com/document/d/${DOC_ID}/export?format=html`
const FINDER_URL = '../warm_kitchen_finder.html'
const SOURCE_EDIT_URL = `https://docs.google.com/document/d/${DOC_ID}/edit`
const scriptPath = fileURLToPath(import.meta.url)
const scriptDir = dirname(scriptPath)
const repoRoot = resolve(scriptDir, '..')
const outputPath = resolve(repoRoot, 'public/warm-kitchen/cookbook/index.html')

const localExportPath = process.env.COOKBOOK_EXPORT_HTML
let exported

if (localExportPath) {
  exported = await readFile(resolve(localExportPath), 'utf8')
} else {
  const response = await fetch(SOURCE_URL, {
    redirect: 'follow',
    headers: { 'user-agent': 'warm-kitchen-site-sync/1.0' },
  })

  if (!response.ok) {
    throw new Error(`Google Docs export failed: ${response.status} ${response.statusText}`)
  }

  exported = await response.text()
}
const styleMatch = exported.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
const bodyMatch = exported.match(/<body[^>]*>([\s\S]*?)<\/body>/i)

if (!styleMatch || !bodyMatch) {
  throw new Error('Google Docs export did not contain the expected style and body elements')
}

let sourceBody = bodyMatch[1]
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<(?:iframe|object|embed)\b[^>]*>[\s\S]*?<\/(?:iframe|object|embed)>/gi, '')
  .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
  .replace(/<p[^>]*>(?:\s|&nbsp;|<span[^>]*>\s*<\/span>)*<\/p>/gi, '')
sourceBody = applyEmphasisClasses(sourceBody, docEmphasisClasses(styleMatch[1]))

const generatorSource = await readFile(scriptPath, 'utf8')
const sourceHash = createHash('sha256').update(sourceBody).update('\0').update(generatorSource).digest('hex')

let previous = ''
try {
  previous = await readFile(outputPath, 'utf8')
} catch {
  // First generation.
}

if (previous.includes(`<!-- source-sha256: ${sourceHash} -->`)) {
  console.log('Warm Kitchen cookbook is already current.')
  process.exit(0)
}

const headingPattern = /<(h[12])\b([^>]*)>([\s\S]*?)<\/\1>/gi
const headings = []
let match

while ((match = headingPattern.exec(sourceBody))) {
  const [, tag, attributes, innerHtml] = match
  const id = attributes.match(/\bid="([^"]+)"/i)?.[1]
  if (!id) continue

  const fullText = cleanText(innerHtml)
  const { title, tags } = tag.toLowerCase() === 'h2'
    ? splitRecipeHeading(fullText)
    : { title: fullText, tags: [] }

  headings.push({ tag: tag.toLowerCase(), id, fullText, title, tags })
}

if (!headings.some((heading) => heading.tag === 'h1') || !headings.some((heading) => heading.tag === 'h2')) {
  throw new Error('The exported document did not contain the expected chapter and recipe headings')
}

const chapters = []
let activeChapter = null

for (const heading of headings) {
  if (heading.tag === 'h1') {
    activeChapter = { ...heading, children: [] }
    chapters.push(activeChapter)
  } else if (activeChapter) {
    activeChapter.children.push(heading)
  }
}

const recipes = headings.filter((heading) => heading.tag === 'h2')
const taggedRecipeCount = recipes.filter((heading) => heading.tags.length > 0).length
const sourceUpdated = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'America/New_York',
}).format(new Date())

let recipeIndex = 0
sourceBody = sourceBody.replace(headingPattern, (whole, tag, attributes, innerHtml) => {
  const normalizedTag = tag.toLowerCase()
  const id = attributes.match(/\bid="([^"]+)"/i)?.[1]
  if (!id) return whole

  if (normalizedTag === 'h1') {
    const title = cleanText(innerHtml)
    const chapterMatch = title.match(/^(\d+)\.\s*(.+)$/)
    if (!chapterMatch) return `<h1${attributes}>${innerHtml}</h1>`

    return `<h1${attributes} data-chapter="${chapterMatch[1]}"><span class="chapter-kicker">Chapter ${chapterMatch[1]}</span><span class="chapter-title">${escapeHtml(chapterMatch[2])}</span></h1>`
  }

  const recipe = recipes[recipeIndex++]
  const tagHtml = jobTagsHtml(recipe.tags)

  return `<h2${attributes}><span class="recipe-heading-text">${escapeHtml(recipe.title)}</span><button class="copy-link" type="button" data-copy-id="${escapeHtml(id)}" aria-label="Copy link to ${escapeHtml(recipe.title)}" title="Copy recipe link">${linkIcon()}</button>${tagHtml}</h2>`
})

sourceBody = sourceBody.replace(/<h3\b([^>]*)>([\s\S]*?)<\/h3>/gi, (whole, attributes, innerHtml) => {
  const { title, tags } = splitRecipeHeading(cleanText(innerHtml))
  if (!tags.length) return whole
  return `<h3${attributes}><span class="recipe-heading-text">${escapeHtml(title)}</span>${jobTagsHtml(tags)}</h3>`
})

const chapterNav = chapters.map((chapter) => {
  const count = chapter.children.length
  const countMarkup = count ? `<span class="toc-count">${count}</span>` : ''
  return `<a class="toc-link" href="#${escapeHtml(chapter.id)}" data-section="${escapeHtml(chapter.id)}"><span>${escapeHtml(chapter.title)}</span>${countMarkup}</a>`
}).join('')

const searchData = JSON.stringify(recipes.map((recipe) => ({
  id: recipe.id,
  title: recipe.title,
  tags: recipe.tags,
}))).replace(/</g, '\\u003c')

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="The Warm Kitchen — a scrollable pescatarian cookbook from the world's warming traditions.">
  <meta name="color-scheme" content="light">
  <title>The Warm Kitchen — Cookbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,400&amp;family=Inter:wght@500;600&amp;family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&amp;display=swap" rel="stylesheet">
  <style>
    :root {
      --paper: #fbf8f3;
      --surface: #ffffff;
      --ink: #2b2420;
      --muted: #6d5a4c;
      --faint: #9a8573;
      --line: #e6dacb;
      --wash: #f4ede3;
      --accent: #b5532c;
      --accent-ink: #a2441f;
      --accent-soft: #f4ddd0;
      --good: #4e6a2b;
      --t-warm-bg: #f4ddd0; --t-warm: #a2441f;
      --t-oil-bg: #f3e7c6; --t-oil: #85610e;
      --t-build-bg: #e3e7d3; --t-build: #52602a;
      --t-blood-bg: #f0d6d6; --t-blood: #8e2a2e;
      --t-phlegm-bg: #dce5ea; --t-phlegm: #3a5a6c;
      --t-calm-bg: #e6e0ec; --t-calm: #5d4d73;
      --display: "Fraunces", Georgia, "Times New Roman", serif;
      --body: "Source Serif 4", Georgia, "Times New Roman", serif;
      --label: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
      --rail: 320px;
      color-scheme: light;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; scroll-padding-top: 28px; }
    body { margin: 0; background: var(--paper); color: var(--ink); font: 400 18px/1.68 var(--body); -webkit-font-smoothing: antialiased; }
    body.menu-open { overflow: hidden; }
    button, input { font: inherit; color: inherit; }
    button { cursor: pointer; }
    a { color: var(--accent-ink); }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    [hidden] { display: none !important; }
    .visually-hidden { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

    .progress-track { position: fixed; z-index: 80; top: 0; left: var(--rail); right: 0; height: 2px; background: var(--line); }
    .progress-bar { width: 0; height: 100%; background: var(--accent); transform-origin: left; }

    .mobile-bar { display: none; }
    .menu-scrim { display: none; }
    .toc-rail { position: fixed; z-index: 60; inset: 0 auto 0 0; width: var(--rail); overflow-y: auto; background: var(--surface); border-right: 1px solid var(--line); }
    .toc-inner { min-height: 100%; display: flex; flex-direction: column; padding: 30px 28px 24px; }
    .eyebrow { margin: 0 0 6px; color: var(--accent); font: 600 10px/1 var(--label); letter-spacing: .2em; text-transform: uppercase; }
    .toc-title { margin: 0; font: 300 34px/1.05 var(--display); }
    .toc-subtitle { margin: 9px 0 0; color: var(--muted); font-size: 14px; line-height: 1.4; }
    .finder-link { display: flex; align-items: center; gap: 8px; min-height: 40px; margin-top: 18px; padding: 0 12px; border: 1px solid var(--line); border-radius: 6px; color: var(--accent-ink); font: 600 11px/1 var(--label); letter-spacing: .08em; text-transform: uppercase; text-decoration: none; transition: background .15s, border-color .15s; }
    .finder-link:hover { background: var(--wash); border-color: var(--accent); }
    .search-wrap { position: relative; margin: 14px 0 22px; }
    .search-wrap svg { position: absolute; left: 12px; top: 50%; width: 17px; height: 17px; transform: translateY(-50%); color: var(--faint); pointer-events: none; }
    .search-input { width: 100%; min-height: 44px; padding: 10px 36px 10px 38px; border: 1px solid var(--line); border-radius: 6px; background: var(--paper); font: 500 13px/1.3 var(--label); }
    .search-input::placeholder { color: var(--faint); }
    .search-clear { position: absolute; right: 4px; top: 4px; width: 36px; height: 36px; border: 0; background: transparent; color: var(--faint); font: 500 20px/1 var(--label); }
    .toc-label { margin: 0 0 8px; color: var(--faint); font: 600 10px/1 var(--label); letter-spacing: .16em; text-transform: uppercase; }
    .toc-list { display: flex; flex-direction: column; gap: 1px; }
    .toc-link { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin: 0 -28px; padding: 8px 28px; border-right: 2px solid transparent; color: var(--muted); font: 500 12px/1.35 var(--label); text-decoration: none; transition: color .15s, background .15s, border-color .15s; }
    .toc-link:hover { color: var(--ink); background: var(--wash); }
    .toc-link.is-active { color: var(--ink); background: var(--wash); border-right-color: var(--accent); }
    .toc-count { flex: none; color: var(--faint); font-size: 10px; font-variant-numeric: tabular-nums; }
    .search-results { display: flex; flex-direction: column; gap: 1px; }
    .search-result { display: block; margin: 0 -28px; padding: 9px 28px; color: var(--muted); font: 500 12px/1.35 var(--label); text-decoration: none; }
    .search-result:hover { color: var(--ink); background: var(--wash); }
    .search-result-tags { display: block; margin-top: 3px; color: var(--faint); font-size: 9px; letter-spacing: .1em; text-transform: uppercase; }
    .search-empty { color: var(--faint); font: 500 12px/1.5 var(--label); }
    .toc-footer { margin-top: auto; padding-top: 24px; }
    .sync-state { display: flex; align-items: center; gap: 8px; margin: 0; color: var(--faint); font: 500 11px/1.35 var(--label); }
    .sync-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--good); }
    .source-link { display: inline-block; margin-top: 8px; color: var(--faint); font: 500 10px/1.4 var(--label); letter-spacing: .06em; text-transform: uppercase; text-decoration: none; }
    .source-link:hover { color: var(--accent-ink); }
    .close-menu { display: none; }

    .reader { margin-left: var(--rail); min-width: 0; }
    .article-shell { width: min(100%, 880px); margin: 0 auto; padding: 76px clamp(30px, 6vw, 72px) 120px; }

    #cookbook-content { color: var(--ink); font: 400 18px/1.68 var(--body); }
    #cookbook-content > * { max-width: 100%; }
    #cookbook-content p { margin: 0 0 1em; padding: 0 !important; text-indent: 0 !important; }
    #cookbook-content p.title { margin: 0 0 12px; color: var(--ink); font: 300 clamp(48px, 8vw, 76px)/.98 var(--display); letter-spacing: -.025em; }
    #cookbook-content p.subtitle { margin: 0 0 96px; max-width: 680px; color: var(--muted); font: italic 400 clamp(19px, 2.4vw, 24px)/1.5 var(--body); }
    #cookbook-content h1 { display: block; margin: 104px 0 36px; padding: 0 0 18px; border-bottom: 1px solid var(--line); color: var(--ink); font: 300 clamp(38px, 5vw, 58px)/1.08 var(--display); letter-spacing: -.015em; scroll-margin-top: 34px; }
    #cookbook-content h1:first-of-type { margin-top: 0; }
    #cookbook-content h1[data-chapter] { display: flex; flex-direction: column; gap: 10px; }
    .chapter-kicker { color: var(--accent); font: 600 11px/1 var(--label); letter-spacing: .18em; text-transform: uppercase; }
    .chapter-title { display: block; }
    #cookbook-content h2 { display: block; margin: 72px 0 22px; padding: 28px 0 0; border-top: 1px solid var(--line); color: var(--ink); font: 400 clamp(27px, 3.4vw, 34px)/1.18 var(--display); letter-spacing: -.01em; scroll-margin-top: 34px; }
    .recipe-heading-text { margin-right: 4px; }
    .job-tags { display: flex; flex-wrap: wrap; gap: 5px; align-items: center; margin-top: 12px; }
    .job-tag { padding: 5px 7px 4px; border-radius: 3px; font: 600 9px/1 var(--label); letter-spacing: .12em; text-transform: uppercase; }
    .tag-warm { color: var(--t-warm); background: var(--t-warm-bg); }
    .tag-oil { color: var(--t-oil); background: var(--t-oil-bg); }
    .tag-build { color: var(--t-build); background: var(--t-build-bg); }
    .tag-blood { color: var(--t-blood); background: var(--t-blood-bg); }
    .tag-phlegm { color: var(--t-phlegm); background: var(--t-phlegm-bg); }
    .tag-calm { color: var(--t-calm); background: var(--t-calm-bg); }
    .copy-link { display: inline-grid; place-items: center; width: 38px; height: 38px; margin: -4px 0 0; padding: 0; border: 0; vertical-align: middle; border-radius: 4px; background: transparent; color: var(--faint); opacity: 0; transition: color .15s, background .15s, opacity .15s; }
    #cookbook-content h2:hover .copy-link, .copy-link:focus-visible { opacity: 1; }
    .copy-link:hover { color: var(--accent-ink); background: var(--wash); }
    .copy-link svg { width: 17px; height: 17px; }
    #cookbook-content h3 { margin: 40px 0 14px; color: var(--ink); font: 400 23px/1.25 var(--display); }
    #cookbook-content h3 .job-tags { margin-top: 10px; }
    #cookbook-content .index-entry { font-size: 16px; line-height: 1.75; color: var(--muted); }
    #cookbook-content .index-entry .b { color: var(--ink); font: 600 11px/1 var(--label); letter-spacing: .12em; text-transform: uppercase; }
    #cookbook-content strong, #cookbook-content b, #cookbook-content .b { font-weight: 600; }
    #cookbook-content .i { font-style: italic; }
    #cookbook-content .u { text-decoration: underline; }
    #cookbook-content .s { text-decoration: line-through; }
    #cookbook-content .super { vertical-align: super; font-size: .75em; }
    #cookbook-content .sub { vertical-align: sub; font-size: .75em; }
    #cookbook-content em, #cookbook-content i { font-style: italic; }
    #cookbook-content ul, #cookbook-content ol { margin: 12px 0 26px !important; padding-left: 1.35em !important; }
    #cookbook-content ul { list-style: disc outside !important; }
    #cookbook-content ol { list-style: decimal outside !important; }
    #cookbook-content li { margin: 0 0 9px !important; padding: 0 0 0 5px !important; color: var(--ink); }
    #cookbook-content li::before { content: none !important; }
    #cookbook-content a { color: var(--accent-ink); text-underline-offset: 3px; }
    #cookbook-content .why-note, #cookbook-content .next-day-note { margin: 24px 0 28px !important; padding: 16px 20px !important; border-left: 3px solid var(--accent); border-radius: 0 6px 6px 0; background: var(--wash); color: var(--muted); font-size: 17px; line-height: 1.6; }
    #cookbook-content .why-note { font-style: italic; }
    #cookbook-content .next-day-note { border-left-color: var(--good); }
    #cookbook-content .why-note strong, #cookbook-content .next-day-note strong { color: var(--accent-ink); font: 600 10px/1 var(--label); letter-spacing: .12em; text-transform: uppercase; }
    #cookbook-content table { width: 100%; border-collapse: collapse; margin: 22px 0 32px; font-size: 16px; }
    #cookbook-content th, #cookbook-content td { padding: 10px 12px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
    #cookbook-content th { font: 600 11px/1.25 var(--label); letter-spacing: .08em; text-transform: uppercase; }
    .reader-footer { display: flex; justify-content: space-between; gap: 16px; padding: 22px clamp(24px, 5vw, 56px); border-top: 1px solid var(--line); background: var(--surface); }
    .back-to-top { min-height: 44px; display: inline-flex; align-items: center; gap: 8px; border: 0; text-decoration: none; background: transparent; color: var(--faint); font: 600 10px/1 var(--label); letter-spacing: .12em; text-transform: uppercase; }
    .back-to-top:hover { color: var(--accent-ink); }

    .toast { position: fixed; z-index: 100; left: 50%; bottom: 24px; transform: translate(-50%, 14px); padding: 10px 14px; border: 1px solid var(--line); border-radius: 5px; background: var(--surface); box-shadow: 0 8px 24px rgba(60,40,25,.12); color: var(--muted); font: 500 12px/1 var(--label); opacity: 0; pointer-events: none; transition: opacity .18s, transform .18s; }
    .toast.is-visible { opacity: 1; transform: translate(-50%, 0); }

    @media (max-width: 900px) {
      :root { --rail: 0px; }
      html { scroll-padding-top: 76px; }
      .progress-track { left: 0; top: 68px; }
      .mobile-bar { position: sticky; z-index: 50; top: 0; min-height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 16px; border-bottom: 1px solid var(--line); background: rgba(255,255,255,.96); backdrop-filter: blur(8px); }
      .mobile-actions { display: inline-flex; gap: 8px; flex: none; }
      .mobile-bar .menu-button, .mobile-bar .menu-button svg { flex: none; }
      .mobile-actions a.menu-button { color: var(--accent-ink); text-decoration: none; }
      .mobile-title { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 400 19px/1 var(--display); }
      @media (max-width: 420px) { .mobile-title { visibility: hidden; } }
      .menu-button { min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 12px; border: 1px solid var(--line); border-radius: 5px; background: var(--surface); color: var(--muted); font: 600 11px/1 var(--label); letter-spacing: .06em; text-transform: uppercase; }
      .menu-scrim { position: fixed; z-index: 64; inset: 0; display: block; background: rgba(43,36,32,.3); opacity: 0; pointer-events: none; transition: opacity .18s; }
      .toc-rail { width: min(88vw, 360px); transform: translateX(-102%); box-shadow: 10px 0 30px rgba(43,36,32,.12); transition: transform .2s ease; }
      body.menu-open .toc-rail { transform: translateX(0); }
      body.menu-open .menu-scrim { opacity: 1; pointer-events: auto; }
      .close-menu { display: inline-flex; min-height: 44px; align-items: center; justify-content: center; margin-top: 20px; border: 1px solid var(--line); border-radius: 5px; background: var(--surface); color: var(--muted); font: 600 11px/1 var(--label); letter-spacing: .06em; text-transform: uppercase; }
      .reader { margin-left: 0; }
      .article-shell { padding: 52px clamp(20px, 6vw, 46px) 84px; }
      #cookbook-content p.subtitle { margin-bottom: 72px; }
      #cookbook-content h1 { scroll-margin-top: 90px; }
      #cookbook-content h2 { scroll-margin-top: 90px; }
      .copy-link { opacity: 1; }
    }

    @media (max-width: 560px) {
      body { font-size: 17px; }
      .article-shell { padding-top: 42px; }
      #cookbook-content { font-size: 17px; line-height: 1.64; }
      #cookbook-content p.title { font-size: 48px; }
      #cookbook-content h1 { margin-top: 82px; font-size: 38px; }
      #cookbook-content h2 { margin-top: 58px; font-size: 26px; }
      .job-tags { order: 3; width: 100%; }
      .copy-link { margin-left: auto; }
    }

    @media print {
      .mobile-bar, .toc-rail, .menu-scrim, .progress-track, .reader-footer, .toast, .copy-link { display: none !important; }
      .reader { margin: 0; }
      .article-shell { width: 100%; padding: 0; }
      body { background: #fff; font-size: 11pt; }
      #cookbook-content h1, #cookbook-content h2 { break-after: avoid; }
    }

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
    }
  </style>
</head>
<body>
  <!-- source-sha256: ${sourceHash} -->
  <div class="progress-track" aria-hidden="true"><div class="progress-bar" id="progress-bar"></div></div>

  <header class="mobile-bar">
    <button class="menu-button" id="menu-open" type="button" aria-controls="contents" aria-expanded="false">${menuIcon()}<span>Contents</span></button>
    <span class="mobile-title">The Warm Kitchen</span>
    <span class="mobile-actions">
      <a class="menu-button" href="${FINDER_URL}" aria-label="Back to the Recipe Finder">Finder</a>
      <button class="menu-button" id="mobile-search" type="button" aria-label="Search the cookbook">${searchIcon()}</button>
    </span>
  </header>

  <div class="menu-scrim" id="menu-scrim" aria-hidden="true"></div>

  <aside class="toc-rail" id="contents" aria-label="Cookbook contents">
    <div class="toc-inner">
      <header>
        <p class="eyebrow">The Warm Kitchen</p>
        <p class="toc-title">Cookbook</p>
        <p class="toc-subtitle">${taggedRecipeCount} recipes · ${recipes.length} indexed sections</p>
        <a class="finder-link" href="${FINDER_URL}"><span aria-hidden="true">←</span> Recipe Finder</a>
      </header>

      <div class="search-wrap">
        ${searchIcon()}
        <label class="visually-hidden" for="cookbook-search">Search recipes</label>
        <input class="search-input" id="cookbook-search" type="search" placeholder="Search recipes or jobs" autocomplete="off">
        <button class="search-clear" id="search-clear" type="button" aria-label="Clear search" hidden>×</button>
      </div>

      <nav aria-label="Chapters">
        <div id="chapter-navigation">
          <p class="toc-label">Contents</p>
          <div class="toc-list">${chapterNav}</div>
        </div>
        <div id="recipe-search" hidden>
          <p class="toc-label">Recipe results</p>
          <div class="search-results" id="search-results"></div>
          <p class="search-empty" id="search-empty" hidden>No recipes match that search.</p>
        </div>
      </nav>

      <footer class="toc-footer">
        <p class="sync-state"><span class="sync-dot" aria-hidden="true"></span><span>Synced ${escapeHtml(sourceUpdated)}</span></p>
        <a class="source-link" href="${SOURCE_EDIT_URL}" target="_blank" rel="noopener noreferrer">Open source document ↗</a>
        <button class="close-menu" id="menu-close" type="button">Close contents</button>
      </footer>
    </div>
  </aside>

  <main class="reader" id="main-content">
    <article class="article-shell">
      <div id="cookbook-content">${sourceBody}</div>
    </article>
    <footer class="reader-footer">
      <a class="back-to-top" href="${FINDER_URL}"><span aria-hidden="true">←</span> Recipe Finder</a>
      <button class="back-to-top" id="back-to-top" type="button">Back to top ${arrowIcon()}</button>
    </footer>
  </main>

  <div class="toast" id="toast" role="status" aria-live="polite">Recipe link copied</div>

  <script>
    const recipes = ${searchData};
    const body = document.body;
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    const menuScrim = document.getElementById('menu-scrim');
    const searchInput = document.getElementById('cookbook-search');
    const searchClear = document.getElementById('search-clear');
    const chapterNavigation = document.getElementById('chapter-navigation');
    const recipeSearch = document.getElementById('recipe-search');
    const searchResults = document.getElementById('search-results');
    const searchEmpty = document.getElementById('search-empty');
    const toast = document.getElementById('toast');
    let toastTimer;

    function setMenu(open) {
      body.classList.toggle('menu-open', open);
      menuOpen.setAttribute('aria-expanded', String(open));
      if (open) setTimeout(() => searchInput.focus(), 210);
      else menuOpen.focus();
    }

    menuOpen.addEventListener('click', () => setMenu(true));
    menuClose.addEventListener('click', () => setMenu(false));
    menuScrim.addEventListener('click', () => setMenu(false));
    document.getElementById('mobile-search').addEventListener('click', () => setMenu(true));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false);
    });

    document.querySelectorAll('.toc-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 900px)').matches) setMenu(false);
      });
    });

    const normalized = (value) => value.toLocaleLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');

    function renderSearch() {
      const query = normalized(searchInput.value.trim());
      const searching = query.length > 0;
      chapterNavigation.hidden = searching;
      recipeSearch.hidden = !searching;
      searchClear.hidden = !searching;
      if (!searching) return;

      const matches = recipes.filter((recipe) => normalized(recipe.title + ' ' + recipe.tags.join(' ')).includes(query));
      searchResults.replaceChildren(...matches.map((recipe) => {
        const link = document.createElement('a');
        link.className = 'search-result';
        link.href = '#' + recipe.id;
        link.textContent = recipe.title;
        if (recipe.tags.length) {
          const tags = document.createElement('span');
          tags.className = 'search-result-tags';
          tags.textContent = recipe.tags.join(' · ');
          link.append(tags);
        }
        link.addEventListener('click', () => {
          searchInput.value = '';
          renderSearch();
          if (window.matchMedia('(max-width: 900px)').matches) setMenu(false);
        });
        return link;
      }));
      searchEmpty.hidden = matches.length > 0;
    }

    searchInput.addEventListener('input', renderSearch);
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      renderSearch();
      searchInput.focus();
    });

    document.querySelectorAll('#cookbook-content p').forEach((paragraph) => {
      const text = paragraph.textContent.trim();
      if (/^why\\b/i.test(text)) paragraph.classList.add('why-note');
      if (/^next day\\b/i.test(text)) paragraph.classList.add('next-day-note');
    });

    document.querySelectorAll('#cookbook-content h1').forEach((heading) => {
      if (!/^index\\b/i.test(heading.textContent.trim())) return;
      for (let node = heading.nextElementSibling; node && node.tagName !== 'H1'; node = node.nextElementSibling) {
        if (node.tagName === 'P') node.classList.add('index-entry');
      }
    });

    function updateProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      document.getElementById('progress-bar').style.width = (progress * 100).toFixed(2) + '%';
    }

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    const chapterLinks = new Map([...document.querySelectorAll('.toc-link')].map((link) => [link.dataset.section, link]));
    const chapterObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      chapterLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.section === visible.target.id));
    }, { rootMargin: '-8% 0px -82% 0px', threshold: 0 });

    document.querySelectorAll('#cookbook-content h1[id]').forEach((heading) => chapterObserver.observe(heading));

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('is-visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1800);
    }

    document.querySelectorAll('.copy-link').forEach((button) => {
      button.addEventListener('click', async () => {
        const url = new URL(window.location.href);
        url.hash = button.dataset.copyId;
        try {
          await navigator.clipboard.writeText(url.href);
          showToast('Recipe link copied');
        } catch {
          window.location.hash = button.dataset.copyId;
          showToast('Recipe link selected');
        }
      });
    });

    document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  </script>
</body>
</html>
`

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, html)
console.log(`Updated ${outputPath} from Google Docs (${taggedRecipeCount} recipes; ${recipes.length} indexed sections).`)

// Google Docs exports Arial/11pt/line-height 1.15 on positional .cN classes, which would override
// the book's type. Drop the doc stylesheet and keep only inline emphasis, as stable classes.
function docEmphasisClasses(css) {
  const emphasis = new Map()
  for (const [, selector, body] of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const name = selector.trim().match(/^\.(c\d+)$/)?.[1]
    if (!name) continue
    const flags = []
    for (const declaration of body.split(';')) {
      const [property = '', value = ''] = declaration.split(':').map((part) => part.trim().toLowerCase())
      if (property === 'font-weight' && Number(value) >= 600) flags.push('b')
      if (property === 'font-style' && value === 'italic') flags.push('i')
      if (property === 'text-decoration' && value.includes('underline')) flags.push('u')
      if (property === 'text-decoration' && value.includes('line-through')) flags.push('s')
      if (property === 'vertical-align' && (value === 'super' || value === 'sub')) flags.push(value)
    }
    if (flags.length) emphasis.set(name, flags)
  }
  return emphasis
}

function applyEmphasisClasses(html, emphasis) {
  return html.replace(/<span class="([^"]*)"/g, (whole, classes) => {
    const flags = [...new Set(classes.split(/\s+/).flatMap((name) => emphasis.get(name) || []))]
    return flags.length ? `<span class="${classes} ${flags.join(' ')}"` : whole
  })
}

function jobTagsHtml(tags) {
  if (!tags.length) return ''
  return `<span class="job-tags" aria-label="Recipe jobs">${tags.map((tagName) => `<span class="job-tag tag-${tagName.toLowerCase()}">${tagName}</span>`).join('')}</span>`
}

function splitRecipeHeading(value) {
  const [name, tagText = ''] = value.split(/\s+—\s+/, 2)
  const allowed = new Set(['WARM', 'OIL', 'BUILD', 'BLOOD', 'PHLEGM', 'CALM'])
  const tags = tagText.split(/\s*·\s*/).map((tag) => tag.trim().toUpperCase()).filter((tag) => allowed.has(tag))
  return { title: name.trim(), tags }
}

function cleanText(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}

function decodeEntities(value) {
  const named = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    mdash: '—', ndash: '–', middot: '·', hellip: '…',
  }
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (whole, entity) => {
    if (entity[0] === '#') {
      const hex = entity[1].toLowerCase() === 'x'
      const codePoint = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10)
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : whole
    }
    return named[entity.toLowerCase()] ?? whole
  })
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character])
}

function searchIcon() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
}

function menuIcon() {
  return '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
}

function linkIcon() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 13.5a4 4 0 0 0 5.7.1l2.2-2.2a4 4 0 0 0-5.7-5.7l-1.3 1.3M13.5 10.5a4 4 0 0 0-5.7-.1l-2.2 2.2a4 4 0 0 0 5.7 5.7l1.3-1.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
}

function arrowIcon() {
  return '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="m7 11 5-5 5 5M12 6v12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
}
