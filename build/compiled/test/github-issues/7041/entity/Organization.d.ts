import { BaseEntity } from "../../../../src";
import { Admin } from "./Admin";
import { OrganizationMembership } from "./OrganizationMembership";
export declare class Organization extends BaseEntity {
    id: string;
    admin: Admin;
    randomField: string;
    membership: OrganizationMembership[];
}
