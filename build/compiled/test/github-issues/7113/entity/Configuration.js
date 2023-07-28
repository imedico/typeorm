"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Configuration = class Configuration {
};
tslib_1.__decorate([
    (0, src_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", src_1.ObjectId)
], Configuration.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, src_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Configuration.prototype, "deletedAt", void 0);
Configuration = tslib_1.__decorate([
    (0, src_1.Entity)()
], Configuration);
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map