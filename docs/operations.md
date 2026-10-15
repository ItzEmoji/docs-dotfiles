---
title: Operations
---

# Operations

## Remove a project

1. Delete its entry from `projects.json` in `docs-deployer`. The next deploy
   leaves it out, and it disappears from the site.
2. Delete its `site/<path>` branch. Otherwise every deploy warns that the
   branch is not registered.
3. Remove `docs.yml` from the project repo, or it will publish again.

## Rename a project's path

1. Change `path` in the project's `docs.yml` and push. It now publishes to
   the new branch.
2. Change `path` in `projects.json`.
3. Delete the old `site/<old-path>` branch.

Old links to `/<old-path>/` stop working. Add a Cloudflare redirect if they
matter.

## Roll back a project

Each publish replaces the branch, so there's no older version left to switch
back to. Instead, revert the change in the **project** repo and push. That
publishes the earlier docs as a new version, the same way as any other change.

## Redeploy without changes

Run **Deploy site** in `docs-deployer` from the Actions tab. To republish a
single project, run its **Docs** workflow.

## One-time setup

### The publishing app

Create a GitHub App (Settings → Developer settings → GitHub Apps) with:

- **Repository permissions → Contents: Read and write**, and nothing else
- installed on **`docs-deployer` only**

Its client ID and a private key go into every project repo, as described in
[Add a project](./add-a-project.md#3-give-the-repo-the-publishing-credentials).

### Protect the deployer's `main`

Add a branch ruleset on `docs-deployer` that targets `main`, restricts
updates and deletions, and lists only yourself as a bypass. The publishing
app can then write `site/*` branches but can never change `projects.json`
or the workflows.

### Cloudflare Pages

1. Create a Pages project (Direct Upload), named `docs-deployer` unless you
   set the `PAGES_PROJECT` variable to something else.
2. Create an API token with **Cloudflare Pages: Edit**.
3. In `docs-deployer`, add the secrets `CLOUDFLARE_API_TOKEN` and
   `CLOUDFLARE_ACCOUNT_ID`.
4. Attach the custom domain `docs.itzemoji.com` to the Pages project.

Until the token is set, deploys still assemble the site and attach it to the
run as the **site** artifact, so you can download and check it.

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Deploy warns *"… is in projects.json but has never published"* | The project's **Docs** workflow hasn't succeeded yet. Check its run. |
| Deploy warns *"site/… exists but … is not in projects.json"* | Register the project, or delete the branch if it's left over. |
| Deploy warns *"… has no index.html at its root"* | `output` in the project's `docs.yml` points at the wrong folder. |
| Publish fails at **create-github-app-token** | The app isn't installed on `docs-deployer`, or `DOCS_APP_CLIENT_ID` / `DOCS_APP_PRIVATE_KEY` is missing in the project repo. |
| Publish fails at **Check the output** | The build didn't write to `output`. Run the build locally and check where it goes. |
| Pages load but styles and links are broken | The build ignored `DOCS_BASE_PATH`. See [step 1 of Add a project](./add-a-project.md#1-make-the-build-respect-the-base-path). |
