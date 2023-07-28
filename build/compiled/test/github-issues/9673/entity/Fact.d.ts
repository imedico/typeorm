import { Rule } from "./Rule";
export declare class Fact {
    id?: number;
    deletedAt?: Date;
    rules?: Rule[];
    name: string;
}
