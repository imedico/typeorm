import { User } from "./User";
export declare class Company {
    id: number;
    name: string;
    admin: User;
    staff?: Array<User>;
}
