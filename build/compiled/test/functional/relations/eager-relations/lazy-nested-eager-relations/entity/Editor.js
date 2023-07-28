"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
const User_1 = require("./User");
const Post_1 = require("./Post");
const src_1 = require("../../../../../../src");
let Editor = class Editor {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Editor.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => User_1.User, { eager: true }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", User_1.User)
], Editor.prototype, "user", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Post_1.Post, { lazy: true }),
    tslib_1.__metadata("design:type", Promise)
], Editor.prototype, "post", void 0);
Editor = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Editor);
exports.Editor = Editor;
//# sourceMappingURL=Editor.js.map