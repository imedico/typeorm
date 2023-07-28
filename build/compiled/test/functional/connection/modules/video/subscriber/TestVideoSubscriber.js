"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestVideoSubscriber = void 0;
const tslib_1 = require("tslib");
const EventSubscriber_1 = require("../../../../../../src/decorator/listeners/EventSubscriber");
let TestVideoSubscriber = class TestVideoSubscriber {
    /**
     * Called after entity insertion.
     */
    beforeInsert(event) {
        // Do nothing
    }
};
TestVideoSubscriber = tslib_1.__decorate([
    (0, EventSubscriber_1.EventSubscriber)()
], TestVideoSubscriber);
exports.TestVideoSubscriber = TestVideoSubscriber;
//# sourceMappingURL=TestVideoSubscriber.js.map