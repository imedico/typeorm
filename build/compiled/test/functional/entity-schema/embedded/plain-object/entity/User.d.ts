import { Name } from "./Name";
import { EntitySchema } from "../../../../../../src";
export interface User {
    id: string;
    name: Name;
    isActive: boolean;
}
export declare const UserEntitySchema: EntitySchema<User>;
