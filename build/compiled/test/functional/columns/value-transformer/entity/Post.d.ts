export declare class Complex {
    x: number;
    y: number;
    circularReferenceToMySelf: {
        complex: Complex;
    };
    constructor(from: String);
    toString(): string;
}
export declare class Post {
    id: number;
    title: string;
    tags: string[];
    complex: Complex | null;
}
