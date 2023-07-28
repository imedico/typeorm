declare class ExampleBigNumber {
    private value;
    constructor(value: string);
    toFixed(): string;
}
export declare class ExampleEntity {
    id: number;
    total: ExampleBigNumber;
}
export {};
