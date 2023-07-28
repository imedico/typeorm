import { User } from "./User";
export declare class Role {
    id: string;
    title: string;
    users: User[];
    deleteDate?: Date;
}
