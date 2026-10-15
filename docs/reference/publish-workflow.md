---
title: Publish workflow
---

# Publish workflow

`ItzEmoji/docs-deployer/.github/workflows/publish.yml` is a reusable
workflow. Project repos call it to build their docs and publish them to
`site/<path>`.

## Inputs

| Input | Required | Description |
| --- | --- | --- |
| `path` | yes | Where the project is served: `/<path>/`. Lowercase letters, digits and dashes; `fonts` is reserved. Must match the entry in `projects.json`. |
| `build` | yes | Shell command that builds the site, run from the repo root. |
| `output` | yes | Directory the build writes to, relative to the repo root. Must contain `index.html`. |
| `app-client-id` | yes | Client ID of the publishing GitHub App. |

## Secrets

| Secret | Description |
| --- | --- |
| `app-private-key` | Private key of the publishing GitHub App. |

## Environment during the build

| Variable | Value |
| --- | --- |
| `DOCS_BASE_PATH` | `/<path>/` |
| `DOCS_SITE_URL` | `https://docs.itzemoji.com` |

Bun is installed before the build runs. Node.js comes with the runner.

## What it does

1. Rejects an invalid `path`.
2. Checks out the calling repo and runs `build`.
3. Fails if `<output>/index.html` doesn't exist, so an empty or misplaced
   build is never published.
4. Commits `output` as a single commit, *"&lt;path&gt;: &lt;repo&gt;@&lt;sha&gt;"*,
   and force-pushes it to `site/<path>`.

Runs for the same `path` don't overlap: a newer run cancels an older one
that's still going, because only the newest publish matters.
