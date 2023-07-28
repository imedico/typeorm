"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const User_1 = require("./User");
const trim = {
    to: (entityValue) => {
        return entityValue.trim();
    },
    from: (databaseValue) => {
        return databaseValue;
    },
};
let Category = class Category {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ transformer: [User_1.lowercase, trim, User_1.encrypt] }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "description", void 0);
Category = tslib_1.__decorate([
    (0, src_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map