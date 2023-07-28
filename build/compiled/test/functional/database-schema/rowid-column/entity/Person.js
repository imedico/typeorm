"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const src_2 = require("../../../../../src");
const src_3 = require("../../../../../src");
const src_4 = require("../../../../../src");
const src_5 = require("../../../../../src");
let Person = class Person {
};
tslib_1.__decorate([
    (0, src_3.PrimaryGeneratedColumn)("rowid"),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_2.PrimaryColumn)(),
    (0, src_1.Generated)("rowid"),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "id2", void 0);
tslib_1.__decorate([
    (0, src_2.PrimaryColumn)({ generated: "rowid" }),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "id3", void 0);
tslib_1.__decorate([
    (0, src_5.Column)({ generated: "rowid" }),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "id4", void 0);
Person = tslib_1.__decorate([
    (0, src_4.Entity)()
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map