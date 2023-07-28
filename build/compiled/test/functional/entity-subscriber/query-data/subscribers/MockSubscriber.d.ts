import { EntitySubscriberInterface, UpdateEvent } from "../../../../../src";
export declare class MockSubscriber implements EntitySubscriberInterface {
    calledData: any[];
    afterUpdate(event: UpdateEvent<any>): void;
}
