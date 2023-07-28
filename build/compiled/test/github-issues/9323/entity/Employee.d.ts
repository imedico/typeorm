import { BaseEntity } from "../../../../src";
import TimeSheet from "./TimeSheet";
import Company from "./Company";
export default class Employee extends BaseEntity {
    name: string;
    company: Company;
    timesheets: TimeSheet[];
}
