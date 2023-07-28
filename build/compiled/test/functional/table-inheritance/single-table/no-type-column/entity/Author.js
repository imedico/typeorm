"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const tslib_1 = require("tslib");
const TypeOrm = tslib_1.__importStar(require("../../../../../../src"));
const Person_1 = require("./Person");
let Author = class Author extends Person_1.Person {
};
tslib_1.__decorate([
    TypeOrm.Column({ default: null }),
    tslib_1.__metadata("design:type", String)
], Author.prototype, "authorName", void 0);
Author = tslib_1.__decorate([
    TypeOrm.Entity({ name: "person" })
], Author);
exports.Author = Author;
//# sourceMappingURL=Author.js.map