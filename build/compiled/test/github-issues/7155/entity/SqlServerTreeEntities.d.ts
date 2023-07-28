export declare class SqlServerSingleIdClosure {
    id: number;
    name: string;
    children: SqlServerSingleIdClosure[];
    parent: SqlServerSingleIdClosure | null;
}
export declare class SqlServerSingleIdNested {
    id: number;
    name: string;
    children: SqlServerSingleIdNested[];
    parent: SqlServerSingleIdNested | null;
}
export declare class SqlServerSingleIdMaterialized {
    id: number;
    name: string;
    children: SqlServerSingleIdMaterialized[];
    parent: SqlServerSingleIdMaterialized | null;
}
export declare class SqlServerMultiIdNested {
    column: string;
    row: number;
    name: string;
    children: SqlServerMultiIdNested[];
    parent: SqlServerMultiIdNested | null;
}
export declare class SqlServerMultiIdMaterialized {
    column: string;
    row: number;
    name: string;
    children: SqlServerMultiIdMaterialized[];
    parent: SqlServerMultiIdMaterialized | null;
}
