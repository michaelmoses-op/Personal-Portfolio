---
layout: ../../layouts/ProjectLayout.astro
title: 'Learned Hand'
icon: '/projects/learned-hand/icon.png'
description: 'A RAG reading companion for books you upload—structure-aware Q&A with citations across the full text.'
image:
    url: '/projects/learned-hand/reader.png'
    alt: 'Read and Ask view with full text, section index, and cited Q&A'
gallery:
    - url: '/projects/learned-hand/welcome.png'
      alt: 'Learned Hand landing page inviting readers to upload a book they own'
    - url: '/projects/learned-hand/library.png'
      alt: 'Private library listing uploaded books and ingestion status'
    - url: '/projects/learned-hand/concepts.png'
      alt: 'Concept map heatmap showing recurring ideas by book section'
tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "RAG", "Vite", "TanStack Query"]
github: 'https://github.com/michaelmoses-op/LearnedHand'
---

Learned Hand is a retrieval-augmented generation (RAG) app for long, difficult books—philosophy, history, anything where you need to follow an argument chapter by chapter. You upload an EPUB or PDF you own; the system parses structure, chunks and embeds the text, and answers your questions by retrieving relevant passages and generating a response grounded in those sources. Citations point back into your copy. It supports real reading; it is not a shortcut around the text.

## What it does

Each user has a private library. A worker ingests uploads (with format and size limits), builds section hierarchy, stores chunks with embeddings in Postgres/pgvector, and marks the document ready when processing completes. The read view shows the full book; RAG Q&A runs over the entire document—retrieval filtered by your user id and document id in SQL, then an LLM answer with streamed output and source references. Tutor mode uses the same pipeline but steers toward hints. Summaries, a concept map by section, and notes/highlights sit alongside reading. Auth is cookie-based; row-level security keeps accounts separated.

## Stack

The client is React 18 and TypeScript, built with Vite. TanStack Router handles navigation. TanStack Query loads and caches API data for the library, reader, summaries, concepts, and notes. Tailwind CSS covers layout and theming. The API client is generated from the OpenAPI spec. Vitest and the TypeScript compiler cover frontend checks.

The API is Python FastAPI with async SQLAlchemy and Alembic migrations on PostgreSQL, including pgvector for embedding search in the RAG pipeline. Cookie-based sessions (access, refresh, CSRF) secure authenticated routes; row-level security isolates each user’s data. A background worker ingests EPUBs and PDFs, chunks and embeds text, and powers cited Q&A over SSE. OpenAI supplies chat and embeddings in production; a fake provider supports local dev. Email handles verification and password reset when configured. Pytest covers backend behavior.
