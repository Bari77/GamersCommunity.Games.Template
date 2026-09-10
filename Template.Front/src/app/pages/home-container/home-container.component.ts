import { Component, computed, inject, resource } from "@angular/core";
import { NbCardModule } from "@nebular/theme";
import { SkeletonComponent } from "@bari77/gc-ui";
import { firstValueFrom } from "rxjs";
import { ItemDto } from "../../features/items/item.dto";
import { ItemsService } from "../../features/items/items.service";
import { ResourceUtils } from "../../shared/utils/resource.utils";

@Component({
    selector: "tpl-home-container",
    standalone: true,
    imports: [NbCardModule, SkeletonComponent],
    templateUrl: "./home-container.component.html",
    styleUrl: "./home-container.component.scss",
})
export class HomeContainerComponent {
    public readonly rowPlaceholders = [0, 1, 2, 3, 4];

    private readonly itemsService = inject(ItemsService);

    public readonly list = resource({
        loader: () => firstValueFrom(this.itemsService.list()),
        defaultValue: [] as ItemDto[],
    });

    public readonly loading = computed(() => ResourceUtils.isPending(this.list));
}
