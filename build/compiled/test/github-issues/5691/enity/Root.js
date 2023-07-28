"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Child1_1 = require("./Child1");
const Child2_1 = require("./Child2");
const Shared_1 = require("./Shared");
let Root = class Root {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Root.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Shared_1.Shared, (entity) => entity.root),
    tslib_1.__metadata("design:type", Array)
], Root.prototype, "allShared", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("allShared"),
    tslib_1.__metadata("design:type", Array)
], Root.prototype, "allSharedId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Child1_1.Child1, (entity) => entity.root),
    tslib_1.__metadata("design:type", Array)
], Root.prototype, "allChild1", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("allChild1"),
    tslib_1.__metadata("design:type", Array)
], Root.prototype, "allChild1Id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => Child2_1.Child2, (entity) => entity.allRoot),
    (0, src_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Root.prototype, "allChild2", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("allChild2"),
    tslib_1.__metadata("design:type", Array)
], Root.prototype, "allChild2Id", void 0);
Root = tslib_1.__decorate([
    (0, src_1.Entity)()
], Root);
exports.Root = Root;
//# sourceMappingURL=Root.js.map