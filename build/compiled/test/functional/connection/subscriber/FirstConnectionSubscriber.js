"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstConnectionSubscriber = void 0;
const tslib_1 = require("tslib");
const EventSubscriber_1 = require("../../../../src/decorator/listeners/EventSubscriber");
let FirstConnectionSubscriber = class FirstConnectionSubscriber {
    /**
     * Called after entity insertion.
     */
    beforeInsert(event) {
        // Do nothing
    }
};
FirstConnectionSubscriber = tslib_1.__decorate([
    (0, EventSubscriber_1.EventSubscriber)()
], FirstConnectionSubscriber);
exports.FirstConnectionSubscriber = FirstConnectionSubscriber;
//# sourceMappingURL=FirstConnectionSubscriber.js.map