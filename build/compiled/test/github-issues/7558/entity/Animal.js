"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Person_1 = require("./Person");
let AnimalEntity = class AnimalEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], AnimalEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "varchar" }),
    tslib_1.__metadata("design:type", String)
], AnimalEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Person_1.PersonEntity, ({ pets }) => pets, {
        onDelete: "CASCADE",
        onUpdate: "NO ACTION", // cascade would not work here as ORACLE does not have that action
    }),
    tslib_1.__metadata("design:type", Person_1.PersonEntity)
], AnimalEntity.prototype, "person", void 0);
AnimalEntity = tslib_1.__decorate([
    (0, src_1.Entity)("animal"),
    (0, src_1.TableInheritance)({ column: { type: "varchar", name: "type" } })
], AnimalEntity);
exports.AnimalEntity = AnimalEntity;
//# sourceMappingURL=Animal.js.map