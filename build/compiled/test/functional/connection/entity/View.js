"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let View = class View {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], View.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], View.prototype, "title", void 0);
View = tslib_1.__decorate([
    (0, Entity_1.Entity)("view", { synchronize: false })
], View);
exports.View = View;
//# sourceMappingURL=View.js.map