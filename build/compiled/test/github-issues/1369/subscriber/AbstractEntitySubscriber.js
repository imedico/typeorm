"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEntitySubscriber = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const AbstractEntity_1 = require("../entity/AbstractEntity");
let AbstractEntitySubscriber = class AbstractEntitySubscriber {
    listenTo() {
        return AbstractEntity_1.AbstractEntity;
    }
    async beforeInsert(event) {
        this.updateFullName(event.entity);
    }
    async beforeUpdate(event) {
        if (event.entity) {
            this.updateFullName(event.entity);
        }
    }
    updateFullName(o) {
        o.fullname = o.firstname + " " + o.lastname;
    }
};
AbstractEntitySubscriber = tslib_1.__decorate([
    (0, index_1.EventSubscriber)()
], AbstractEntitySubscriber);
exports.AbstractEntitySubscriber = AbstractEntitySubscriber;
//# sourceMappingURL=AbstractEntitySubscriber.js.map