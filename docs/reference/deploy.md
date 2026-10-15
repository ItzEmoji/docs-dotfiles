---
title: Deploy workflow
---

# Deploy workflow

`docs-deployer/.github/workflows/deploy.yml` builds and ships the whole site.

## When it runs

- on every push to a `site/*` branch, which means a project published
- on every push to `main` in `docs-deployer`, e.g. a change to `projects.json`
- by hand, from the Actions tab

It always uses `main`'s code and `main`'s `projects.json`, whichever branch
triggered it.

## What it does

1. Installs the assembler and runs its tests.
2. `bun run build`:
   - empties `dist/`
   - for each project in `projects.json` with a `site/<path>` branch,
     copies that branch's files into `dist/<path>/`
   - writes the landing page (`index.html`, `app.css`, `fonts/`)
3. Uploads `dist/` as the **site** artifact, kept for 7 days.
4. Deploys `dist/` to Cloudflare Pages, if `CLOUDFLARE_API_TOKEN` is set.

Problems with a single project show up as warnings on the run, never as a
failure. See [Troubleshooting](../operations.md#troubleshooting).

## Running it locally

```bash
git clone https://github.com/ItzEmoji/docs-deployer && cd docs-deployer
bun install
bun run build   # fetches the site/* branches from GitHub
bun run serve   # http://localhost:8080
```

## Configuration

| Kind | Name | Description |
| --- | --- | --- |
| Secret | `CLOUDFLARE_API_TOKEN` | Token with *Cloudflare Pages: Edit*. Without it, the deploy step is skipped. |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID. |
| Variable | `PAGES_PROJECT` | Pages project name. Defaults to `docs-deployer`. |
