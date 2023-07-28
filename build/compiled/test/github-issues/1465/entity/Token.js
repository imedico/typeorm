"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const TableInheritance_1 = require("../../../../src/decorator/entity/TableInheritance");
let Token = class Token {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Token.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Token.prototype, "tokenSecret", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], Token.prototype, "expiresOn", void 0);
Token = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, TableInheritance_1.TableInheritance)({ column: { type: "varchar", name: "type" } })
], Token);
exports.Token = Token;
//# sourceMappingURL=Token.js.map