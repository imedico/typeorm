import { User } from "./User";
export declare class Photo {
    private _id;
    get id(): string;
    set id(value: string);
    description: string;
    user: User;
}
