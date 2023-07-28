"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const src_1 = require("../../../../src");
let Bar = class Bar {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], Bar.prototype, "id", void 0);
Bar = tslib_1.__decorate([
    (0, Entity_1.Entity)("bar", { schema: "foo" })
], Bar);
exports.Bar = Bar;
//# sourceMappingURL=Bar.js.map