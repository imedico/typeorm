"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const PostCategory_1 = require("./PostCategory");
const PostAuthor_1 = require("./PostAuthor");
const ManyToOne_1 = require("../../../src/decorator/relations/ManyToOne");
const AfterLoad_1 = require("../../../src/decorator/listeners/AfterLoad");
const AfterInsert_1 = require("../../../src/decorator/listeners/AfterInsert");
const BeforeInsert_1 = require("../../../src/decorator/listeners/BeforeInsert");
const BeforeUpdate_1 = require("../../../src/decorator/listeners/BeforeUpdate");
const AfterUpdate_1 = require("../../../src/decorator/listeners/AfterUpdate");
const BeforeRemove_1 = require("../../../src/decorator/listeners/BeforeRemove");
const AfterRemove_1 = require("../../../src/decorator/listeners/AfterRemove");
const AfterRecover_1 = require("../../../src/decorator/listeners/AfterRecover");
const BeforeRecover_1 = require("../../../src/decorator/listeners/BeforeRecover");
const AfterSoftRemove_1 = require("../../../src/decorator/listeners/AfterSoftRemove");
const BeforeSoftRemove_1 = require("../../../src/decorator/listeners/BeforeSoftRemove");
const JoinTable_1 = require("../../../src/decorator/relations/JoinTable");
let Post = class Post {
    constructor() {
        this.categories = [];
    }
    generateRandomNumbers() {
        console.log(`event: Post "${this.title}" entity has been loaded and callback executed`);
        this.uid = Math.ceil(Math.random() * 1000);
    }
    doSomethingBeforeInsertion() {
        console.log("event: Post entity will be inserted so soon...");
    }
    doSomethingAfterInsertion() {
        console.log("event: Post entity has been inserted and callback executed");
    }
    doSomethingBeforeUpdate() {
        console.log("event: Post entity will be updated so soon...");
    }
    doSomethingAfterUpdate() {
        console.log("event: Post entity has been updated and callback executed");
    }
    doSomethingBeforeRemove() {
        console.log("event: Post entity will be removed so soon...");
    }
    doSomethingAfterRemove() {
        console.log("event: Post entity has been removed and callback executed");
    }
    doSomethingBeforeSoftRemove() {
        console.log("event: Post entity will be soft-removed so soon...");
    }
    doSomethingAfterSoftRemove() {
        console.log("event: Post entity has been soft-removed and callback executed");
    }
    doSomethingBeforeRecover() {
        console.log("event: Post entity will be recovered so soon...");
    }
    doSomethingAfterRecover() {
        console.log("event: Post entity has been recovered and callback executed");
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => PostAuthor_1.PostAuthor, (post) => post.posts, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", PostAuthor_1.PostAuthor)
], Post.prototype, "author", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => PostCategory_1.PostCategory, (category) => category.posts, {
        cascade: true,
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, AfterLoad_1.AfterLoad)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "generateRandomNumbers", null);
tslib_1.__decorate([
    (0, BeforeInsert_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "doSomethingBeforeInsertion", null);
tslib_1.__decorate([
    (0, AfterInsert_1.AfterInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "doSomethingAfterInsertion", null);
tslib_1.__decorate([
    (0, BeforeUpdate_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "doSomethingBeforeUpdate", null);
tslib_1.__decorate([
    (0, AfterUpdate_1.AfterUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "doSomethingAfterUpdate", null);
tslib_1.__decorate([
    (0, BeforeRemove_1.BeforeRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "doSomethingBeforeRemove", null);
tslib_1.__decorate([
    (0, AfterRemove_1.AfterRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "doSomethingAfterRemove", null);
tslib_1.__decorate([
    (0, BeforeSoftRemove_1.BeforeSoftRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "doSomethingBeforeSoftRemove", null);
tslib_1.__decorate([
    (0, AfterSoftRemove_1.AfterSoftRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "doSomethingAfterSoftRemove", null);
tslib_1.__decorate([
    (0, BeforeRecover_1.BeforeRecover)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "doSomethingBeforeRecover", null);
tslib_1.__decorate([
    (0, AfterRecover_1.AfterRecover)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "doSomethingAfterRecover", null);
Post = tslib_1.__decorate([
    (0, index_1.Entity)("sample9_post")
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map