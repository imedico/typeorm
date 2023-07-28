"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithEmbededEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
class FriendStats {
}
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], FriendStats.prototype, "count", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], FriendStats.prototype, "sent", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: 0 }),
    tslib_1.__metadata("design:type", Number)
], FriendStats.prototype, "received", void 0);
let UserWithEmbededEntity = class UserWithEmbededEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserWithEmbededEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)((type) => FriendStats),
    tslib_1.__metadata("design:type", FriendStats)
], UserWithEmbededEntity.prototype, "friend", void 0);
UserWithEmbededEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], UserWithEmbededEntity);
exports.UserWithEmbededEntity = UserWithEmbededEntity;
//# sourceMappingURL=UserWithEmbededEntity.js.map