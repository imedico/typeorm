import { ObjectId } from "../../../../src/driver/mongodb/typings";
import { Comment } from "./comment";
export declare class Post {
    _id?: ObjectId;
    comments: Comment[];
}
