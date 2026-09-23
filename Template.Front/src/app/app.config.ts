import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { routes } from "./app.routes";
import { providePlaygroundUi } from "./playground/provide-playground-ui";

// When a PlayersService (resolve + load) exists, register provideGameRemoteKernel from
// @bari77/gc-sdk — see DevKit docs/ARCHITECTURE.md « Game remote kernel ».

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    providePlaygroundUi("cosmic"),
  ],
};
