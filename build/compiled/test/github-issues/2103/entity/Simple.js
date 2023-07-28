"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simple = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Simple = class Simple {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Simple.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Simple.prototype, "x", void 0);
Simple = tslib_1.__decorate([
    (0, src_1.Entity)()
], Simple);
exports.Simple = Simple;
//# sourceMappingURL=Simple.js.map