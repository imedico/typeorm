"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const User_1 = require("./User");
let Document = class Document {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Document.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => User_1.User, (user) => user.docs, { onDelete: "CASCADE" }),
    (0, src_1.JoinColumn)({ name: "ownerId" }),
    tslib_1.__metadata("design:type", User_1.User)
], Document.prototype, "owner", void 0);
Document = tslib_1.__decorate([
    (0, src_1.Entity)()
], Document);
exports.Document = Document;
//# sourceMappingURL=Document.js.map