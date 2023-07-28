"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const AlreadyHasActiveConnectionError_1 = require("../../../../src/error/AlreadyHasActiveConnectionError");
const CannotGetEntityManagerNotConnectedError_1 = require("../../../../src/error/CannotGetEntityManagerNotConnectedError");
describe("errors > prototype tree", () => {
    it("prototype tree makes sense", () => {
        const err = new AlreadyHasActiveConnectionError_1.AlreadyHasActiveConnectionError("test");
        (0, chai_1.expect)(err.name).to.be.equal("AlreadyHasActiveConnectionError");
        (0, chai_1.expect)(err).to.be.instanceOf(AlreadyHasActiveConnectionError_1.AlreadyHasActiveConnectionError);
        const otherErr = new CannotGetEntityManagerNotConnectedError_1.CannotGetEntityManagerNotConnectedError("test");
        (0, chai_1.expect)(otherErr).to.be.instanceOf(CannotGetEntityManagerNotConnectedError_1.CannotGetEntityManagerNotConnectedError);
    });
});
//# sourceMappingURL=errors-prototype-tree.js.map