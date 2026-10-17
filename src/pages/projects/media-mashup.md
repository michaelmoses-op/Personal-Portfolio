---
layout: ../../layouts/ProjectLayout.astro
title: 'Media Mashup'
icon: '/projects/media-mashup/icon.png'
description: 'A personal movie ranking app built on head-to-head picks and ELO scores, with a TMDB-backed library and optional Letterboxd import.'
image:
    url: '/projects/media-mashup/home.jpg'
    alt: 'Media Mashup home dashboard with rankings, stats, and the next comparison'
gallery:
    - url: '/projects/media-mashup/demo.mp4'
      alt: 'Walkthrough of comparing films and viewing rankings in Media Mashup'
      type: 'video'
      poster: '/projects/media-mashup/welcome.png'
    - url: '/projects/media-mashup/compare.jpg'
      alt: 'Head-to-head compare screen for picking a preferred film'
    - url: '/projects/media-mashup/movies.jpg'
      alt: 'My Movies library with TMDB search and Letterboxd CSV import'
    - url: '/projects/media-mashup/rankings.jpg'
      alt: 'Personal movie rankings with ELO scores and genre breakdown'
    - url: '/projects/media-mashup/welcome.png'
      alt: 'Media Mashup marketing landing page with example matchup'
tags: ["React", "TypeScript", "Vite", "TanStack Query", "FastAPI", "PostgreSQL"]
github: 'https://github.com/michaelmoses-op/TopFrame'
demo: 'https://dreamy-syrniki-b6b401.netlify.app/'
---

Letterboxd and spreadsheets tell you what you watched, but they do not give you a living order you refine by choosing between two titles at a time. Media Mashup is for that: you keep a library of films you have seen, compare them in pairs, and each pick updates ELO on your account only. Rankings, history, and social views all read from the same comparison data. The app talks to TMDB for search and metadata; your rankings are not shared as one global score per film.

## What it does

You register, sign in, and build a library by searching TMDB or uploading a Letterboxd export (the watched CSV from Letterboxd’s data export is the usual choice). Rows that do not match TMDB confidently are skipped and listed in an import report.

The compare screen shows two library films. The server prefers pairs you have not compared yet; when the library is small or fully covered, it may repeat pairs. Picking a winner saves the comparison and adjusts both films’ ELO. Rankings and dashboard-style views reflect that order. You can add an optional note on a comparison, browse history, and reset all ELO and comparison history from settings while keeping the library list.

Social features include following users, a feed of comparison and library activity, and reactions and comments on comparisons. Mutual followers can compare taste on movies you both have in library. Profile and theme settings, email verification, and password reset sit alongside account management on the settings side.

## Stack

The client is React 19 and TypeScript, built with Vite. React Router handles navigation. TanStack Query loads and caches API data for the library, compare flow, rankings, and social screens. Tailwind CSS covers layout and theming. Vitest covers frontend tests alongside the TypeScript compiler.

The API is Python FastAPI with async SQLAlchemy and Alembic migrations on PostgreSQL. JWT secures authenticated routes. TMDB supplies search and film details; Resend sends verification and password email when configured. Pytest covers backend behavior.
