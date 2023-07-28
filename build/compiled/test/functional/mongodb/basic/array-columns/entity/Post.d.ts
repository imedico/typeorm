import { Counters } from "./Counters";
import { ObjectId } from "../../../../../../src/driver/mongodb/typings";
export declare class Post {
    id: ObjectId;
    title: string;
    counters: Counters[];
    names: string[];
    numbers: number[];
    booleans: boolean[];
    other1: Counters[];
    other2: Counters[];
}
