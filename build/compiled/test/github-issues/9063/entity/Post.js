"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ generated: "uuid" }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "generatedUuid1", void 0);
tslib_1.__decorate([
    (0, src_1.Generated)("uuid"),
    (0, src_1.Column)({ type: "uuid" }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "generatedUuid2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "uuid", default: () => "uuid_generate_v4()" }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "generatedUuid3", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "character varying", default: () => "uuid_generate_v4()" }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "nonGeneratedUuid1", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "character varying", default: () => "gen_random_uuid()" }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "nonGeneratedUuid2", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map