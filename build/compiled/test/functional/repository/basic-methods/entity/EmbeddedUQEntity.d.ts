export declare class EmbeddedEntityWithUniqueColumn {
    id: string;
    value: string;
}
export declare class EmbeddedUQEntity {
    id: string;
    embedded: EmbeddedEntityWithUniqueColumn;
}
