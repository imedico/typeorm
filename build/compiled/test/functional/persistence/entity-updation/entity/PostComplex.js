"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostComplex = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PostEmbedded_1 = require("./PostEmbedded");
const PrimaryColumn_1 = require("../../../../../src/decorator/columns/PrimaryColumn");
let PostComplex = class PostComplex {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostComplex.prototype, "firstId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: "Hello Complexity" }),
    tslib_1.__metadata("design:type", String)
], PostComplex.prototype, "text", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => PostEmbedded_1.PostEmbedded),
    tslib_1.__metadata("design:type", PostEmbedded_1.PostEmbedded)
], PostComplex.prototype, "embed", void 0);
PostComplex = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostComplex);
exports.PostComplex = PostComplex;
//# sourceMappingURL=PostComplex.js.map