import { BaseEntity } from "../../../../src";
import Employee from "./Employee";
export default class Company extends BaseEntity {
    name: string;
    totalEmployeesCount: number;
    employees: Employee[];
}
