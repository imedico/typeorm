"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
const src_2 = require("../../../../../../src");
const src_3 = require("../../../../../../src");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_2.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_3.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("int"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "int", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("integer"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "integer", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("tinyint"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "tinyint", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("smallint"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "smallint", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("bigint"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "bigint", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("decimal"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "decimal", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("dec"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "dec", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("smalldecimal"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "smalldecimal", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("real"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "real", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("double"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "double", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("float"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "float", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("char"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "char", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("nchar"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "nchar", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("varchar"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "varchar", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("nvarchar"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "nvarchar", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("alphanum"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "alphanum", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("text"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("shorttext"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "shorttext", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("date"),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "dateObj", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("date"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "date", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("time"),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "timeObj", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("time"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "time", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("timestamp"),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("seconddate"),
    tslib_1.__metadata("design:type", Date
    // -------------------------------------------------------------------------
    // LOB Type
    // -------------------------------------------------------------------------
    )
], Post.prototype, "seconddate", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("blob"),
    tslib_1.__metadata("design:type", Buffer)
], Post.prototype, "blob", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("clob"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "clob", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("nclob"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "nclob", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("boolean"),
    tslib_1.__metadata("design:type", Boolean)
], Post.prototype, "boolean", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("varbinary"),
    tslib_1.__metadata("design:type", Buffer
    // -------------------------------------------------------------------------
    // TypeOrm Specific Type
    // -------------------------------------------------------------------------
    )
], Post.prototype, "varbinary", void 0);
tslib_1.__decorate([
    (0, src_3.Column)("simple-array"),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "simpleArray", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map