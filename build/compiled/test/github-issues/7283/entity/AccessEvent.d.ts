import { BaseEntity } from "../../../../src";
import { Employee } from "./Employee";
export declare class AccessEvent extends BaseEntity {
    id: string;
    employee: Employee;
    employees: Employee[];
}
