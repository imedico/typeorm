"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRole = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Event_1 = require("./Event");
const Role_1 = require("./Role");
let EventRole = class EventRole {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], EventRole.prototype, "eventId", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], EventRole.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], EventRole.prototype, "description", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], EventRole.prototype, "compensation", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Role_1.Role, (role) => role.roles, {
        onDelete: "CASCADE",
    }),
    tslib_1.__metadata("design:type", Role_1.Role)
], EventRole.prototype, "role", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Event_1.Event, (event) => event.roles, {
        onDelete: "CASCADE",
    }),
    tslib_1.__metadata("design:type", Event_1.Event)
], EventRole.prototype, "event", void 0);
EventRole = tslib_1.__decorate([
    (0, src_1.Entity)()
], EventRole);
exports.EventRole = EventRole;
//# sourceMappingURL=EventRole.js.map