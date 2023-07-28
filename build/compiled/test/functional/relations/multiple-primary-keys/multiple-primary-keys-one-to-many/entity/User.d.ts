import { BaseEntity } from "../../../../../../src";
import { Setting } from "./Setting";
export declare class User extends BaseEntity {
    id: number;
    name: string;
    settings: Setting[];
    constructor(id: number, name: string);
}
