"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostInformation = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PostCounter_1 = require("./PostCounter");
const BeforeInsert_1 = require("../../../../../src/decorator/listeners/BeforeInsert");
const Index_1 = require("../../../../../src/decorator/Index");
class PostInformation {
    constructor() {
        this.counters = new PostCounter_1.PostCounter();
    }
    beforeInsert() {
        this.description = "default post description";
    }
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    (0, Index_1.Index)(),
    tslib_1.__metadata("design:type", String)
], PostInformation.prototype, "description", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => PostCounter_1.PostCounter, { prefix: "counters" }),
    tslib_1.__metadata("design:type", PostCounter_1.PostCounter)
], PostInformation.prototype, "counters", void 0);
tslib_1.__decorate([
    (0, BeforeInsert_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostInformation.prototype, "beforeInsert", null);
exports.PostInformation = PostInformation;
//# sourceMappingURL=PostInformation.js.map