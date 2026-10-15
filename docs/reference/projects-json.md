---
title: projects.json
---

# projects.json

The register in the root of `docs-deployer`. It decides which published
branches go live and what the landing page says about them.

```json
{
  "projects": [
    {
      "path": "aeroflare",
      "title": "Aeroflare",
      "description": "OCI-backed Nix binary cache proxy."
    }
  ]
}
```

| Field | Description |
| --- | --- |
| `path` | Served at `/<path>/`, published from `site/<path>`. Lowercase letters, digits and dashes, starting with a letter or digit. Unique. `fonts` is reserved for the landing page's own files. |
| `title` | Name on the landing page. |
| `description` | One line under the name. |

Projects appear on the landing page in the order they're listed, but only
once they've published.

An invalid file (bad JSON, a missing field, a duplicate or reserved path)
fails the deploy before anything is uploaded, and the live site stays as it
was.
