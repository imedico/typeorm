"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Error = class Error {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Error.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("uniqueidentifier", { nullable: false }),
    tslib_1.__metadata("design:type", String)
], Error.prototype, "executionGuid", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Error.prototype, "errorNumber", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Error.prototype, "errorDescription", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Error.prototype, "errorDate", void 0);
Error = tslib_1.__decorate([
    (0, src_1.Entity)("Error")
], Error);
exports.Error = Error;
//# sourceMappingURL=Error.js.map