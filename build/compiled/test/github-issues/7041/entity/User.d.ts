import { BaseEntity } from "../../../../src";
import { Admin } from "./Admin";
import { OrganizationMembership } from "./OrganizationMembership";
export declare class User extends BaseEntity {
    id: string;
    randomField: string;
    admin: Admin;
    membership: OrganizationMembership[];
}
