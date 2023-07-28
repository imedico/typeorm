import { BaseEntity } from "../../../../src";
import { Record } from "./Record";
export declare class Car extends BaseEntity {
    uuid: string;
    latestRecordTimestamp?: Date;
    records: Record[];
    latestRecord?: Record;
}
