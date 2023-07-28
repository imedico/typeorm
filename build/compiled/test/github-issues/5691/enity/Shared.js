"use strict";
var Shared_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shared = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Child1_1 = require("./Child1");
const Child2_1 = require("./Child2");
const Root_1 = require("./Root");
let Shared = Shared_1 = class Shared {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Shared.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Root_1.Root, (entity) => entity.allShared),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Root_1.Root)
], Shared.prototype, "root", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("root"),
    tslib_1.__metadata("design:type", String)
], Shared.prototype, "rootId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Child1_1.Child1, (entity) => entity.allShared),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Child1_1.Child1)
], Shared.prototype, "child1", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("child1"),
    tslib_1.__metadata("design:type", String)
], Shared.prototype, "child1Id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Child2_1.Child2, (entity) => entity.allShared),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Child2_1.Child2)
], Shared.prototype, "child2", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("child2"),
    tslib_1.__metadata("design:type", String)
], Shared.prototype, "child2Id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Shared_1, (entity) => entity.allShared),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Shared)
], Shared.prototype, "shared", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("shared"),
    tslib_1.__metadata("design:type", String)
], Shared.prototype, "sharedId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Shared_1, (entity) => entity.shared),
    tslib_1.__metadata("design:type", Array)
], Shared.prototype, "allShared", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)("allShared"),
    tslib_1.__metadata("design:type", Array)
], Shared.prototype, "allSharedId", void 0);
Shared = Shared_1 = tslib_1.__decorate([
    (0, src_1.Entity)()
], Shared);
exports.Shared = Shared;
//# sourceMappingURL=Shared.js.map