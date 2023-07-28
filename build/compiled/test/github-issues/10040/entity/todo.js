"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const person_1 = require("./person");
let Todo = class Todo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Todo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("varchar"),
    tslib_1.__metadata("design:type", String)
], Todo.prototype, "description", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => person_1.Person, (o) => o.todos),
    tslib_1.__metadata("design:type", person_1.Person)
], Todo.prototype, "owner", void 0);
Todo = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "todo" })
], Todo);
exports.Todo = Todo;
//# sourceMappingURL=todo.js.map