"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book2 = exports.Book = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Book = class Book {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "ean", void 0);
Book = tslib_1.__decorate([
    (0, src_1.Entity)()
], Book);
exports.Book = Book;
let Book2 = class Book2 {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Book2.prototype, "ean", void 0);
Book2 = tslib_1.__decorate([
    (0, src_1.Entity)({ withoutRowid: true })
], Book2);
exports.Book2 = Book2;
//# sourceMappingURL=Book.js.map