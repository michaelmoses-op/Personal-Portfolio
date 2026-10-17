---
layout: ../../layouts/ProjectLayout.astro
title: 'Steel City Bus Tracker'
icon: '/projects/steel-city-bus-tracker/icon.png'
description: 'A web app for Pittsburgh Regional Transit—static routes and stops, live bus positions, service alerts, and trip planning over open GTFS data.'
image:
    url: '/projects/steel-city-bus-tracker/home.png'
    alt: 'Steel City Bus Tracker home with live route counts and quick links'
gallery:
    - url: '/projects/steel-city-bus-tracker/map.jpg'
      alt: 'Live map with bus positions streaming over SSE'
    - url: '/projects/steel-city-bus-tracker/routes.jpg'
      alt: 'Routes list with map preview and live status'
    - url: '/projects/steel-city-bus-tracker/stops.png'
      alt: 'Nearby stops with distance and location lookup'
    - url: '/projects/steel-city-bus-tracker/alerts.png'
      alt: 'PRT service alerts from GTFS-Realtime'
tags: ["Next.js", "Hono", "PostgreSQL", "Redis", "TanStack Query", "TypeScript"]
github: 'https://github.com/michaelmoses-op/Steel-City-Bus-Line'
demo: 'https://steel-city-bus-line-xi.vercel.app/'
---

I built this because the official tools are often wrong on route details, lag on live tracking, or are hard to use on a map. The app keeps PRT feeds on the server and focuses on presentation—clear maps, stop boards, and alerts—without asking the browser to talk to PRT directly.

## What it does

Users can browse the full route list with live indicators when buses are on the map, open a route for schedule and shape, find nearby stops, and view predicted arrivals at a stop from GTFS-Realtime trip updates. A live map streams vehicle positions over SSE, with stale GPS filtered out on the backend. Service alerts from the realtime feed appear on a dedicated page and on route-scoped views. Trip planning sends origin/destination through the API to OpenTripPlanner when that service is configured; walking and transit legs are shown on a map with optional live buses on the selected itinerary.

Static schedule data (routes, stops, trips, shapes) is imported from PRT’s GTFS bundle into Postgres with PostGIS for nearby-stop and map geometry queries. A background worker polls GTFS-RT on an interval, decodes protobuf, applies domain rules in shared TypeScript, and writes snapshots to Redis with TTL. The API reads Redis for live data and Postgres for schedule data and exposes versioned JSON routes plus an SSE endpoint for vehicles.

## Stack

The repo is a pnpm monorepo (Turborepo for builds and dev). Next.js (App Router) and Tailwind CSS power the web UI; MapLibre GL JS renders maps with a configurable basemap. Client data fetching uses TanStack Query for routes, stops, alerts, and arrivals, with polling where realtime isn’t streamed. TypeScript is used throughout.

Hono on Node.js is the public API: CORS for the browser, Zod-validated responses via shared packages, and Server-Sent Events for live vehicles. `services/worker` runs GTFS import and GTFS-RT ingest; `packages/transit-core` holds GTFS/RT parsing, staleness rules, and query logic with no HTTP dependency. `packages/db` uses Drizzle with PostgreSQL and PostGIS; Redis holds the latest vehicle, alert, and trip-update snapshots.
