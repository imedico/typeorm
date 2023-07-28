import { BaseEntity } from "../../../../src";
import { OrderStatus } from "./order.entity.ts";
export declare class OrderProduct extends BaseEntity {
    id: number;
    status: OrderStatus;
}
