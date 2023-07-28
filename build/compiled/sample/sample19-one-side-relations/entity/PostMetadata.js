"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMetadata = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
let PostMetadata = class PostMetadata {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostMetadata.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)("text"),
    tslib_1.__metadata("design:type", String)
], PostMetadata.prototype, "comment", void 0);
PostMetadata = tslib_1.__decorate([
    (0, index_1.Entity)("sample19_post_metadata")
], PostMetadata);
exports.PostMetadata = PostMetadata;
//# sourceMappingURL=PostMetadata.js.map