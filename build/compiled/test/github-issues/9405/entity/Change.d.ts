import { ChangeLog } from "./ChangeLog";
export declare class Change<T> {
    id: number;
    propertyName: string;
    oldValue?: any;
    newValue?: any;
    log: ChangeLog<T>;
}
