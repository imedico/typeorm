"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Master = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const OneToMany_1 = require("../../../../src/decorator/relations/OneToMany");
const detail_1 = require("./detail");
let Master = class Master {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)({
        length: 20,
    }),
    tslib_1.__metadata("design:type", String)
], Master.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        nullable: false,
        length: 150,
    }),
    tslib_1.__metadata("design:type", String)
], Master.prototype, "description", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => detail_1.Detail, (detail) => detail.master),
    tslib_1.__metadata("design:type", Array)
], Master.prototype, "details", void 0);
Master = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Master);
exports.Master = Master;
//# sourceMappingURL=master.js.map