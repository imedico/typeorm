import { OrderCustomer } from "./OrderCustomer";
import { Broker } from "./Broker";
export declare class Order {
    id: number;
    orderReferenceNumber: string;
    company?: Broker;
    orderCustomer?: OrderCustomer;
    orderCustomerId?: number;
    createdDate: Date;
    modifiedDate: Date;
}
