---
title: Overview
slug: /
---

# Docs platform

`docs.itzemoji.com` hosts the documentation of every project on one domain,
each under its own path: `/aeroflare/`, `/platform/` (this site), and so on.

Each project **owns its docs completely**. It keeps them in its own repository,
builds them with its own tool and decides when to publish. Nothing about
one project can break another.

## The three kinds of repository

| Repository | Role |
| --- | --- |
| A **project's docs repo**, e.g. [`aeroflare-docs`](https://github.com/ItzEmoji/aeroflare-docs) | Holds the docs and builds them. On every push to `main` it publishes its build. |
| [`docs-deployer`](https://github.com/ItzEmoji/docs-deployer) | Collects what every project published, adds the landing page and deploys the whole site. Never builds a project. |
| [`docs-dotfiles`](https://github.com/ItzEmoji/docs-dotfiles) | This documentation. It's published like any other project. |

## In one picture

```
aeroflare-docs ──build──▶ site/aeroflare ─┐
docs-dotfiles  ──build──▶ site/platform  ─┼─▶ docs-deployer ─▶ docs.itzemoji.com
                          projects.json  ─┘
```

Each project pushes its finished HTML to **its own branch** in
`docs-deployer`. The deployer combines the branches listed in
`projects.json` into one site.

## Where to go next

- [How it works](./how-it-works.md): what happens between a push and the live site, and why it's built this way.
- [Add a project](./add-a-project.md): publish a new project's docs.
- [Operations](./operations.md): remove, rename, roll back, troubleshoot.
