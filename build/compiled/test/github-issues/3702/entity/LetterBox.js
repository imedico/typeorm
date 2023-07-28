"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LetterBox = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Column_1 = require("../../../../src/decorator/columns/Column");
let LetterBox = class LetterBox {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], LetterBox.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "point", srid: 4326 }),
    tslib_1.__metadata("design:type", String)
], LetterBox.prototype, "coord", void 0);
LetterBox = tslib_1.__decorate([
    (0, src_1.Entity)()
], LetterBox);
exports.LetterBox = LetterBox;
//# sourceMappingURL=LetterBox.js.map