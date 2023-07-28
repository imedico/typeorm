import { ObjectId } from "../../../../src";
export declare class Post {
    id: ObjectId;
    title: string;
    active: boolean;
    updateDate: Date;
    updatedColumns: number | string[];
    loaded: boolean;
}
