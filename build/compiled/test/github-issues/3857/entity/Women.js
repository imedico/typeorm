"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Women = void 0;
const tslib_1 = require("tslib");
const Person_1 = require("./Person");
const src_1 = require("../../../../src");
let Women = class Women extends Person_1.Person {
};
tslib_1.__decorate([
    (0, src_1.Column)("int"),
    tslib_1.__metadata("design:type", Number)
], Women.prototype, "brassiereSize", void 0);
Women = tslib_1.__decorate([
    (0, src_1.ChildEntity)()
], Women);
exports.Women = Women;
//# sourceMappingURL=Women.js.map