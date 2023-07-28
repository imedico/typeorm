"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Person_1 = require("./Person");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("uuid"),
    tslib_1.__metadata("design:type", String)
], User.prototype, "personId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Person_1.Person, { cascade: true, onDelete: "CASCADE" }),
    tslib_1.__metadata("design:type", Person_1.Person)
], User.prototype, "person", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map