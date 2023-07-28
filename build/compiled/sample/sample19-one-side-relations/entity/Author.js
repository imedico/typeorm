"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
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
Author = tslib_1.__decorate([
    (0, index_1.Entity)("sample19_author")
], Author);
exports.Author = Author;
//# sourceMappingURL=Author.js.map