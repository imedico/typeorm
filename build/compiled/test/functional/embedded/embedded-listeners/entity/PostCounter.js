"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCounter = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const BeforeInsert_1 = require("../../../../../src/decorator/listeners/BeforeInsert");
const BeforeUpdate_1 = require("../../../../../src/decorator/listeners/BeforeUpdate");
const Index_1 = require("../../../../../src/decorator/Index");
let PostCounter = class PostCounter {
    beforeInsert() {
        this.likes = 0;
        this.favorites = 0;
        this.comments = 0;
    }
    beforeUpdate() {
        this.likes++;
        this.favorites++;
        this.comments++;
    }
};
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PostCounter.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PostCounter.prototype, "favorites", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PostCounter.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, BeforeInsert_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCounter.prototype, "beforeInsert", null);
tslib_1.__decorate([
    (0, BeforeUpdate_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCounter.prototype, "beforeUpdate", null);
PostCounter = tslib_1.__decorate([
    (0, Index_1.Index)(["likes", "favorites"])
], PostCounter);
exports.PostCounter = PostCounter;
//# sourceMappingURL=PostCounter.js.map