"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondConnectionSubscriber = void 0;
const tslib_1 = require("tslib");
const EventSubscriber_1 = require("../../../../src/decorator/listeners/EventSubscriber");
let SecondConnectionSubscriber = class SecondConnectionSubscriber {
    /**
     * Called after entity insertion.
     */
    beforeInsert(event) {
        // Do nothing
    }
};
SecondConnectionSubscriber = tslib_1.__decorate([
    (0, EventSubscriber_1.EventSubscriber)()
], SecondConnectionSubscriber);
exports.SecondConnectionSubscriber = SecondConnectionSubscriber;
//# sourceMappingURL=SecondConnectionSubscriber.js.map