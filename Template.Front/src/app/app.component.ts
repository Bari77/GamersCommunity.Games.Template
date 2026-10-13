import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NbLayoutModule } from "@nebular/theme";
import { environment } from "../environments/environment";

@Component({
    selector: "tpl-root",
    standalone: true,
    imports: [RouterOutlet, NbLayoutModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    protected readonly showBanner = environment.useMocks === true;
}
