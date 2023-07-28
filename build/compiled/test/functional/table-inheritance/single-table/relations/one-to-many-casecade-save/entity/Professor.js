"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
const tslib_1 = require("tslib");
const ChildEntity_1 = require("../../../../../../../src/decorator/entity/ChildEntity");
const Staff_1 = require("./Staff");
const src_1 = require("../../../../../../../src");
let Professor = class Professor extends Staff_1.Staff {
    constructor(className) {
        super();
        this.className = className;
    }
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Professor.prototype, "className", void 0);
Professor = tslib_1.__decorate([
    (0, ChildEntity_1.ChildEntity)("PROFESSOR"),
    tslib_1.__metadata("design:paramtypes", [String])
], Professor);
exports.Professor = Professor;
//# sourceMappingURL=Professor.js.map