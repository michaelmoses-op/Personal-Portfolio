---
layout: ../../layouts/ProjectLayout.astro
title: 'Harborwire'
icon: '/projects/harborwire/icon.svg'
description: 'A browser-based learning tool that acts as a simulator for CI/CD, Docker, and Kubernetes from commit to pod. Build the chart, connect stages, and read the run log.'
image:
    url: '/projects/harborwire/landing.png'
    alt: 'Harborwire landing page explaining the path to production'
gallery:
    - url: '/projects/harborwire/demo.mp4'
      alt: 'Walkthrough of a sample pipeline in the Harborwire learning simulator'
      type: 'video'
      poster: '/projects/harborwire/landing.png'
    - url: '/projects/harborwire/simulator.png'
      alt: 'Harborwire learning simulator with a CI/CD pipeline chart and run log'
    - url: '/projects/harborwire/detail.png'
      alt: 'Harborwire simulator with a Kubernetes Deployment resource panel open'
tags: ["React", "TypeScript", "Vite", "React Flow"]
github: 'https://github.com/michaelmoses-op/Harborwire'
demo: 'https://harborwire.vercel.app/'
---

Harborwire is a learning project: a browser simulator for the stretch of a delivery pipeline between a Git commit and a running pod. It is meant for developers who are still wiring these ideas together—not for operating a real pipeline. You put stages on a chart, connect them, and run the chart locally. The log explains what each stage would do in plain language. Nothing leaves your machine: the page does not call a cluster, a registry, or a CI service.

The landing page teaches the four handoffs in order. A push starts CI, which checks the commit out and runs lint and tests. Docker builds an image from the Dockerfile and that checkout. The registry is where the tag actually lives, because a cluster cannot see an image that only exists on the runner. Kubernetes then takes that tag: a Deployment starts the pods, a Service gives them a stable address, and an Ingress is the route in from outside.

The simulator is where you practice that same path on an editable chart. Cards sit in a palette on the left, grouped as source, CI, Docker, registry, and Kubernetes. Each card has an input on the left and an output on the right. A wire is one handoff, and the chart only keeps a wire when that pair is a real handoff. An image build has to pass through the registry before a Deployment can use it, and a Service does not connect back to Git. A wire that does not belong is dropped, and a short reason appears—on purpose, so the rules stick.

Run pipeline walks the chart from the start and writes a line for each card. Step does the same thing one card at a time, which helps when you are learning the order of operations. If the test card is set to fail, the walk stops there and the cards after it stay idle, so you can see where a broken pipeline actually stops. The log is written from the cards and the fields on them: the repo, the image tag, the replica count, the namespace.

## What it does

Three built-in samples are starting points for practice. Healthy pipeline is a small service called buoy, from a Git repo on main through to an Ingress. Failing tests is that same chart with the test step set to fail. Registry rollout starts later, from an image that is already published, and updates the Deployment—useful when you already understand the earlier steps. Selecting a card opens a panel for that resource: what it takes in, what it hands off, and the few fields worth changing. A chart you build is stored in the browser, so you can leave and come back to the same exercise.

## Stack

React and TypeScript, with Vite for local development and the production build, and React Router between the landing page and the simulator. The canvas is React Flow. The styles are plain CSS. Vitest covers the connection rules and the text a run produces. The whole thing runs in the browser as a static site; the repo includes a Vercel rewrite so a refresh on `/simulator` still loads the app.
