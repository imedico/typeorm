import { ObjectId } from "../../../../src";
export declare class Product {
    constructor(name: string, label: string, price: number);
    id: ObjectId;
    name: string;
    label: string;
    price: number;
}
