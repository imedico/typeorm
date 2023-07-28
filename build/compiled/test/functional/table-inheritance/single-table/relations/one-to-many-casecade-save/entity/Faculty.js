"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Staff_1 = require("./Staff");
const src_1 = require("../../../../../../../src");
let Faculty = class Faculty {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Faculty.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Faculty.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => Staff_1.Staff, (staff) => staff.faculty, {
        cascade: true,
        eager: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Faculty.prototype, "staff", void 0);
Faculty = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Faculty);
exports.Faculty = Faculty;
//# sourceMappingURL=Faculty.js.map