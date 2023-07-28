"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Child2 = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Root_1 = require("./Root");
const Shared_1 = require("./Shared");
let Child2 = class Child2 {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Child2.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => Root_1.Root, (entity) => entity.allChild2),
    tslib_1.__metadata("design:type", Root_1.Root)
], Child2.prototype, "allRoot", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("allRoot"),
    tslib_1.__metadata("design:type", Array)
], Child2.prototype, "allRootId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Shared_1.Shared, (entity) => entity.child2),
    tslib_1.__metadata("design:type", Array)
], Child2.prototype, "allShared", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("allShared"),
    tslib_1.__metadata("design:type", Array)
], Child2.prototype, "allSharedId", void 0);
Child2 = tslib_1.__decorate([
    (0, src_1.Entity)()
], Child2);
exports.Child2 = Child2;
//# sourceMappingURL=Child2.js.map