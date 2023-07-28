"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEntity = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
class AbstractEntity {
}
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], AbstractEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AbstractEntity.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AbstractEntity.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AbstractEntity.prototype, "fullname", void 0);
exports.AbstractEntity = AbstractEntity;
//# sourceMappingURL=AbstractEntity.js.map