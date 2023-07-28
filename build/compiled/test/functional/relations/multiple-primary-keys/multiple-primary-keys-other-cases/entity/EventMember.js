"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventMember = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
const Event_1 = require("./Event");
const User_1 = require("./User");
const src_1 = require("../../../../../../src");
let EventMember = class EventMember {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], EventMember.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], EventMember.prototype, "eventId", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Event_1.Event, (event) => event.members),
    tslib_1.__metadata("design:type", Event_1.Event)
], EventMember.prototype, "event", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => User_1.User, (user) => user.members),
    tslib_1.__metadata("design:type", User_1.User)
], EventMember.prototype, "user", void 0);
EventMember = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], EventMember);
exports.EventMember = EventMember;
//# sourceMappingURL=EventMember.js.map