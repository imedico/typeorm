"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildEntity2 = exports.ChildEntity1 = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var FooEnum;
(function (FooEnum) {
    FooEnum[FooEnum["FOO"] = 0] = "FOO";
    FooEnum[FooEnum["BAR"] = 1] = "BAR";
})(FooEnum || (FooEnum = {}));
class ParentEntity {
}
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ParentEntity.prototype, "ud", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "enum",
        enum: FooEnum,
        enumName: "foo_enum",
    }),
    tslib_1.__metadata("design:type", Number)
], ParentEntity.prototype, "foo", void 0);
let ChildEntity1 = class ChildEntity1 extends ParentEntity {
};
ChildEntity1 = tslib_1.__decorate([
    (0, src_1.Entity)()
], ChildEntity1);
exports.ChildEntity1 = ChildEntity1;
let ChildEntity2 = class ChildEntity2 extends ParentEntity {
};
ChildEntity2 = tslib_1.__decorate([
    (0, src_1.Entity)()
], ChildEntity2);
exports.ChildEntity2 = ChildEntity2;
//# sourceMappingURL=Test.js.map