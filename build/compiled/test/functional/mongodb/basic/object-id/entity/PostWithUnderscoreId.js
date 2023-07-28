"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithUnderscoreId = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ObjectIdColumn_1 = require("../../../../../../src/decorator/columns/ObjectIdColumn");
const typings_1 = require("../../../../../../src/driver/mongodb/typings");
let PostWithUnderscoreId = class PostWithUnderscoreId {
};
tslib_1.__decorate([
    (0, ObjectIdColumn_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", typings_1.ObjectId)
], PostWithUnderscoreId.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostWithUnderscoreId.prototype, "title", void 0);
PostWithUnderscoreId = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostWithUnderscoreId);
exports.PostWithUnderscoreId = PostWithUnderscoreId;
//# sourceMappingURL=PostWithUnderscoreId.js.map