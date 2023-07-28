"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EverythingSubscriber = void 0;
const tslib_1 = require("tslib");
const EventSubscriber_1 = require("../../../src/decorator/listeners/EventSubscriber");
let EverythingSubscriber = class EverythingSubscriber {
    /**
     * Called before entity insertion.
     */
    beforeInsert(event) {
        console.log(`BEFORE ENTITY INSERTED: `, event.entity);
    }
    /**
     * Called before entity insertion.
     */
    beforeUpdate(event) {
        console.log(`BEFORE ENTITY UPDATED: `, event.entity);
    }
    /**
     * Called before entity insertion.
     */
    beforeRemove(event) {
        console.log(`BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
    }
    /**
     * Called before entity insertion.
     */
    beforeSoftRemove(event) {
        console.log(`BEFORE ENTITY WITH ID ${event.entityId} SOFT-REMOVED: `, event.entity);
    }
    /**
     * Called before entity insertion.
     */
    beforeRecover(event) {
        console.log(`BEFORE ENTITY WITH ID ${event.entityId} RECOVERED: `, event.entity);
    }
    /**
     * Called after entity insertion.
     */
    afterInsert(event) {
        console.log(`AFTER ENTITY INSERTED: `, event.entity);
    }
    /**
     * Called after entity insertion.
     */
    afterUpdate(event) {
        console.log(`AFTER ENTITY UPDATED: `, event.entity);
    }
    /**
     * Called after entity insertion.
     */
    afterRemove(event) {
        console.log(`AFTER ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
    }
    /**
     * Called after entity insertion.
     */
    afterSoftRemove(event) {
        console.log(`AFTER ENTITY WITH ID ${event.entityId} SOFT-REMOVED: `, event.entity);
    }
    /**
     * Called after entity insertion.
     */
    afterRecover(event) {
        console.log(`AFTER ENTITY WITH ID ${event.entityId} RECOVERED: `, event.entity);
    }
    /**
     * Called after entity is loaded.
     */
    afterLoad(entity) {
        console.log(`AFTER ENTITY LOADED: `, entity);
    }
};
EverythingSubscriber = tslib_1.__decorate([
    (0, EventSubscriber_1.EventSubscriber)()
], EverythingSubscriber);
exports.EverythingSubscriber = EverythingSubscriber;
//# sourceMappingURL=EverythingSubscriber.js.map