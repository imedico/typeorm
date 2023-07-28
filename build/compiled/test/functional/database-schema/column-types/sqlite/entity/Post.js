"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
const FruitEnum_1 = require("../enum/FruitEnum");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("integer"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "integer", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "int", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int2"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "int2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int8"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "int8", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("tinyint"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "tinyint", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("smallint"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "smallint", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("mediumint"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "mediumint", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("bigint"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "bigint", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("unsigned big int"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "unsignedBigInt", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("character"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "character", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("varchar"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "varchar", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("varying character"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "varyingCharacter", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("nchar"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "nchar", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("native character"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "nativeCharacter", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("nvarchar"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "nvarchar", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("text"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("blob"),
    tslib_1.__metadata("design:type", Buffer)
], Post.prototype, "blob", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("clob"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "clob", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("real"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "real", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("double"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "double", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("double precision"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "doublePrecision", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("float"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "float", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("numeric"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "numeric", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("decimal"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "decimal", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("boolean"),
    tslib_1.__metadata("design:type", Boolean)
], Post.prototype, "boolean", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("date"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "date", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("datetime"),
    tslib_1.__metadata("design:type", Date
    // -------------------------------------------------------------------------
    // Other Types
    // -------------------------------------------------------------------------
    )
], Post.prototype, "datetime", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("json"),
    tslib_1.__metadata("design:type", Object
    // -------------------------------------------------------------------------
    // TypeOrm Specific Types
    // -------------------------------------------------------------------------
    )
], Post.prototype, "json", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("simple-array"),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "simpleArray", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("simple-json"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "simpleJson", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("simple-enum", { enum: ["A", "B", "C"] }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "simpleEnum", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("simple-enum", { enum: FruitEnum_1.FruitEnum }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "simpleClassEnum1", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map