import { BaseEntity } from "../../../../src";
import { Sailing } from "./Sailing";
export declare class ScheduledSailing extends BaseEntity {
    scheduled_departure_time: Date;
    scheduled_arrival_time: Date;
    sailing: Sailing;
}
