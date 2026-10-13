import { ItemDto } from "./item.dto";

export class Item {
    public constructor(
        public id: number,
        public entitled: string,
        public creationDate: Date | null,
        public modificationDate: Date | null,
    ) {}

    public static fromDto(dto: ItemDto): Item {
        return new Item(
            dto.id,
            dto.entitled,
            dto.creationDate ? new Date(dto.creationDate) : null,
            dto.modificationDate ? new Date(dto.modificationDate) : null,
        );
    }
}
