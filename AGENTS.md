# Agent guidelines — Games.Template

Shared module: [`AgentKit/`](AgentKit/) → [GamersCommunity.AgentKit](https://github.com/Bari77/GamersCommunity.AgentKit)

- [`AgentKit/AGENTS.base.md`](AgentKit/AGENTS.base.md)
- [`AgentKit/ENGINEERING_STANDARDS.md`](AgentKit/ENGINEERING_STANDARDS.md)
- [`AgentKit/POLICY.md`](AgentKit/POLICY.md)
- Optional: [`AGENTS.override.md`](AGENTS.override.md)

## Repo-specific

This repo is the **scaffold of truth** for new games (`gc-create-game`).

- Migrations: `Template.Database/Add-Migration.ps1` only; class-based seeds; no seed rows in migrations.
- Front: Nebular, English i18n, published `@bari77/*`, workspace grids for player/guild-or-team sheets when those surfaces exist.
- Authorization: domain capabilities via membership/ranks (`canModerate`, …) + Private API enforcement. Do **not** add a Nebular ACL fragment for the game into Platform — shell ACL stays Platform-global only (AgentKit ENGINEERING_STANDARDS §5.7).
- Pillar changes here must stay usable for every new game; generic helpers belong in Core / DevKit.
- New clones: `git submodule update --init --recursive` then `./AgentKit/scripts/Sync-CursorRules.ps1`.
