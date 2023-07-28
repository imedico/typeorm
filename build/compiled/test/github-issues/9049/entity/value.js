"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Value = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
class Value {
}
tslib_1.__decorate([
    (0, src_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", src_1.ObjectId)
], Value.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "string" }),
    tslib_1.__metadata("design:type", String)
], Value.prototype, "description", void 0);
exports.Value = Value;
//# sourceMappingURL=value.js.map