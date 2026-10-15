---
title: Add a project
---

# Add a project

This takes a repo with docs in it and puts them live at
`docs.itzemoji.com/<path>/`. Pick the **path** first: lowercase letters,
digits and dashes, for example `aeroflare`. Every step below uses it.

## 1. Make the build respect the base path

The site is served under `/<path>/`, not at the root, so every link and
asset the build emits must start with that prefix. The publish workflow
passes it in as `DOCS_BASE_PATH` (always with a leading and trailing slash),
plus the site's address as `DOCS_SITE_URL`.

For Docusaurus:

```ts title="docusaurus.config.ts"
url: process.env.DOCS_SITE_URL ?? 'http://localhost:3000',
baseUrl: process.env.DOCS_BASE_PATH ?? '/',
```

Don't hard-code root-absolute paths in components. Use `useBaseUrl('/img/logo.svg')`
instead of `"/img/logo.svg"`. Markdown links and images are handled for you.

For VitePress, set `base: process.env.DOCS_BASE_PATH ?? '/'`.

## 2. Add the workflow

Create `.github/workflows/docs.yml` in the project repo:

```yaml title=".github/workflows/docs.yml"
name: Docs

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  publish:
    uses: ItzEmoji/docs-deployer/.github/workflows/publish.yml@main
    with:
      path: aeroflare            # your path
      build: bun install --frozen-lockfile && bun run build
      output: build              # where the build writes its files
      app-client-id: ${{ vars.DOCS_APP_CLIENT_ID }}
    secrets:
      app-private-key: ${{ secrets.DOCS_APP_PRIVATE_KEY }}
```

If the docs live in a subfolder, put that in both commands, e.g.
`build: cd website && bun install --frozen-lockfile && bun run build` and
`output: website/build`.

## 3. Give the repo the publishing credentials

In the project repo's **Settings → Secrets and variables → Actions**:

| Kind | Name | Value |
| --- | --- | --- |
| Variable | `DOCS_APP_CLIENT_ID` | Client ID of the docs GitHub App |
| Secret | `DOCS_APP_PRIVATE_KEY` | Its private key (`.pem` contents) |

The app is installed on `docs-deployer` only, so these credentials can't write
anywhere else. See [Operations → One-time setup](./operations.md#one-time-setup).

## 4. Register the project

Add an entry to [`projects.json`](./reference/projects-json.md) in
`docs-deployer`:

```json
{
  "path": "aeroflare",
  "title": "Aeroflare",
  "description": "OCI-backed Nix binary cache proxy."
}
```

## 5. Push

Push to `main` in the project repo, or run the **Docs** workflow by hand.
Within a few minutes the project is listed on the landing page.

Steps 4 and 5 can happen in either order. Until both are done, the deploy
run shows a warning saying which half is missing, and the rest of the site
deploys as usual.
