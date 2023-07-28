"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.lowercase = exports.encrypt = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const encode = {
    to: (entityValue) => {
        return encodeURI(entityValue);
    },
    from: (databaseValue) => {
        return decodeURI(databaseValue);
    },
};
exports.encrypt = {
    to: (entityValue) => {
        return Buffer.from(entityValue).toString("base64");
    },
    from: (databaseValue) => {
        return Buffer.from(databaseValue, "base64").toString();
    },
};
exports.lowercase = {
    to: (entityValue) => {
        return entityValue.toLocaleLowerCase();
    },
    from: (databaseValue) => {
        return databaseValue;
    },
};
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ transformer: [exports.lowercase, encode, exports.encrypt] }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map