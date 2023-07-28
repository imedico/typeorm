"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
let Log = class Log {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)("increment"),
    tslib_1.__metadata("design:type", Number)
], Log.prototype, "id", void 0);
Log = tslib_1.__decorate([
    (0, index_1.Entity)(),
    (0, index_1.TableInheritance)({ column: { type: "varchar", name: "type" } })
], Log);
exports.Log = Log;
//# sourceMappingURL=Log.js.map