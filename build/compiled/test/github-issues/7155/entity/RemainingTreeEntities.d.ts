export declare class SingleIdClosure {
    id: number;
    name: string;
    children: SingleIdClosure[];
    parent: SingleIdClosure | null;
}
export declare class SingleIdNested {
    id: number;
    name: string;
    children: SingleIdNested[];
    parent: SingleIdNested | null;
}
export declare class SingleIdMaterialized {
    id: number;
    name: string;
    children: SingleIdMaterialized[];
    parent: SingleIdMaterialized | null;
}
export declare class MultiIdNested {
    column: string;
    row: number;
    name: string;
    children: MultiIdNested[];
    parent: MultiIdNested | null;
}
export declare class MultiIdMaterialized {
    column: string;
    row: number;
    name: string;
    children: MultiIdMaterialized[];
    parent: MultiIdMaterialized | null;
}
