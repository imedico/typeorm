"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Author_1 = require("./Author");
let Book = class Book {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Book.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => Author_1.Author, (author) => author.books, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    tslib_1.__metadata("design:type", Array)
], Book.prototype, "authors", void 0);
Book = tslib_1.__decorate([
    (0, src_1.Entity)("book")
], Book);
exports.Book = Book;
//# sourceMappingURL=Book.js.map