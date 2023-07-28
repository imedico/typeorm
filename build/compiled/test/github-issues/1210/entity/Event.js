"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const tslib_1 = require("tslib");
const typings_1 = require("../../../../src/driver/mongodb/typings");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const ObjectIdColumn_1 = require("../../../../src/decorator/columns/ObjectIdColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Event = class Event {
};
tslib_1.__decorate([
    (0, ObjectIdColumn_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", typings_1.ObjectId)
], Event.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Event.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "at_date", default: Date.now }),
    tslib_1.__metadata("design:type", Date
    // @Column( type => User)
    // participants: User[]
    )
], Event.prototype, "date", void 0);
Event = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Event);
exports.Event = Event;
//# sourceMappingURL=Event.js.map