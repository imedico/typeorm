"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Book_1 = require("./Book");
let Author = class Author {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Author.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => Book_1.Book, (book) => book.authors, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, src_1.JoinTable)({
        name: "author_to_books",
        joinColumn: {
            name: "author_id",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "book_id",
            referencedColumnName: "id",
        },
    }),
    tslib_1.__metadata("design:type", Array)
], Author.prototype, "books", void 0);
Author = tslib_1.__decorate([
    (0, src_1.Entity)("author")
], Author);
exports.Author = Author;
//# sourceMappingURL=Author.js.map