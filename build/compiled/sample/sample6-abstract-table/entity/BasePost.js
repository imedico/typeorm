"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePost = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
class BasePost {
}
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], BasePost.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], BasePost.prototype, "title", void 0);
exports.BasePost = BasePost;
//# sourceMappingURL=BasePost.js.map