import { Routes } from "@angular/router";
import { ItemsService } from "./features/items/items.service";
import { HomeContainerComponent } from "./pages/home-container/home-container.component";

/**
 * Game services live on this remote injector (not providedIn: "root") so federation
 * into the Platform shell does not resolve them against the host root.
 */
const templateRemoteProviders = [ItemsService];

export const GAME_ROUTES: Routes = [
    {
        path: "",
        providers: templateRemoteProviders,
        children: [
            { path: "", component: HomeContainerComponent },
            {
                path: "sheet",
                loadComponent: () =>
                    import("./features/players/pages/player-sheet/player-sheet.component").then(
                        (m) => m.PlayerSheetComponent,
                    ),
            },
        ],
    },
];
