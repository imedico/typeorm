"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
let Album = class Album {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Album.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Album.prototype, "name", void 0);
Album = tslib_1.__decorate([
    (0, Entity_1.Entity)({ synchronize: false })
], Album);
exports.Album = Album;
//# sourceMappingURL=Album.js.map