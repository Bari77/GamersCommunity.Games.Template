import { Routes } from "@angular/router";
import { GAME_ROUTES } from "./template.routes";

export const routes: Routes = [
  { path: "", children: GAME_ROUTES },
];
