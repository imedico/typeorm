import { BaseEntity } from "../../../../src";
import { User } from "./User";
import { Organization } from "./Organization";
export declare class Admin extends BaseEntity {
    userId: string;
    user: User;
    organization: Organization;
    randomField: string;
}
