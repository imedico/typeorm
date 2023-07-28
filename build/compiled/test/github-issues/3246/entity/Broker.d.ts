import { Order } from "./Order";
export declare class Broker {
    id: number;
    name: string;
    orders?: Order;
    createdDate: Date;
    modifiedDate: Date;
}
