"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Animal_1 = require("./Animal");
const Content_1 = require("./Content");
let PersonEntity = class PersonEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PersonEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Animal_1.AnimalEntity, ({ person }) => person, {
        cascade: true,
        eager: true,
    }),
    tslib_1.__metadata("design:type", Array)
], PersonEntity.prototype, "pets", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Content_1.Content, {
        cascade: true,
        eager: true,
        nullable: true,
    }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Content_1.Content)
], PersonEntity.prototype, "content", void 0);
PersonEntity = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "person" })
], PersonEntity);
exports.PersonEntity = PersonEntity;
//# sourceMappingURL=Person.js.map