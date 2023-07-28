"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Post = class Post {
    beforeUpdate() {
        this.beforeUpdateListener++;
    }
    afterUpdate() {
        this.afterUpdateListener++;
    }
    beforeSoftRemove() {
        this.beforeSoftRemoveListener++;
    }
    afterSoftRemove() {
        this.afterSoftRemoveListener++;
    }
    beforeRecover() {
        this.beforeRecoverListener++;
    }
    afterRecover() {
        this.afterRecoverListener++;
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "data", void 0);
tslib_1.__decorate([
    (0, src_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "beforeUpdateListener", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "afterUpdateListener", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "beforeSoftRemoveListener", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "afterSoftRemoveListener", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "beforeRecoverListener", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "afterRecoverListener", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "beforeUpdateSubscriber", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "afterUpdateSubscriber", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "beforeSoftRemoveSubscriber", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "afterSoftRemoveSubscriber", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "beforeRecoverSubscriber", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "afterRecoverSubscriber", void 0);
tslib_1.__decorate([
    (0, src_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "beforeUpdate", null);
tslib_1.__decorate([
    (0, src_1.AfterUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "afterUpdate", null);
tslib_1.__decorate([
    (0, src_1.BeforeSoftRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "beforeSoftRemove", null);
tslib_1.__decorate([
    (0, src_1.AfterSoftRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "afterSoftRemove", null);
tslib_1.__decorate([
    (0, src_1.BeforeRecover)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "beforeRecover", null);
tslib_1.__decorate([
    (0, src_1.AfterRecover)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], Post.prototype, "afterRecover", null);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map