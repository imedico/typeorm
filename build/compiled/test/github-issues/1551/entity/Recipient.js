"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipient = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Message_1 = require("./Message");
const User_1 = require("./User");
let Recipient = class Recipient {
    constructor({ user, message, receivedAt, readAt, } = {}) {
        if (user) {
            this.user = user;
        }
        if (message) {
            this.message = message;
        }
        if (receivedAt) {
            this.receivedAt = receivedAt;
        }
        if (readAt) {
            this.readAt = readAt;
        }
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Recipient.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, index_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Recipient.prototype, "messageId", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => User_1.User, (user) => user.recipients),
    tslib_1.__metadata("design:type", User_1.User)
], Recipient.prototype, "user", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => Message_1.Message, (message) => message.recipients),
    tslib_1.__metadata("design:type", Message_1.Message)
], Recipient.prototype, "message", void 0);
tslib_1.__decorate([
    (0, index_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Number)
], Recipient.prototype, "receivedAt", void 0);
tslib_1.__decorate([
    (0, index_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Number)
], Recipient.prototype, "readAt", void 0);
Recipient = tslib_1.__decorate([
    (0, index_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Recipient);
exports.Recipient = Recipient;
//# sourceMappingURL=Recipient.js.map