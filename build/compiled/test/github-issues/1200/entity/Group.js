"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Post_1 = require("./Post");
class Group {
    constructor() {
        this.post = new Post_1.Post();
    }
}
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Post_1.Post),
    tslib_1.__metadata("design:type", Post_1.Post)
], Group.prototype, "post", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Group.prototype, "groupNumber", void 0);
exports.Group = Group;
//# sourceMappingURL=Group.js.map