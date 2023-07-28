import { BaseEntity } from "../../../../src";
import { ScheduledSailing } from "./ScheduledSailing";
export declare class Sailing extends BaseEntity {
    scheduled_departure_time: Date;
    scheduled_sailings: ScheduledSailing[];
}
