import { Child1 } from "./Child1";
import { Child2 } from "./Child2";
import { Shared } from "./Shared";
export declare class Root {
    id?: string;
    allShared?: Array<Shared>;
    allSharedId?: Array<string>;
    allChild1?: Array<Child1>;
    allChild1Id?: Array<string>;
    allChild2?: Array<Child2>;
    allChild2Id?: Array<string>;
}
