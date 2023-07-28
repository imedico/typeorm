export declare enum CreationMechanism {
    SOURCE_A = "SOURCE_A",
    SOURCE_B = "SOURCE_B",
    SOURCE_C = "SOURCE_C",
    SOURCE_D = "SOURCE_D"
}
export declare class SomeEntity {
    id: number;
    creationMechanism: CreationMechanism;
    createdAt: Date;
}
