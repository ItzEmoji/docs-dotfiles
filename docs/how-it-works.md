---
title: How it works
---

# How it works

## From a push to the live site

1. **You push to `main`** in a project's docs repo.
2. **The project builds itself.** Its `docs.yml` calls the reusable
   [publish workflow](./reference/publish-workflow.md) from `docs-deployer`.
   That workflow checks out the project, runs its build command with
   `DOCS_BASE_PATH=/<path>/`, and checks that the output has an
   `index.html`.
3. **It publishes to its own branch.** The output is committed as a single
   commit and force-pushed to `site/<path>` in `docs-deployer`. The commit
   message records which repo and commit it came from.
4. **The deployer assembles.** That push triggers
   [`deploy.yml`](./reference/deploy.md). It fetches the newest commit of every
   `site/*` branch listed in `projects.json`, puts each one into
   `dist/<path>/`, and writes the landing page.
5. **The whole site is deployed** to Cloudflare Pages in one step. Until the
   new version is complete, readers keep seeing the old one.

A push that doesn't change the docs still republishes them. That's
harmless: the deploy produces the same site.

## Why one branch per project

Every project writes **only** to `site/<its path>`, and nothing else ever
writes there. That gives a few guarantees:

- **No races.** Two projects publishing at the same moment push to different
  branches, so neither has to retry or rebase.
- **No growing history.** Each publish replaces the branch with one fresh
  commit, so old builds don't pile up in git.
- **`main` stays clean.** The deployer's `main` holds only its own code and
  `projects.json`, never build output or bot commits.

## Why the deployer only assembles

The deployer never runs a project's build. Each project can use whatever
tool it likes (Docusaurus, VitePress, plain HTML) and pin its own versions.
A broken dependency in one project can't break another project's build,
because nothing builds them together.

## What keeps it stable

- **One project can't take the others down.** If a project is registered
  but has never published, or its branch has no `index.html`, it's left off
  the site with a warning on the run. Every other project still deploys.
- **Only registered projects go live.** A `site/*` branch with no entry in
  `projects.json` is reported and ignored.
- **Built from nothing every time.** `dist/` starts empty on every deploy, so
  removing a project really removes it.
- **One deploy at a time.** Deploys queue and are never cancelled halfway.
  If several publishes arrive during a deploy, only the newest waiting run is
  kept, and it picks up every branch's latest state anyway.
