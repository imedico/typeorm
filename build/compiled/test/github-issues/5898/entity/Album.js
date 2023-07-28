"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Photo_1 = require("./Photo");
let Album = class Album {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], Album.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Photo_1.Photo, (photo) => photo.album, { onDelete: "CASCADE" }),
    tslib_1.__metadata("design:type", Array)
], Album.prototype, "photos", void 0);
Album = tslib_1.__decorate([
    (0, src_1.Entity)()
], Album);
exports.Album = Album;
//# sourceMappingURL=Album.js.map