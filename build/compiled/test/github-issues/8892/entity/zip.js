"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zip = void 0;
const tslib_1 = require("tslib");
const city_1 = require("./city");
const src_1 = require("../../../../src");
const country_1 = require("./country");
let Zip = class Zip {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({ length: 2 }),
    tslib_1.__metadata("design:type", String)
], Zip.prototype, "countryCode", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => country_1.Country, (country) => country.zips),
    tslib_1.__metadata("design:type", country_1.Country)
], Zip.prototype, "country", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Zip.prototype, "code", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => city_1.City, (city) => city.zips),
    tslib_1.__metadata("design:type", Array)
], Zip.prototype, "cities", void 0);
Zip = tslib_1.__decorate([
    (0, src_1.Entity)()
], Zip);
exports.Zip = Zip;
//# sourceMappingURL=zip.js.map