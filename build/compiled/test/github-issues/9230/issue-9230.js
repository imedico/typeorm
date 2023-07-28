"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DateUtils_1 = require("../../../src/util/DateUtils");
const chai_1 = require("chai");
describe("github issues > #9230 Incorrect date parsing for year 1-999", () => {
    describe("mixedDateToDateString", () => {
        it("should format a year less than 1000 with correct 0 padding", () => {
            (0, chai_1.expect)(DateUtils_1.DateUtils.mixedDateToDateString(new Date("0202-01-01"))).to.eq("0202-01-01");
        });
    });
});
//# sourceMappingURL=issue-9230.js.map