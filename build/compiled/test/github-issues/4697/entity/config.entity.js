"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
/**
 * @deprecated use item config instead
 */
let Config = class Config {
};
tslib_1.__decorate([
    (0, src_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", src_1.ObjectId)
], Config.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Config.prototype, "itemId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "json" }),
    tslib_1.__metadata("design:type", Object)
], Config.prototype, "data", void 0);
Config = tslib_1.__decorate([
    (0, src_1.Entity)()
], Config);
exports.Config = Config;
//# sourceMappingURL=config.entity.js.map