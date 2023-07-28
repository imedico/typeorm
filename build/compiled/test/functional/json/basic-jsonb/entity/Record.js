"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
/**
 * For testing Postgres jsonb
 */
let Record = class Record {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Record.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "json", nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Record.prototype, "config", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "jsonb", nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Record.prototype, "data", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "jsonb",
        nullable: true,
        default: { hello: "world", foo: "bar" },
    }),
    tslib_1.__metadata("design:type", Object)
], Record.prototype, "dataWithDefaultObject", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "jsonb", nullable: true, default: null }),
    tslib_1.__metadata("design:type", Object)
], Record.prototype, "dataWithDefaultNull", void 0);
Record = tslib_1.__decorate([
    (0, src_1.Entity)()
], Record);
exports.Record = Record;
//# sourceMappingURL=Record.js.map