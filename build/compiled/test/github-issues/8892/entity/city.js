"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const zip_1 = require("./zip");
let City = class City {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], City.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], City.prototype, "caption", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)((city) => city.zips),
    tslib_1.__metadata("design:type", Array)
], City.prototype, "zipCodes", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => zip_1.Zip, (zip) => zip.cities, {
    // cascade: true,
    }),
    (0, src_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], City.prototype, "zips", void 0);
City = tslib_1.__decorate([
    (0, src_1.Entity)()
], City);
exports.City = City;
//# sourceMappingURL=city.js.map