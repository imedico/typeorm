"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Complex = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
class TagTransformer {
    to(value) {
        return value.join(", ");
    }
    from(value) {
        return value.split(", ");
    }
}
class Complex {
    constructor(from) {
        this.circularReferenceToMySelf = { complex: this };
        const [x, y] = from.split(" ");
        this.x = +x;
        this.y = +y;
    }
    toString() {
        return `${this.x} ${this.y}`;
    }
}
exports.Complex = Complex;
class ComplexTransformer {
    to(value) {
        if (value == null) {
            return value;
        }
        return value.toString();
    }
    from(value) {
        if (value == null) {
            return value;
        }
        return new Complex(value);
    }
}
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: String, transformer: new TagTransformer() }),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "tags", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        type: String,
        transformer: new ComplexTransformer(),
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "complex", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map