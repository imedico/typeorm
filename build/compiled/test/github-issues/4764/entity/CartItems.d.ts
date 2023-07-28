import { Cart } from "./Cart";
export declare class CartItems {
    ID: number;
    CartID: number;
    ItemID: number;
    OptionID: number;
    Quantity: number;
    RegDate: Date;
    ModifiedDate: Date;
    Cart?: Cart;
}
