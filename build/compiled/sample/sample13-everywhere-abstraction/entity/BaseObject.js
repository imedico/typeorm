"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseObject = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const BasePost_1 = require("./BasePost");
const PostAuthor_1 = require("./PostAuthor");
const ManyToOne_1 = require("../../../src/decorator/relations/ManyToOne");
const PrimaryColumn_1 = require("../../../src/decorator/columns/PrimaryColumn");
const Generated_1 = require("../../../src/decorator/Generated");
class BaseObject extends BasePost_1.BasePost {
}
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)("double"),
    (0, Generated_1.Generated)(),
    tslib_1.__metadata("design:type", Number)
], BaseObject.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], BaseObject.prototype, "title", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => PostAuthor_1.PostAuthor, (post) => post.posts, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", PostAuthor_1.PostAuthor)
], BaseObject.prototype, "author", void 0);
exports.BaseObject = BaseObject;
//# sourceMappingURL=BaseObject.js.map