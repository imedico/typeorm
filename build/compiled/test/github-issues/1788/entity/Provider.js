"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Personalization_1 = require("./Personalization");
let Provider = class Provider {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Provider.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Provider.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Provider.prototype, "description", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((_) => Personalization_1.Personalization),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Personalization_1.Personalization)
], Provider.prototype, "personalization", void 0);
Provider = tslib_1.__decorate([
    (0, src_1.Entity)()
], Provider);
exports.Provider = Provider;
//# sourceMappingURL=Provider.js.map