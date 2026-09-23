# Agent guidelines — GamersCommunity game repos

Technical rules for AI agents working in this repository. Prefer these over improvising.

## Never start servers

Do **not** run `dotnet run`, `npm start`, `ng serve`, Docker compose up for apps, or any long-lived process. The developer owns terminals. You may run one-shot builds/tests (`dotnet build`, `npm test`) when useful.

## Database (`*.Database`)

### Migrations

- Generate migrations **only** with `Add-Migration.ps1` at the **Database project root** (e.g. `LeagueOfLegends.Database/Add-Migration.ps1`).
- Never hand-write migration classes, never invent `Up`/`Down` SQL files, never call `dotnet ef migrations add` ad hoc unless the official script does that.
- Do **not** put seed rows in migrations (`HasData` / `InsertData`).

```powershell
cd <Game>.Database
./Add-Migration.ps1 -Name MeaningfulName
```

### Seeds

- Reference / catalog data must live as **seed classes** under `Seed/`, same pattern as Platform, WoW, and LoL (`IReferenceTableSeed` / `KeyTableSeed`, discovered by `ReferenceDataSeed`).
- One class per table (or clear table concern). No ad-hoc SQL seed scripts in place of that pattern.

## Front (`*.Front`)

### Design

- Stay within **Nebular** (or closely match it). Prefer Nebular components and existing game/front patterns.
- If a UI piece is reusable across games or Platform, **extract it to DevKit** (`@bari77/gc-ui`, `@bari77/gc-widgets`, etc.) instead of copying.

### Specs (`Front/docs`)

- Product/feature specs live in `Front/docs/` as Markdown with **clear names** (`SPEC_TEAMS.md`, `SPEC_PLAYER_SHEET.md`, `PRODUCT_VISION.md`, …).
- Spec milestones must use **descriptive titles**, not bare letters alone. Prefer `C1 — Team governance` over `C1` with no meaning; phase names should remain readable in checklists.

### i18n

- Default locale is **English**. No hardcoded user-facing strings in templates/TS.
- Use Angular `$localize` / `i18n` (and existing `gameTerm` for catalog codes).

### Packages

- In `package.json`, **never** point at a local `dist` / `file:` / path dependency for `@bari77/*` (or similar).
- Always publish packages, then consume the **published** version from the registry.

### Player / guild / team sheets

- Player, guild, and team profile pages **must** use a **workspace grid** (editable layout / widgets) so users can personalize the page. Do not ship a fixed one-off layout for those sheets.

### Fragile install hacks

- **Never** add `postinstall` (or similar) scripts that rewrite another package’s `package.json` or patch `node_modules` to “make it fit”.
- If a dependency is too fragile for our needs, drop that approach and find another solution (fork, DevKit package, different library).

## Game scaffold vs Core vs Template

When you change pillars of a game (e.g. `Program.cs`, Consumer host setup, Database migrate/seed pipeline, federation bootstrap, compose layout):

1. Update **GamersCommunity.Games.Template** with the same change when it belongs in every new game.
2. If the change is generic enough to share without forking, put it in **GamersCommunity.Core** (or the appropriate DevKit package) and consume it from games—do not let copies diverge.

## Commits / push

Only commit or push when the developer explicitly asks.
