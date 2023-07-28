"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Record = class Record {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Record.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "json" }),
    tslib_1.__metadata("design:type", Array)
], Record.prototype, "configs", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "jsonb" }),
    tslib_1.__metadata("design:type", Array)
], Record.prototype, "datas", void 0);
Record = tslib_1.__decorate([
    (0, src_1.Entity)()
], Record);
exports.Record = Record;
//# sourceMappingURL=Record.js.map