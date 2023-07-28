"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Car_1 = require("./Car");
let Record = class Record extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.Column)({ type: "timestamp", precision: 3, primary: true }),
    tslib_1.__metadata("design:type", Date)
], Record.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "uuid", primary: true }),
    tslib_1.__metadata("design:type", String)
], Record.prototype, "carUuid", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Car_1.Car, (car) => car.records, { onDelete: "CASCADE" }),
    (0, src_1.JoinColumn)({ name: "carUuid" }),
    tslib_1.__metadata("design:type", Car_1.Car)
], Record.prototype, "car", void 0);
Record = tslib_1.__decorate([
    (0, src_1.Entity)()
], Record);
exports.Record = Record;
//# sourceMappingURL=Record.js.map