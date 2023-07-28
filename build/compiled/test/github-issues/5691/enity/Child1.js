"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Child1 = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Root_1 = require("./Root");
const Shared_1 = require("./Shared");
let Child1 = class Child1 {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Child1.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Root_1.Root, (entity) => entity.allChild1),
    tslib_1.__metadata("design:type", Root_1.Root)
], Child1.prototype, "root", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("root"),
    tslib_1.__metadata("design:type", String)
], Child1.prototype, "rootId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Shared_1.Shared, (entity) => entity.child1),
    tslib_1.__metadata("design:type", Array)
], Child1.prototype, "allShared", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("allShared"),
    tslib_1.__metadata("design:type", Array)
], Child1.prototype, "allSharedId", void 0);
Child1 = tslib_1.__decorate([
    (0, src_1.Entity)()
], Child1);
exports.Child1 = Child1;
//# sourceMappingURL=Child1.js.map