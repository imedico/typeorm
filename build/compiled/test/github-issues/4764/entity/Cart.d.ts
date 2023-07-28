import { CartItems } from "./CartItems";
import { User } from "./User";
export declare class Cart {
    ID: number;
    UNID: number;
    Type: string;
    Cycle?: number;
    Term?: string;
    RegDate: Date;
    ModifiedDate: Date;
    CartItems?: CartItems[];
    User?: User;
}
