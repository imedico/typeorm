import { ObjectId } from "../../../../src";
export declare class Warn {
    id: ObjectId;
    guild: string;
    user: string;
    moderator: string;
    reason: string;
    createdAt: Date;
}
