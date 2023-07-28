"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyTable = exports.Limit = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
var Limit;
(function (Limit) {
    Limit["Foo"] = "foo";
    Limit["Bar"] = "bar";
})(Limit = exports.Limit || (exports.Limit = {}));
let MyTable = class MyTable {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], MyTable.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "simple-enum", enum: Limit }),
    tslib_1.__metadata("design:type", String)
], MyTable.prototype, "limit", void 0);
MyTable = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], MyTable);
exports.MyTable = MyTable;
//# sourceMappingURL=my-table.entity.js.map