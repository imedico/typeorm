"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../../src/index");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const BaseEntity_1 = require("../../../../../src/repository/BaseEntity");
const context_1 = require("./context");
let Record = class Record extends BaseEntity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, index_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Record.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => context_1.RecordContext, (context) => context.record),
    tslib_1.__metadata("design:type", Array)
], Record.prototype, "contexts", void 0);
Record = tslib_1.__decorate([
    (0, Entity_1.Entity)({ name: "records" })
], Record);
exports.Record = Record;
//# sourceMappingURL=record.js.map