import { BaseEntity } from "../../../../src";
import TimeSheet from "./TimeSheet";
export default class Activity extends BaseEntity {
    id: number;
    hours: number;
    timesheet: TimeSheet;
}
