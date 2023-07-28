"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonExampleEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const ID_TRANSFORMER = {
    from: (dbValue) => dbValue === null || dbValue === void 0 ? void 0 : dbValue.toString(),
    to: (entityValue) => entityValue ? Number(entityValue) : entityValue,
};
const JSON_TRANSFORMER = {
    to: (value) => ({ wrap: value }),
    from: (value) => value.wrap,
};
let JsonExampleEntity = class JsonExampleEntity {
    constructor(value) {
        this.jsonvalue = value;
    }
};
tslib_1.__decorate([
    (0, src_1.Generated)("increment"),
    (0, src_1.PrimaryColumn)({
        type: "integer",
        transformer: ID_TRANSFORMER,
    }),
    tslib_1.__metadata("design:type", String)
], JsonExampleEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "jsonb", transformer: JSON_TRANSFORMER }),
    tslib_1.__metadata("design:type", Object)
], JsonExampleEntity.prototype, "jsonvalue", void 0);
JsonExampleEntity = tslib_1.__decorate([
    (0, src_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], JsonExampleEntity);
exports.JsonExampleEntity = JsonExampleEntity;
//# sourceMappingURL=JsonExampleEntity.js.map