"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalRole = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Role_1 = require("./Role");
let InternalRole = class InternalRole extends Role_1.Role {
};
InternalRole = tslib_1.__decorate([
    (0, src_1.ChildEntity)("internal")
], InternalRole);
exports.InternalRole = InternalRole;
//# sourceMappingURL=InternalRole.js.map