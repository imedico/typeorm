export declare class EmbeddedEntity {
    foo: string;
    bar: string;
}
export declare class ExternalIdPrimaryKeyEntity {
    externalId: string;
    title: string;
    embedded: EmbeddedEntity;
}
