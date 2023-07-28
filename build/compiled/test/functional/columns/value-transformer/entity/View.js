"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let View = class View {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], View.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ transformer: [] }),
    tslib_1.__metadata("design:type", String)
], View.prototype, "title", void 0);
View = tslib_1.__decorate([
    (0, src_1.Entity)()
], View);
exports.View = View;
//# sourceMappingURL=View.js.map