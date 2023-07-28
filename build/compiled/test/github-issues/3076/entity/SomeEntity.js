"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeEntity = exports.CreationMechanism = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
var CreationMechanism;
(function (CreationMechanism) {
    CreationMechanism["SOURCE_A"] = "SOURCE_A";
    CreationMechanism["SOURCE_B"] = "SOURCE_B";
    CreationMechanism["SOURCE_C"] = "SOURCE_C";
    CreationMechanism["SOURCE_D"] = "SOURCE_D";
})(CreationMechanism = exports.CreationMechanism || (exports.CreationMechanism = {}));
let SomeEntity = class SomeEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SomeEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "enum",
        enumName: "creation_mechanism_enum",
        enum: CreationMechanism,
        default: CreationMechanism.SOURCE_A,
    }),
    tslib_1.__metadata("design:type", String)
], SomeEntity.prototype, "creationMechanism", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: false, default: () => "now()" }),
    tslib_1.__metadata("design:type", Date)
], SomeEntity.prototype, "createdAt", void 0);
SomeEntity = tslib_1.__decorate([
    (0, src_2.Entity)({ name: "some_entity", schema: "some_schema" })
], SomeEntity);
exports.SomeEntity = SomeEntity;
//# sourceMappingURL=SomeEntity.js.map