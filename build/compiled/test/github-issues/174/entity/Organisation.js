"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organisation = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Contact_1 = require("./Contact");
let Organisation = class Organisation {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Organisation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Organisation.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Contact_1.Contact),
    tslib_1.__metadata("design:type", Contact_1.Contact)
], Organisation.prototype, "contact", void 0);
Organisation = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Organisation);
exports.Organisation = Organisation;
//# sourceMappingURL=Organisation.js.map