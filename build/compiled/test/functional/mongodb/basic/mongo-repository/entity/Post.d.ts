import { ObjectId } from "../../../../../../src/driver/mongodb/typings";
export declare class Post {
    id: ObjectId;
    title: string;
    text: string;
}
export declare class PostWithDeleted {
    id: ObjectId;
    title: string;
    text: string;
    deletedAt: Date | null;
}
