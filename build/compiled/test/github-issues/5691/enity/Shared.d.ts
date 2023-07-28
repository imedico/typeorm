import { Child1 } from "./Child1";
import { Child2 } from "./Child2";
import { Root } from "./Root";
export declare class Shared {
    id?: string;
    root?: Root;
    rootId?: string;
    child1?: Child1;
    child1Id?: string;
    child2?: Child2;
    child2Id?: string;
    shared?: Shared;
    sharedId?: string;
    allShared?: Array<Shared>;
    allSharedId?: Array<string>;
}
