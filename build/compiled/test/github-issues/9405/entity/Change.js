"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Change = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const ChangeLog_1 = require("./ChangeLog");
let Change = class Change {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)("increment"),
    tslib_1.__metadata("design:type", Number)
], Change.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)("varchar", { nullable: false, length: 255 }),
    tslib_1.__metadata("design:type", String)
], Change.prototype, "propertyName", void 0);
tslib_1.__decorate([
    (0, index_1.Column)("json", { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Change.prototype, "oldValue", void 0);
tslib_1.__decorate([
    (0, index_1.Column)("json", { nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Change.prototype, "newValue", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)(() => ChangeLog_1.ChangeLog, {
        cascade: false,
        nullable: false,
        onDelete: "CASCADE",
    }),
    tslib_1.__metadata("design:type", ChangeLog_1.ChangeLog)
], Change.prototype, "log", void 0);
Change = tslib_1.__decorate([
    (0, index_1.Entity)()
], Change);
exports.Change = Change;
//# sourceMappingURL=Change.js.map