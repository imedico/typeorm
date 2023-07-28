import { ObjectId } from "../../../../../../src/driver/mongodb/typings";
import { Information } from "./Information";
export declare class Post {
    id: ObjectId;
    title: string;
    name: string;
    info: Information;
}
