"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePost = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Index_1 = require("../../../src/decorator/Index");
let BasePost = class BasePost {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], BasePost.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], BasePost.prototype, "text", void 0);
tslib_1.__decorate([
    (0, Index_1.Index)(),
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], BasePost.prototype, "extra", void 0);
BasePost = tslib_1.__decorate([
    (0, Index_1.Index)("my_index_with_id_and_text", ["id", "text"])
], BasePost);
exports.BasePost = BasePost;
//# sourceMappingURL=BasePost.js.map