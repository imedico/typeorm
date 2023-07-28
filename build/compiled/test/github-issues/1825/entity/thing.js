"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thing = exports.EmbeddedInThing = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
class EmbeddedInThing {
}
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], EmbeddedInThing.prototype, "someSeriouslyLongFieldNameFirst", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], EmbeddedInThing.prototype, "someSeriouslyLongFieldNameSecond", void 0);
exports.EmbeddedInThing = EmbeddedInThing;
let Thing = class Thing {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Thing.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)((type) => EmbeddedInThing),
    tslib_1.__metadata("design:type", EmbeddedInThing)
], Thing.prototype, "embeddedThing", void 0);
Thing = tslib_1.__decorate([
    (0, src_1.Entity)()
], Thing);
exports.Thing = Thing;
//# sourceMappingURL=thing.js.map