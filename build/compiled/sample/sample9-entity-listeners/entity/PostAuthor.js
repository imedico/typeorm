"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostAuthor = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Post_1 = require("./Post");
const OneToMany_1 = require("../../../src/decorator/relations/OneToMany");
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
let PostAuthor = class PostAuthor {
    doSomethingBeforeInsertion() {
        console.log("event: PostAuthor entity will be inserted so soon...");
    }
    doSomethingAfterInsertion() {
        console.log("event: PostAuthor entity has been inserted and callback executed");
    }
    doSomethingBeforeUpdate() {
        console.log("event: PostAuthor entity will be updated so soon...");
    }
    doSomethingAfterUpdate() {
        console.log("event: PostAuthor entity has been updated and callback executed");
    }
    doSomethingBeforeRemove() {
        console.log("event: PostAuthor entity will be removed so soon...");
    }
    doSomethingAfterRemove() {
        console.log("event: PostAuthor entity has been removed and callback executed");
    }
    doSomethingBeforeSoftRemove() {
        console.log("event: PostAuthor entity will be removed so soon...");
    }
    doSomethingAfterSoftRemove() {
        console.log("event: PostAuthor entity has been removed and callback executed");
    }
    doSomethingBeforeRecover() {
        console.log("event: PostAuthor entity will be removed so soon...");
    }
    doSomethingAfterRecover() {
        console.log("event: PostAuthor entity has been removed and callback executed");
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostAuthor.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostAuthor.prototype, "name", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (post) => post.author),
    tslib_1.__metadata("design:type", Array)
], PostAuthor.prototype, "posts", void 0);
tslib_1.__decorate([
    (0, BeforeInsert_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostAuthor.prototype, "doSomethingBeforeInsertion", null);
tslib_1.__decorate([
    (0, AfterInsert_1.AfterInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostAuthor.prototype, "doSomethingAfterInsertion", null);
tslib_1.__decorate([
    (0, BeforeUpdate_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostAuthor.prototype, "doSomethingBeforeUpdate", null);
tslib_1.__decorate([
    (0, AfterUpdate_1.AfterUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostAuthor.prototype, "doSomethingAfterUpdate", null);
tslib_1.__decorate([
    (0, BeforeRemove_1.BeforeRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostAuthor.prototype, "doSomethingBeforeRemove", null);
tslib_1.__decorate([
    (0, AfterRemove_1.AfterRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostAuthor.prototype, "doSomethingAfterRemove", null);
tslib_1.__decorate([
    (0, BeforeSoftRemove_1.BeforeSoftRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostAuthor.prototype, "doSomethingBeforeSoftRemove", null);
tslib_1.__decorate([
    (0, AfterSoftRemove_1.AfterSoftRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostAuthor.prototype, "doSomethingAfterSoftRemove", null);
tslib_1.__decorate([
    (0, BeforeRecover_1.BeforeRecover)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostAuthor.prototype, "doSomethingBeforeRecover", null);
tslib_1.__decorate([
    (0, AfterRecover_1.AfterRecover)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostAuthor.prototype, "doSomethingAfterRecover", null);
PostAuthor = tslib_1.__decorate([
    (0, index_1.Entity)("sample9_post_author")
], PostAuthor);
exports.PostAuthor = PostAuthor;
//# sourceMappingURL=PostAuthor.js.map