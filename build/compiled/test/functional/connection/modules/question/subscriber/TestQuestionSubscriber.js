"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestQuestionSubscriber = void 0;
const tslib_1 = require("tslib");
const EventSubscriber_1 = require("../../../../../../src/decorator/listeners/EventSubscriber");
let TestQuestionSubscriber = class TestQuestionSubscriber {
    /**
     * Called before entity insertion.
     */
    beforeInsert(event) {
        // Do nothing
    }
};
TestQuestionSubscriber = tslib_1.__decorate([
    (0, EventSubscriber_1.EventSubscriber)()
], TestQuestionSubscriber);
exports.TestQuestionSubscriber = TestQuestionSubscriber;
//# sourceMappingURL=TestQuestionSubscriber.js.map