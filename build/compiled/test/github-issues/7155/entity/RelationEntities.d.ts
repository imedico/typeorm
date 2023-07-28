export declare class Relation {
    id: number;
}
export declare class OtherRelation {
    id: number;
}
export declare class RelationClosure {
    id: number;
    children: RelationClosure[];
    parent: RelationClosure;
    relation: Relation;
    otherRelation: OtherRelation;
}
export declare class RelationNested {
    id: number;
    children: RelationNested[];
    parent: RelationNested;
    relation: Relation;
    otherRelation: OtherRelation;
}
export declare class RelationMaterialized {
    id: number;
    children: RelationMaterialized[];
    parent: RelationMaterialized;
    relation: Relation;
    otherRelation: OtherRelation;
}
