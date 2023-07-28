"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Record_1 = require("./Record");
let Car = class Car extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Car.prototype, "uuid", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "timestamp", precision: 3, nullable: true }),
    tslib_1.__metadata("design:type", Date)
], Car.prototype, "latestRecordTimestamp", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Record_1.Record, (record) => record.car),
    tslib_1.__metadata("design:type", Array)
], Car.prototype, "records", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Record_1.Record),
    (0, src_1.JoinColumn)([
        { name: "uuid", referencedColumnName: "carUuid" },
        { name: "latestRecordTimestamp", referencedColumnName: "timestamp" },
    ]),
    tslib_1.__metadata("design:type", Record_1.Record)
], Car.prototype, "latestRecord", void 0);
Car = tslib_1.__decorate([
    (0, src_1.Entity)()
], Car);
exports.Car = Car;
//# sourceMappingURL=Car.js.map