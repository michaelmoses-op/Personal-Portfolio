---
layout: ../../layouts/ProjectLayout.astro
title: 'Fairlead'
icon: '/projects/fairlead/icon.svg'
description: 'A browser diagram tool for where data rests and which programs move it. Each wire is one direction, with a verb and a short payload name. Sister project to Harborwire.'
image:
    url: '/projects/fairlead/editor.png'
    alt: 'Orders snapshot diagram in the Fairlead editor with reading panel'
gallery:
    - url: '/projects/fairlead/demo.mp4'
      alt: 'Walkthrough of building and reading a diagram in Fairlead'
      type: 'video'
      poster: '/projects/fairlead/landing.png'
    - url: '/projects/fairlead/landing.png'
      alt: 'Fairlead landing page with an example architecture diagram'
tags: ["React", "TypeScript", "Vite", "React Flow"]
github: 'https://github.com/michaelmoses-op/Fairlead'
demo: 'https://fairlead.vercel.app/'
---

Architecture sketches go stale, and they often hide which way the data actually moves. Fairlead is a chart you draw in the browser for that: a card for each place data rests or each program that moves it, and a wire for each movement. It does not connect to AWS, a database, or GitHub. The picture stays on your machine. [Harborwire](/projects/harborwire/) is the sister project—a learning simulator for the pipeline path—while Fairlead is the one for drawing the diagram itself.

## What it does

You build the chart from cards: a person or client, a public API, a service, a worker, a database, a cache, a queue, or a system another team owns. Output is the port on the right and input is the port on the left. Drawing from one to the other adds a wire, and the wire has to say what happens—reads, writes, returns, publishes, or receives—plus a short payload such as “customer row.” A request and the response to it are two wires. One wire does not mean the two sides talk both ways.

The panel under the chart reads the same picture back as sentences, a table, and a few checks, including an empty payload. You can copy any of those, or take the JSON. Several diagrams can sit in the browser at once. Opening a JSON file loads a chart, and downloading one is how you move it to another machine.

## Stack

The interface is React 19 and TypeScript, bundled with Vite. React Router handles the landing page and the editor. The canvas is React Flow, which is where the cards, the wires, and the pan and zoom come from. Vitest covers the rules for a legal wire and the sentences in the panel.
