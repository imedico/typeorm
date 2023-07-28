import { ObjectId } from "../../../../src";
export declare class Item {
    _id: ObjectId;
    /**
     * @deprecated use contacts instead
     */
    contact?: string;
    contacts: Array<string>;
    config: any;
}
