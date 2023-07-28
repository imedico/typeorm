"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parent = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Child_1 = require("./Child");
let Parent = class Parent {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Parent.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Parent.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Child_1.Child, (child) => child.parent),
    tslib_1.__metadata("design:type", Array)
], Parent.prototype, "children", void 0);
Parent = tslib_1.__decorate([
    (0, src_1.Entity)()
], Parent);
exports.Parent = Parent;
//# sourceMappingURL=Parent.js.map