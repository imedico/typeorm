"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePost = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const BaseContent_1 = require("./BaseContent");
class BasePost extends BaseContent_1.BaseContent {
}
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], BasePost.prototype, "id", void 0);
exports.BasePost = BasePost;
//# sourceMappingURL=BasePost.js.map