"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parent = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Child_1 = require("./Child");
let Parent = class Parent {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)({
        name: "id",
        type: "int",
    }),
    tslib_1.__metadata("design:type", Number)
], Parent.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => Child_1.Child, (child) => child.parent, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE",
    }),
    tslib_1.__metadata("design:type", Array)
], Parent.prototype, "children", void 0);
Parent = tslib_1.__decorate([
    (0, src_1.Entity)("test_parent")
], Parent);
exports.Parent = Parent;
//# sourceMappingURL=Parent.js.map