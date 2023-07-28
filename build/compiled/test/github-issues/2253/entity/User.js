"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubUser = exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "type", void 0);
User = tslib_1.__decorate([
    (0, src_1.TableInheritance)({ column: "type" }),
    (0, src_1.Entity)()
], User);
exports.User = User;
let SubUser = class SubUser extends User {
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], SubUser.prototype, "anotherColumn", void 0);
SubUser = tslib_1.__decorate([
    (0, src_1.ChildEntity)("sub")
], SubUser);
exports.SubUser = SubUser;
//# sourceMappingURL=User.js.map