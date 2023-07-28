import { BaseEntity } from "../../../../src";
import { CustomerContact } from "./CustomerContact";
export declare class Customer extends BaseEntity {
    id: number;
    name: string;
    contacts: CustomerContact[];
}
