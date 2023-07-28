"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordContext = void 0;
const tslib_1 = require("tslib");
const JoinColumn_1 = require("../../../../../src/decorator/relations/JoinColumn");
const index_1 = require("../../../../../src/index");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const BaseEntity_1 = require("../../../../../src/repository/BaseEntity");
const user_1 = require("./user");
const record_1 = require("./record");
let RecordContext = class RecordContext extends BaseEntity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, index_1.PrimaryColumn)({ name: "record_id" }),
    tslib_1.__metadata("design:type", String)
], RecordContext.prototype, "recordId", void 0);
tslib_1.__decorate([
    (0, index_1.PrimaryColumn)({ name: "user_id" }),
    tslib_1.__metadata("design:type", String)
], RecordContext.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => record_1.Record, (record) => record.contexts),
    (0, JoinColumn_1.JoinColumn)({ name: "record_id" }),
    tslib_1.__metadata("design:type", record_1.Record)
], RecordContext.prototype, "record", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => user_1.User, (user) => user.contexts),
    (0, JoinColumn_1.JoinColumn)({ name: "user_id" }),
    tslib_1.__metadata("design:type", user_1.User)
], RecordContext.prototype, "user", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], RecordContext.prototype, "meta", void 0);
RecordContext = tslib_1.__decorate([
    (0, Entity_1.Entity)({ name: "record_contexts" })
], RecordContext);
exports.RecordContext = RecordContext;
//# sourceMappingURL=context.js.map