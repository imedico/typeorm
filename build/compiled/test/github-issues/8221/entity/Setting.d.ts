import { BaseEntity } from "../../../../src";
import { User } from "./User";
export declare class Setting extends BaseEntity {
    assetId?: number;
    asset?: User;
    name: string;
    value: string;
    constructor(id: number, name: string, value: string);
}
