"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
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
    tslib_1.__metadata("design:type", String)
], Post.prototype, "integer", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int4"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "int4", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "int", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("smallint"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "smallint", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int2"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "int2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("bigint"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "bigint", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int8"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "int8", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int64"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "int64", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("double precision"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "doublePrecision", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("float4"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "float4", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("float8"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "float8", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("real"),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "real", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("numeric"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "numeric", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("decimal"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "decimal", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("dec"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "dec", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("char"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "char", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("character"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "character", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("varchar"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "varchar", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("character varying"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "characterVarying", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("char varying"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "charVarying", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("string"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "string", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("text"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("bytes"),
    tslib_1.__metadata("design:type", Buffer)
], Post.prototype, "bytes", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("bytea"),
    tslib_1.__metadata("design:type", Buffer)
], Post.prototype, "bytea", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("blob"),
    tslib_1.__metadata("design:type", Buffer
    // -------------------------------------------------------------------------
    // Date/Time Types
    // -------------------------------------------------------------------------
    )
], Post.prototype, "blob", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("date"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "date", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("interval"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "interval", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("time"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "time", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("time without time zone"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "timeWithoutTimeZone", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamp"),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamp with time zone"),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "timestampWithTimeZone", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamp without time zone"),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "timestampWithoutTimeZone", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamptz"),
    tslib_1.__metadata("design:type", Date
    // -------------------------------------------------------------------------
    // Boolean Type
    // -------------------------------------------------------------------------
    )
], Post.prototype, "timestamptz", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("boolean"),
    tslib_1.__metadata("design:type", Boolean)
], Post.prototype, "boolean", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("bool"),
    tslib_1.__metadata("design:type", Boolean)
], Post.prototype, "bool", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("inet"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "inet", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geometry"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "point", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geometry"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "polygon", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geometry"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "multipoint", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geometry"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "linestring", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geometry"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "multilinestring", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geometry"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "multipolygon", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geometry"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "geometrycollection", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geography"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "point_geography", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geography"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "polygon_geography", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geography"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "multipoint_geography", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geography"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "linestring_geography", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geography"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "multilinestring_geography", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geography"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "multipolygon_geography", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("geography"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "geometrycollection_geography", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("uuid"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "uuid", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("jsonb"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "jsonb", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("json"),
    tslib_1.__metadata("design:type", Object
    // -------------------------------------------------------------------------
    // Array Type
    // -------------------------------------------------------------------------
    )
], Post.prototype, "json", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int", { array: true }),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "array", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("simple-array"),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "simpleArray", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("simple-json"),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "simpleJson", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map