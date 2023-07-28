import { Order } from "../entity/Order";
import { AbstractRepository } from "../../../../src";
export declare class OrderRepository extends AbstractRepository<Order> {
    createOrder(order: Order): Promise<Order>;
}
