import { User } from "./User";
export declare class AccessToken {
    primaryKey: number;
    expireTime: number;
    user: User;
}
