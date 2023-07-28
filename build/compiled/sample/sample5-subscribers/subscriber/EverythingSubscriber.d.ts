import { EntitySubscriberInterface } from "../../../src/subscriber/EntitySubscriberInterface";
import { InsertEvent } from "../../../src/subscriber/event/InsertEvent";
import { RecoverEvent } from "../../../src/subscriber/event/RecoverEvent";
import { RemoveEvent } from "../../../src/subscriber/event/RemoveEvent";
import { SoftRemoveEvent } from "../../../src/subscriber/event/SoftRemoveEvent";
import { UpdateEvent } from "../../../src/subscriber/event/UpdateEvent";
export declare class EverythingSubscriber implements EntitySubscriberInterface {
    /**
     * Called before entity insertion.
     */
    beforeInsert(event: InsertEvent<any>): void;
    /**
     * Called before entity insertion.
     */
    beforeUpdate(event: UpdateEvent<any>): void;
    /**
     * Called before entity insertion.
     */
    beforeRemove(event: RemoveEvent<any>): void;
    /**
     * Called before entity insertion.
     */
    beforeSoftRemove(event: SoftRemoveEvent<any>): void;
    /**
     * Called before entity insertion.
     */
    beforeRecover(event: RecoverEvent<any>): void;
    /**
     * Called after entity insertion.
     */
    afterInsert(event: InsertEvent<any>): void;
    /**
     * Called after entity insertion.
     */
    afterUpdate(event: UpdateEvent<any>): void;
    /**
     * Called after entity insertion.
     */
    afterRemove(event: RemoveEvent<any>): void;
    /**
     * Called after entity insertion.
     */
    afterSoftRemove(event: SoftRemoveEvent<any>): void;
    /**
     * Called after entity insertion.
     */
    afterRecover(event: RecoverEvent<any>): void;
    /**
     * Called after entity is loaded.
     */
    afterLoad(entity: any): void;
}
