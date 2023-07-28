"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
let File = class File {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], File.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("text", {
        nullable: false,
        name: "name",
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("integer", {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], File.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)(),
    tslib_1.__metadata("design:type", File)
], File.prototype, "parent", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], File.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamp with time zone"),
    (0, src_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], File.prototype, "created", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamp with time zone"),
    (0, src_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], File.prototype, "modified", void 0);
File = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, src_1.Tree)("closure-table")
], File);
exports.File = File;
//# sourceMappingURL=file.entity.js.map