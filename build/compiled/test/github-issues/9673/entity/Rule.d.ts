import { Node } from "./Node";
import { Fact } from "./Fact";
export declare class Rule {
    id?: number;
    deletedAt?: Date;
    name: string;
    fact?: Fact;
    factId?: number;
    node?: Node;
}
