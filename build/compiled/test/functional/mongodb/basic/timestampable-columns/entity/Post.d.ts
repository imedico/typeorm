import { ObjectId } from "../../../../../../src/driver/mongodb/typings";
export declare class Post {
    id: ObjectId;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}
