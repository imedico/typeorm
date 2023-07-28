"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Profile = class Profile {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Profile.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "image", void 0);
Profile = tslib_1.__decorate([
    (0, src_1.Entity)()
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map