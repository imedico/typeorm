"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Project = class Project {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Project.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Project.prototype, "name", void 0);
Project = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Project);
exports.Project = Project;
//# sourceMappingURL=Project.js.map