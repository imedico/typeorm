"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Faculty = class Faculty {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Faculty.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Faculty.prototype, "name", void 0);
Faculty = tslib_1.__decorate([
    (0, src_1.Entity)()
], Faculty);
exports.Faculty = Faculty;
//# sourceMappingURL=Faculty.js.map