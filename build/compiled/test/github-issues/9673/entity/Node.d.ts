import { Rule } from "./Rule";
export declare class Node {
    id?: number;
    deletedAt?: Date;
    rules?: Rule[];
    name: string;
    children?: Node[];
    parentId?: number;
    parent?: Node;
}
