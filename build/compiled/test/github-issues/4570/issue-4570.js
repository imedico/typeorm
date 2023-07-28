"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const chai_1 = require("chai");
const src_1 = require("../../../src");
describe("github issues > #4570 Fix PrimaryColumn decorator modifies passed option", () => {
    it("should not modify passed options to PrimaryColumn", () => {
        const options = { type: "varchar" };
        const clone = Object.assign({}, options);
        class Entity {
        }
        tslib_1.__decorate([
            (0, src_1.PrimaryColumn)(options),
            tslib_1.__metadata("design:type", String)
        ], Entity.prototype, "pkey", void 0);
        (0, chai_1.expect)(Entity).to.be;
        (0, chai_1.expect)(clone).to.be.eql(options);
    });
});
//# sourceMappingURL=issue-4570.js.map