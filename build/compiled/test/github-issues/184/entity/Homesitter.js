"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homesitter = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Person_1 = require("./Person");
const ChildEntity_1 = require("../../../../src/decorator/entity/ChildEntity");
let Homesitter = class Homesitter extends Person_1.Person {
    constructor() {
        super();
        this.type = 2;
    }
};
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Homesitter.prototype, "numberOfKids", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Homesitter.prototype, "shared", void 0);
Homesitter = tslib_1.__decorate([
    (0, ChildEntity_1.ChildEntity)(Person_1.PersonType.Homesitter) // required
    ,
    tslib_1.__metadata("design:paramtypes", [])
], Homesitter);
exports.Homesitter = Homesitter;
//# sourceMappingURL=Homesitter.js.map