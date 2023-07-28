"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRole = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Role_1 = require("./Role");
let ClientRole = class ClientRole extends Role_1.Role {
};
ClientRole = tslib_1.__decorate([
    (0, src_1.ChildEntity)("internal")
], ClientRole);
exports.ClientRole = ClientRole;
//# sourceMappingURL=ClientRole.js.map