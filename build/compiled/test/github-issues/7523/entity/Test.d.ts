declare enum FooEnum {
    FOO = 0,
    BAR = 1
}
declare class ParentEntity {
    ud: number;
    foo: FooEnum;
}
export declare class ChildEntity1 extends ParentEntity {
}
export declare class ChildEntity2 extends ParentEntity {
}
export {};
