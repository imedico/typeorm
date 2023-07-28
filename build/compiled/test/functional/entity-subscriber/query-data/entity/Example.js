"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src/");
let Example = class Example {
    constructor() {
        this.value = 0;
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Example.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Example.prototype, "value", void 0);
Example = tslib_1.__decorate([
    (0, src_1.Entity)()
], Example);
exports.Example = Example;
//# sourceMappingURL=Example.js.map