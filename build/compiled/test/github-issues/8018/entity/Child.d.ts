import { Grandchild } from "./Grandchild";
import { Parent } from "./Parent";
export declare class Child {
    id: number;
    name?: string;
    parent?: Parent;
    children?: Grandchild[];
}
