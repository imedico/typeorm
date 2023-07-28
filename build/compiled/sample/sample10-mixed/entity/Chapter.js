"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chapter = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const PostDetails_1 = require("./PostDetails");
let Chapter = class Chapter {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Chapter.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Chapter.prototype, "about", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => PostDetails_1.PostDetails, (postDetails) => postDetails.chapter),
    tslib_1.__metadata("design:type", Array)
], Chapter.prototype, "postDetails", void 0);
Chapter = tslib_1.__decorate([
    (0, index_1.Entity)("sample10_chapter")
], Chapter);
exports.Chapter = Chapter;
//# sourceMappingURL=Chapter.js.map