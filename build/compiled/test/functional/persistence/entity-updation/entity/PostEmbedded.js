"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEmbedded = void 0;
const tslib_1 = require("tslib");
const PrimaryColumn_1 = require("../../../../../src/decorator/columns/PrimaryColumn");
const UpdateDateColumn_1 = require("../../../../../src/decorator/columns/UpdateDateColumn");
const CreateDateColumn_1 = require("../../../../../src/decorator/columns/CreateDateColumn");
const VersionColumn_1 = require("../../../../../src/decorator/columns/VersionColumn");
class PostEmbedded {
}
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostEmbedded.prototype, "secondId", void 0);
tslib_1.__decorate([
    (0, CreateDateColumn_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PostEmbedded.prototype, "createDate", void 0);
tslib_1.__decorate([
    (0, UpdateDateColumn_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PostEmbedded.prototype, "updateDate", void 0);
tslib_1.__decorate([
    (0, VersionColumn_1.VersionColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostEmbedded.prototype, "version", void 0);
exports.PostEmbedded = PostEmbedded;
//# sourceMappingURL=PostEmbedded.js.map