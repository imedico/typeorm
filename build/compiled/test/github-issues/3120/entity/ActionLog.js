"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionLog = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
const JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const ActionDetails_1 = require("./ActionDetails");
const Address_1 = require("./Address");
const Person_1 = require("./Person");
let ActionLog = class ActionLog {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ActionLog.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], ActionLog.prototype, "date", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ActionLog.prototype, "action", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Person_1.Person, {
        createForeignKeyConstraints: false,
    }),
    tslib_1.__metadata("design:type", Person_1.Person)
], ActionLog.prototype, "person", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Address_1.Address, {
        createForeignKeyConstraints: false,
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], ActionLog.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => ActionDetails_1.ActionDetails, {
        createForeignKeyConstraints: false,
    }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", ActionDetails_1.ActionDetails)
], ActionLog.prototype, "actionDetails", void 0);
ActionLog = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], ActionLog);
exports.ActionLog = ActionLog;
//# sourceMappingURL=ActionLog.js.map