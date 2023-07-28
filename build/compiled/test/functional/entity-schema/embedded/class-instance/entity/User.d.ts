import { Name } from "./Name";
import { EntitySchema } from "../../../../../../src";
export declare class User {
    id: string;
    name: Name;
    isActive: boolean;
}
export declare const UserEntitySchema: EntitySchema<User>;
