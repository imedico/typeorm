import { BaseEntity } from "../../../../src";
import { User } from "./User";
import { Organization } from "./Organization";
export declare class OrganizationMembership extends BaseEntity {
    userId: string;
    organizationId: string;
    user: User;
    organization: Organization;
    accessLevel: string;
}
