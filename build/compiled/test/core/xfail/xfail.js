"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const xfail_1 = require("../../utils/xfail");
describe("xfail", () => {
    describe("it", () => {
        xfail_1.xfail.it("chai", () => {
            (0, chai_1.expect)(1).to.equal(0);
        });
        xfail_1.xfail.it("standard mocha", () => {
            const foo = 1;
            foo.should.be.equal(0);
        });
        xfail_1.xfail.it("async chai", async () => {
            (0, chai_1.expect)(1).to.equal(0);
        });
    });
});
//# sourceMappingURL=xfail.js.map