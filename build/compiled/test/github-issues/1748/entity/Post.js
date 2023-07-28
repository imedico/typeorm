"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Uuid = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
class Uuid {
    constructor(value) {
        if (!/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(value)) {
            throw new Error("Invalid UUID format");
        }
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
exports.Uuid = Uuid;
class UuidTransformer {
    to(value) {
        return value.getValue();
    }
    from(value) {
        return new Uuid(value);
    }
}
let Post = class Post {
    constructor(id) {
        this.id = id;
    }
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)({ type: "uuid", transformer: new UuidTransformer() }),
    tslib_1.__metadata("design:type", Uuid)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [Uuid])
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map