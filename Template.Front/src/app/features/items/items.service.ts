import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "@shared/services/base.service";
import { Item } from "./item.model";

@Injectable()
export class ItemsService extends BaseService {
    public constructor() {
        super("/template/Items");
    }

    public list(): Observable<Item[]> {
        return this.getAll(Item);
    }
}
