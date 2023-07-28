"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const Index_1 = require("../../../../../src/decorator/Index");
class Profile {
}
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "job", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    (0, Index_1.Index)("customer_profile_address"),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "address", void 0);
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map