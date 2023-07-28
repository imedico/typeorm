import { Order } from "./Order";
import { Product } from "./Product";
export declare class OrderItem {
    orderId: number;
    productId: number;
    order: Order;
    product: Product;
    amount: number;
}
