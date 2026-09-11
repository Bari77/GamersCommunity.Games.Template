# GamersCommunity.Games.Template

Canonical **generic game scaffold** for GamersCommunity (Items demo only — no Blizzard / game-specific APIs).

Cloned and renamed by `@bari77/gc-create-game` (`npx @bari77/gc-create-game YourGame`). Do not use this repo as a live game; treat it as the upstream template.

Identity baked into this tree: Pascal `Template`, id/kebab/camel `template`, queue `template_queue`, compose `gc-template-dev`, ports front `4202` / gateway `8082`, CSS prefix `tpl`.

## Layout

- `Template.Front` — Angular micro-frontend (MSW mocks + Module Federation)
- `Template.Consumer` — .NET RabbitMQ consumer
- `Template.Database` — EF / SQL
- `Template.Tests` — tests
- `compose.yml` — game-full stack (Rabbit + SQL + consumer + DevGateway)
- `contracts/` — federation + OpenAPI

## Platform identity (mandatory in every game)

Platform broadcasts user identity changes on the shared fanout exchange `platform_events`. Each game
binds **its own** queue to it — `platform_events_<microserviceId>` — and mirrors the payload into its
local `PlatformUserSnapshot` table. Queries then join that table instead of calling Platform.

Two rules:

- A queue delivers each message to a single consumer, so games must never share one — hence the
  per-game queue name. The publisher stays unaware of them, adding a game requires no Platform change.
- Replicate display data only (nickname, discriminator, avatar). Roles, bans and mutes stay at their
  source of truth and must never be read from the snapshot.

When renaming the template, set `MicroserviceId` in `Template.Consumer/Integration/PlatformEventsSubscriber.cs`
to the game id declared in the gateway routing.

## GitHub Packages auth (once)

```powershell
dotnet nuget update source github -u YOUR_USER -p ghp_xxx --store-password-in-clear-text
$env:NODE_AUTH_TOKEN = "ghp_xxx"
echo ghp_xxx | docker login ghcr.io -u YOUR_USER --password-stdin
```

## Front (UI-only / mocks)

```bash
cd Template.Front
npm install
npm start
```

## Customisable widget layout

`@bari77/gc-widgets` ships the page rail, the gridster grid, the catalog picker and the settings
form. The demo lives at `/template/sheet` and covers the three ways to plug a widget in: one
rendered by a `gcWidget` template that reads the game API (`items`), one whose whole content comes
from the generated settings form (`notes`), and one the package draws by itself (`gc-links`).

Registry files live under `Template.Front/src/app/features/players/workspace/`; the default layout
is `Template.Front/config/player/workspace.default.json`. A game swaps them for its own scopes
(`guild`, `team`, …) and persists the workspace — WoW keeps it as JSON in `Player.LayoutJson`
and reloads it with `parseWorkspace`. The demo only holds it in memory, so a refresh resets the layout.

Validate or edit defaults with `@bari77/gc-workspace-editor` (`npm run workspace:validate`, `workspace:edit`).

Widgets ship raw `.ts`, so the package must stay in the `skip` list of `federation.config.mjs` and in
the `include` of `tsconfig.app.json` to go through the Angular compiler.

## Game-full

```powershell
$env:GITHUB_TOKEN = "ghp_xxx"
.\scripts\up.ps1
cd Template.Front
npm run start:api
```

- DevGateway: http://localhost:8082
- Front: http://localhost:4202
- SQL: `127.0.0.1,14333` / sa / Your_password123 (Trust server certificate)

## Shell integration

See `contracts/federation.contract.json` and `contracts/openapi.yaml`.
