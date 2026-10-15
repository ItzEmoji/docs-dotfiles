# docs-dotfiles

Documentation for the documentation: how `docs.itzemoji.com` works and how to
publish a project to it. Served at `docs.itzemoji.com/platform/`.

```bash
bun install
bun run start   # live preview at http://localhost:3000
bun run build   # production build into build/
```

Published like every other project: each push to `main` builds the site and
hands it to [docs-deployer](https://github.com/ItzEmoji/docs-deployer)
(`.github/workflows/docs.yml`).
