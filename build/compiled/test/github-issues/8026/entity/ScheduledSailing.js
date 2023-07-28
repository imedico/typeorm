"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledSailing = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Sailing_1 = require("./Sailing");
let ScheduledSailing = class ScheduledSailing extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Date)
], ScheduledSailing.prototype, "scheduled_departure_time", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], ScheduledSailing.prototype, "scheduled_arrival_time", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Sailing_1.Sailing, (sailing) => sailing.scheduled_sailings),
    (0, src_1.JoinColumn)([
        {
            referencedColumnName: "scheduled_departure_time",
            name: "scheduled_departure_time",
        },
    ]),
    tslib_1.__metadata("design:type", Sailing_1.Sailing)
], ScheduledSailing.prototype, "sailing", void 0);
ScheduledSailing = tslib_1.__decorate([
    (0, src_1.Entity)()
], ScheduledSailing);
exports.ScheduledSailing = ScheduledSailing;
//# sourceMappingURL=ScheduledSailing.js.map