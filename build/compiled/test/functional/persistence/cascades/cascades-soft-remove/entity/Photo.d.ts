import { User } from "./User";
export declare class Photo {
    id: number;
    name: string;
    deletedAt: Date;
    user: User;
    constructor(name: string);
}
