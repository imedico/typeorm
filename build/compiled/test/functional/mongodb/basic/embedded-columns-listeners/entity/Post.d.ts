import { Counters } from "./Counters";
import { ObjectId } from "../../../../../../src/driver/mongodb/typings";
import { Tags } from "./Tags";
export declare class Post {
    id: ObjectId;
    title: string;
    text: string;
    counters?: Counters;
    tags?: Tags[];
}
