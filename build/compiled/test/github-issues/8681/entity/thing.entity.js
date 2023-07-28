"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thing = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const item_entity_1 = require("./item.entity");
let Thing = class Thing {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Thing.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => item_entity_1.Item, (item) => item.thing),
    tslib_1.__metadata("design:type", Array)
], Thing.prototype, "items", void 0);
Thing = tslib_1.__decorate([
    (0, src_1.Entity)()
], Thing);
exports.Thing = Thing;
//# sourceMappingURL=thing.entity.js.map