"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Example = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Example = class Example {
    constructor() {
        this.content = "";
        this.fixedLengthContent = "";
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Example.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "datetime" }),
    tslib_1.__metadata("design:type", Date)
], Example.prototype, "created", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("varchar", { length: 10 }),
    tslib_1.__metadata("design:type", String)
], Example.prototype, "content", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("char", { length: 10 }),
    tslib_1.__metadata("design:type", String)
], Example.prototype, "fixedLengthContent", void 0);
Example = tslib_1.__decorate([
    (0, src_1.Entity)()
], Example);
exports.Example = Example;
//# sourceMappingURL=Example.js.map