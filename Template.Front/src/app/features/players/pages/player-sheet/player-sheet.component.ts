import { Component, computed, inject, resource, signal } from "@angular/core";
import { parseWorkspace, WidgetWorkspace, WidgetWorkspaceComponent } from "@bari77/gc-widgets";
import defaultLayout from "../../../../../../config/player/workspace.default.json";
import { firstValueFrom } from "rxjs";
import { ItemDto } from "../../../items/item.dto";
import { ItemsService } from "../../../items/items.service";
import {
    PLAYER_WIDGET_CATALOG,
    PLAYER_WORKSPACE_COLUMNS,
    PLAYER_WORKSPACE_ROW_HEIGHT,
} from "../../workspace/widget-catalog";
import { TemplateWidgetTemplateHostComponent } from "../../workspace/widget-template-host.component";
import { ResourceUtils } from "../../../../shared/utils/resource.utils";

@Component({
    selector: "tpl-player-sheet",
    standalone: true,
    imports: [TemplateWidgetTemplateHostComponent, WidgetWorkspaceComponent],
    templateUrl: "./player-sheet.component.html",
    styleUrl: "./player-sheet.component.scss",
})
export class PlayerSheetComponent {
    public readonly catalog = PLAYER_WIDGET_CATALOG;
    public readonly columns = PLAYER_WORKSPACE_COLUMNS;
    public readonly rowHeight = PLAYER_WORKSPACE_ROW_HEIGHT;
    public readonly rowPlaceholders = [0, 1, 2, 3, 4];

    public readonly editing = signal(false);

    public readonly items = resource({
        loader: () => firstValueFrom(this.itemsService.list()),
        defaultValue: [] as ItemDto[],
    });

    public readonly loadingItems = computed(() => ResourceUtils.isPending(this.items));

    public readonly workspace = computed(
        () =>
            this.savedWorkspace() ??
            parseWorkspace(
                this.layoutJson(),
                defaultLayout as WidgetWorkspace,
                PLAYER_WORKSPACE_COLUMNS,
                PLAYER_WIDGET_CATALOG.map((entry) => entry.type),
            ),
    );

    private readonly layoutJson = signal<string | null>(null);
    private readonly savedWorkspace = signal<WidgetWorkspace | null>(null);
    private readonly itemsService = inject(ItemsService);

    public onSave(workspace: WidgetWorkspace): void {
        this.savedWorkspace.set(workspace);
        this.editing.set(false);
    }
}
