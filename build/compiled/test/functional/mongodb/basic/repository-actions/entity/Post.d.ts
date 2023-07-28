import { Counters } from "./Counters";
import { ObjectId } from "../../../../../../src/driver/mongodb/typings";
export declare class Post {
    id: ObjectId;
    title: string;
    text: string;
    index: number;
    counters: Counters;
}
