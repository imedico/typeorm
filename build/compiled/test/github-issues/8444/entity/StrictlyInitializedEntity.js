"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrictlyInitializedEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let StrictlyInitializedEntity = class StrictlyInitializedEntity {
    constructor(someColumn) {
        if (someColumn === undefined) {
            throw new Error("someColumn cannot be undefined.");
        }
        this.someColumn = someColumn;
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], StrictlyInitializedEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], StrictlyInitializedEntity.prototype, "someColumn", void 0);
StrictlyInitializedEntity = tslib_1.__decorate([
    (0, src_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [String])
], StrictlyInitializedEntity);
exports.StrictlyInitializedEntity = StrictlyInitializedEntity;
//# sourceMappingURL=StrictlyInitializedEntity.js.map