import { BaseEntity } from "../../../../src";
import Activity from "./Activity";
import Employee from "./Employee";
export default class TimeSheet extends BaseEntity {
    id: number;
    totalActvityHours: number;
    activities: Activity[];
    employee: Employee;
}
