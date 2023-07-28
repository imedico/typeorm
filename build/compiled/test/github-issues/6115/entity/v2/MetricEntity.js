"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metric = exports.Operator = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const src_2 = require("../../../../../src");
var Operator;
(function (Operator) {
    Operator["LT"] = "lessthan";
    Operator["LE"] = "lessequal";
    Operator["EQ"] = "equal";
    Operator["NE"] = "notequal";
    Operator["GE"] = "greaterequal";
    Operator["GT"] = "greaterthan";
})(Operator = exports.Operator || (exports.Operator = {}));
let Metric = class Metric {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Metric.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: Operator, default: Operator.EQ }),
    tslib_1.__metadata("design:type", String)
], Metric.prototype, "defaultOperator", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: Operator, default: Operator.EQ }),
    tslib_1.__metadata("design:type", String)
], Metric.prototype, "defaultOperator2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: Operator }),
    tslib_1.__metadata("design:type", String)
], Metric.prototype, "defaultOperator3", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: Operator, default: Operator.GT }),
    tslib_1.__metadata("design:type", String)
], Metric.prototype, "defaultOperator4", void 0);
Metric = tslib_1.__decorate([
    (0, src_2.Entity)()
], Metric);
exports.Metric = Metric;
//# sourceMappingURL=MetricEntity.js.map