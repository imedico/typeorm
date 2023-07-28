import { ObjectId } from "../../../../src/driver/mongodb/typings";
import { Event } from "./Event";
export declare class User {
    id: ObjectId;
    firstName: string;
    lastName: string;
    age: number;
    events: Event[];
}
