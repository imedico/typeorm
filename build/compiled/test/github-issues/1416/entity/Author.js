"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Photo_1 = require("./Photo");
let Author = class Author {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Author.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Author.prototype, "name", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => Photo_1.Photo, (photo) => photo.author),
    tslib_1.__metadata("design:type", Array)
], Author.prototype, "photos", void 0);
Author = tslib_1.__decorate([
    (0, index_1.Entity)()
], Author);
exports.Author = Author;
//# sourceMappingURL=Author.js.map