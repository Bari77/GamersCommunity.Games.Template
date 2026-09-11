import { Component, input } from '@angular/core';
import { SkeletonComponent } from '@bari77/gc-ui';
import { WidgetDefDirective } from '@bari77/gc-widgets';

/** Declares every game widget template for the player sheet and the workspace editor. */
@Component({
    selector: 'tpl-widget-template-host',
    standalone: true,
    imports: [SkeletonComponent, WidgetDefDirective],
    templateUrl: './widget-template-host.component.html',
    styleUrl: './widget-template-host.component.scss',
})
export class TemplateWidgetTemplateHostComponent {
    public readonly preview = input(false);
    public readonly loadingItems = input(false);
    public readonly items = input<{ id: number; entitled: string }[]>([]);
    public readonly rowPlaceholders = input([0, 1, 2, 3, 4]);
}
