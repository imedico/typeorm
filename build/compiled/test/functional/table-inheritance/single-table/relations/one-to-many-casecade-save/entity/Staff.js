"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../../src");
const Faculty_1 = require("./Faculty");
let Staff = class Staff {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Staff.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Faculty_1.Faculty, (faculty) => faculty.staff),
    tslib_1.__metadata("design:type", Faculty_1.Faculty)
], Staff.prototype, "faculty", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Staff.prototype, "type", void 0);
Staff = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.TableInheritance)({ column: { name: "type", type: String } })
], Staff);
exports.Staff = Staff;
//# sourceMappingURL=Staff.js.map