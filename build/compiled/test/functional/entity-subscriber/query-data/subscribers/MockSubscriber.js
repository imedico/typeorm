"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockSubscriber = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let MockSubscriber = class MockSubscriber {
    constructor() {
        this.calledData = [];
    }
    afterUpdate(event) {
        this.calledData.push(event.queryRunner.data);
    }
};
MockSubscriber = tslib_1.__decorate([
    (0, src_1.EventSubscriber)()
], MockSubscriber);
exports.MockSubscriber = MockSubscriber;
//# sourceMappingURL=MockSubscriber.js.map