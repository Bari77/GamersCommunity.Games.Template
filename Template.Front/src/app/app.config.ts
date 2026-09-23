import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { routes } from "./app.routes";
import { providePlaygroundUi } from "./playground/provide-playground-ui";

// When a PlayersService (resolve + load) exists, register provideGameRemoteKernel from
// @bari77/gc-sdk on app.config AND on the exported federation routes parent providers —
// see DevKit docs/ARCHITECTURE.md « Game remote kernel ». The shell never runs remote app.config.
// Until gc-sdk ≥ 1.0.3, also list PlayersService next to the kernel (useExisting alias).

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    providePlaygroundUi("cosmic"),
  ],
};
