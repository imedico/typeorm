"use strict";
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let User = User_1 = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "key", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ name: "client_id" }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "clientId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ name: "updated_by" }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "updatedById", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => User_1),
    (0, src_1.JoinColumn)([
        { name: "client_id", referencedColumnName: "clientId" },
        { name: "updated_by", referencedColumnName: "key" },
    ]),
    tslib_1.__metadata("design:type", Promise)
], User.prototype, "updatedBy", void 0);
User = User_1 = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Unique)(["clientId", "key"])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map