"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategory = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Post_1 = require("./Post");
const ManyToMany_1 = require("../../../src/decorator/relations/ManyToMany");
const AfterRemove_1 = require("../../../src/decorator/listeners/AfterRemove");
const BeforeRemove_1 = require("../../../src/decorator/listeners/BeforeRemove");
const AfterUpdate_1 = require("../../../src/decorator/listeners/AfterUpdate");
const BeforeUpdate_1 = require("../../../src/decorator/listeners/BeforeUpdate");
const AfterInsert_1 = require("../../../src/decorator/listeners/AfterInsert");
const BeforeInsert_1 = require("../../../src/decorator/listeners/BeforeInsert");
const AfterRecover_1 = require("../../../src/decorator/listeners/AfterRecover");
const BeforeRecover_1 = require("../../../src/decorator/listeners/BeforeRecover");
const AfterSoftRemove_1 = require("../../../src/decorator/listeners/AfterSoftRemove");
const BeforeSoftRemove_1 = require("../../../src/decorator/listeners/BeforeSoftRemove");
let PostCategory = class PostCategory {
    constructor() {
        this.posts = [];
    }
    doSomethingBeforeInsertion() {
        console.log(`event: PostCategory "${this.name}" will be inserted so soon...`);
    }
    doSomethingAfterInsertion() {
        console.log(`event: PostCategory "${this.name}" has been inserted and callback executed`);
    }
    doSomethingBeforeUpdate() {
        console.log(`event: PostCategory "${this.name}" will be updated so soon...`);
    }
    doSomethingAfterUpdate() {
        console.log(`event: PostCategory "${this.name}" has been updated and callback executed`);
    }
    doSomethingBeforeRemove() {
        console.log(`event: PostCategory "${this.name}" will be removed so soon...`);
    }
    doSomethingAfterRemove() {
        console.log(`event: PostCategory "${this.name}" has been removed and callback executed`);
    }
    doSomethingBeforeSoftRemove() {
        console.log(`event: PostCategory "${this.name}" will be soft-removed so soon...`);
    }
    doSomethingAfterSoftRemove() {
        console.log(`event: PostCategory "${this.name}" has been soft-removed and callback executed`);
    }
    doSomethingBeforeRecover() {
        console.log(`event: PostCategory "${this.name}" will be recovered so soon...`);
    }
    doSomethingAfterRecover() {
        console.log(`event: PostCategory "${this.name}" has been recovered and callback executed`);
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostCategory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostCategory.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Post_1.Post, (post) => post.categories, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", Array)
], PostCategory.prototype, "posts", void 0);
tslib_1.__decorate([
    (0, BeforeInsert_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCategory.prototype, "doSomethingBeforeInsertion", null);
tslib_1.__decorate([
    (0, AfterInsert_1.AfterInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCategory.prototype, "doSomethingAfterInsertion", null);
tslib_1.__decorate([
    (0, BeforeUpdate_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCategory.prototype, "doSomethingBeforeUpdate", null);
tslib_1.__decorate([
    (0, AfterUpdate_1.AfterUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCategory.prototype, "doSomethingAfterUpdate", null);
tslib_1.__decorate([
    (0, BeforeRemove_1.BeforeRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCategory.prototype, "doSomethingBeforeRemove", null);
tslib_1.__decorate([
    (0, AfterRemove_1.AfterRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCategory.prototype, "doSomethingAfterRemove", null);
tslib_1.__decorate([
    (0, BeforeSoftRemove_1.BeforeSoftRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCategory.prototype, "doSomethingBeforeSoftRemove", null);
tslib_1.__decorate([
    (0, AfterSoftRemove_1.AfterSoftRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCategory.prototype, "doSomethingAfterSoftRemove", null);
tslib_1.__decorate([
    (0, BeforeRecover_1.BeforeRecover)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCategory.prototype, "doSomethingBeforeRecover", null);
tslib_1.__decorate([
    (0, AfterRecover_1.AfterRecover)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostCategory.prototype, "doSomethingAfterRecover", null);
PostCategory = tslib_1.__decorate([
    (0, index_1.Entity)("sample9_post_category")
], PostCategory);
exports.PostCategory = PostCategory;
//# sourceMappingURL=PostCategory.js.map