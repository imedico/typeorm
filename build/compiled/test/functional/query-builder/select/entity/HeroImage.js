"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroImage = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const Post_1 = require("./Post");
let HeroImage = class HeroImage {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], HeroImage.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], HeroImage.prototype, "url", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Post_1.Post, (post) => post.heroImage),
    tslib_1.__metadata("design:type", Post_1.Post)
], HeroImage.prototype, "post", void 0);
HeroImage = tslib_1.__decorate([
    (0, src_1.Entity)()
], HeroImage);
exports.HeroImage = HeroImage;
//# sourceMappingURL=HeroImage.js.map