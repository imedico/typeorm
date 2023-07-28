import { BaseEntity } from "../../../../src";
import { Car } from "./Car";
export declare class Record extends BaseEntity {
    timestamp: Date;
    carUuid: string;
    car: Car;
}
