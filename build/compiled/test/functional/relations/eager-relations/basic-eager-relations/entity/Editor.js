"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../../../src/decorator/relations/JoinColumn");
const User_1 = require("./User");
const ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
const Post_1 = require("./Post");
const src_1 = require("../../../../../../src");
let Editor = class Editor {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Editor.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Editor.prototype, "postId", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => User_1.User, { eager: true }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", User_1.User)
], Editor.prototype, "user", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Post_1.Post),
    tslib_1.__metadata("design:type", Post_1.Post)
], Editor.prototype, "post", void 0);
Editor = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Editor);
exports.Editor = Editor;
//# sourceMappingURL=Editor.js.map