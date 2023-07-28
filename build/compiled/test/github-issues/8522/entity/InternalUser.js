"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalUser = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const User_1 = require("./User");
let InternalUser = class InternalUser extends User_1.User {
};
InternalUser = tslib_1.__decorate([
    (0, src_1.ChildEntity)("internal")
], InternalUser);
exports.InternalUser = InternalUser;
//# sourceMappingURL=InternalUser.js.map