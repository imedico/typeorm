"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sailing = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const ScheduledSailing_1 = require("./ScheduledSailing");
let Sailing = class Sailing extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Date)
], Sailing.prototype, "scheduled_departure_time", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => ScheduledSailing_1.ScheduledSailing, (scheduledSailing) => scheduledSailing.sailing),
    (0, src_1.JoinColumn)([
        {
            referencedColumnName: "scheduled_departure_time",
            name: "scheduled_departure_time",
        },
    ]),
    tslib_1.__metadata("design:type", Array)
], Sailing.prototype, "scheduled_sailings", void 0);
Sailing = tslib_1.__decorate([
    (0, src_1.Entity)()
], Sailing);
exports.Sailing = Sailing;
//# sourceMappingURL=Sailing.js.map