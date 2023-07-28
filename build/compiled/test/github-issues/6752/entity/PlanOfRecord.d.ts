import { Block } from "./Block";
export declare class PlanOfRecord {
    id?: number;
    module: string;
    module_sku: number;
    softwareComponent: string;
    isSafety: boolean;
    planOfRecord: string;
    owner: string;
    comment: string;
    block: Block;
}
