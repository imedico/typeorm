"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersObject = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let UsersObject = class UsersObject {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({ type: "int" }),
    tslib_1.__metadata("design:type", Number)
], UsersObject.prototype, "id", void 0);
UsersObject = tslib_1.__decorate([
    (0, src_1.Entity)("UsersObject")
], UsersObject);
exports.UsersObject = UsersObject;
//# sourceMappingURL=usersObject.js.map