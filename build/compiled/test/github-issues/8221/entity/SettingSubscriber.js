"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingSubscriber = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Setting_1 = require("./Setting");
let SettingSubscriber = class SettingSubscriber {
    constructor() {
        this.reset();
    }
    listenTo() {
        return Setting_1.Setting;
    }
    afterLoad(item, event) {
        // just an example, any entity modification on after load will lead to this issue
        item.value = "x";
    }
    beforeUpdate(event) {
        this.counter.updates++;
    }
    beforeInsert(event) {
        this.counter.inserts++;
    }
    beforeRemove(event) {
        this.counter.deletes++;
    }
    reset() {
        this.counter = {
            deletes: 0,
            inserts: 0,
            updates: 0,
        };
    }
};
SettingSubscriber = tslib_1.__decorate([
    (0, src_1.EventSubscriber)(),
    tslib_1.__metadata("design:paramtypes", [])
], SettingSubscriber);
exports.SettingSubscriber = SettingSubscriber;
//# sourceMappingURL=SettingSubscriber.js.map