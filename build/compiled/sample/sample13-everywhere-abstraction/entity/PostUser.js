"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUser = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
let PostUser = class PostUser {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostUser.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)("int"),
    tslib_1.__metadata("design:type", String)
], PostUser.prototype, "name", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostUser.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostUser.prototype, "secondName", void 0);
PostUser = tslib_1.__decorate([
    (0, index_1.Entity)("sample13_post_user")
], PostUser);
exports.PostUser = PostUser;
//# sourceMappingURL=PostUser.js.map