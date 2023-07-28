"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const Category_1 = require("./Category");
let Album = class Album {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Album.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Album.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Album.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Category_1.Category),
    (0, src_1.JoinColumn)({ name: "categoryId" }),
    tslib_1.__metadata("design:type", Category_1.Category)
], Album.prototype, "category", void 0);
Album = tslib_1.__decorate([
    (0, src_1.Entity)()
], Album);
exports.Album = Album;
//# sourceMappingURL=Album.js.map