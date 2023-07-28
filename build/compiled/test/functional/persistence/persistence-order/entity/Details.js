"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Details = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
const Post_1 = require("./Post");
const Photo_1 = require("./Photo");
const JoinColumn_1 = require("../../../../../src/decorator/relations/JoinColumn");
let Details = class Details {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Details.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Details.prototype, "title", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Post_1.Post, (post) => post.details),
    tslib_1.__metadata("design:type", Post_1.Post)
], Details.prototype, "post", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Photo_1.Photo, (photo) => photo.details, {
        nullable: false,
    }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Photo_1.Photo)
], Details.prototype, "photo", void 0);
Details = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Details);
exports.Details = Details;
//# sourceMappingURL=Details.js.map