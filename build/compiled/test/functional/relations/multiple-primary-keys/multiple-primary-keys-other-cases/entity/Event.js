"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const OneToMany_1 = require("../../../../../../src/decorator/relations/OneToMany");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
const EventMember_1 = require("./EventMember");
const Person_1 = require("./Person");
let Event = class Event {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Event.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Person_1.Person),
    tslib_1.__metadata("design:type", Person_1.Person)
], Event.prototype, "author", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => EventMember_1.EventMember, (member) => member.event),
    tslib_1.__metadata("design:type", Array)
], Event.prototype, "members", void 0);
Event = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Event);
exports.Event = Event;
//# sourceMappingURL=Event.js.map