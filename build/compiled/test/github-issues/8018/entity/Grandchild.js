"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grandchild = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Child_1 = require("./Child");
let Grandchild = class Grandchild {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Grandchild.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Child_1.Child, (parent) => parent.children),
    tslib_1.__metadata("design:type", Child_1.Child)
], Grandchild.prototype, "parent", void 0);
Grandchild = tslib_1.__decorate([
    (0, src_1.Entity)()
], Grandchild);
exports.Grandchild = Grandchild;
//# sourceMappingURL=Grandchild.js.map