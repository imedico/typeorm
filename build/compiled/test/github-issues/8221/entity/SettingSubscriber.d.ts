import { EntitySubscriberInterface, LoadEvent, UpdateEvent } from "../../../../src";
import { Setting } from "./Setting";
export declare class SettingSubscriber implements EntitySubscriberInterface {
    counter: any;
    constructor();
    listenTo(): typeof Setting;
    afterLoad(item: Setting, event?: LoadEvent<Setting>): void;
    beforeUpdate(event: UpdateEvent<any>): void;
    beforeInsert(event: UpdateEvent<any>): void;
    beforeRemove(event: UpdateEvent<any>): void;
    reset(): void;
}
