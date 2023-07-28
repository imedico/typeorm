"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const zip_1 = require("./zip");
let Country = class Country {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({ length: 2 }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "code", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "caption", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => zip_1.Zip, (zip) => zip.country),
    tslib_1.__metadata("design:type", Array)
], Country.prototype, "zips", void 0);
Country = tslib_1.__decorate([
    (0, src_1.Entity)()
], Country);
exports.Country = Country;
//# sourceMappingURL=country.js.map