"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Author_1 = require("./Author");
const Abbreviation_1 = require("./Abbreviation");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Author_1.Author),
    (0, JoinColumn_1.JoinColumn)({ name: "author_id" }),
    tslib_1.__metadata("design:type", Author_1.Author)
], Post.prototype, "author", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Abbreviation_1.Abbreviation),
    (0, JoinColumn_1.JoinColumn)({ name: "abbreviation_id" }),
    tslib_1.__metadata("design:type", Abbreviation_1.Abbreviation)
], Post.prototype, "abbreviation", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map