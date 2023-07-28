"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteEntity = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const AbstractEntity_1 = require("./AbstractEntity");
let ConcreteEntity = class ConcreteEntity extends AbstractEntity_1.AbstractEntity {
};
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ConcreteEntity.prototype, "position", void 0);
ConcreteEntity = tslib_1.__decorate([
    (0, index_1.Entity)()
], ConcreteEntity);
exports.ConcreteEntity = ConcreteEntity;
//# sourceMappingURL=ConcreteEntity.js.map