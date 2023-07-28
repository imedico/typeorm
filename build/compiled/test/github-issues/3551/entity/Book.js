"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.Chapter = exports.Page = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
class Page {
}
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Page.prototype, "number", void 0);
exports.Page = Page;
class Chapter {
}
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Chapter.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.Column)((type) => Page),
    tslib_1.__metadata("design:type", Array)
], Chapter.prototype, "pages", void 0);
exports.Chapter = Chapter;
let Book = class Book {
};
tslib_1.__decorate([
    (0, src_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", src_1.ObjectId)
], Book.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.Column)((type) => Chapter),
    tslib_1.__metadata("design:type", Array)
], Book.prototype, "chapters", void 0);
Book = tslib_1.__decorate([
    (0, src_1.Entity)()
], Book);
exports.Book = Book;
//# sourceMappingURL=Book.js.map