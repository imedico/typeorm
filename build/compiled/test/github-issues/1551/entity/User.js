"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Chat_1 = require("./Chat");
const Message_1 = require("./Message");
const Recipient_1 = require("./Recipient");
let User = class User {
    constructor({ username, password, name, picture, phone, } = {}) {
        if (username) {
            this.username = username;
        }
        if (password) {
            this.password = password;
        }
        if (name) {
            this.name = name;
        }
        if (picture) {
            this.picture = picture;
        }
        if (phone) {
            this.phone = phone;
        }
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, index_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "picture", void 0);
tslib_1.__decorate([
    (0, index_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => Chat_1.Chat, (chat) => chat.allTimeMembers),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "allTimeMemberChats", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => Chat_1.Chat, (chat) => chat.listingMembers),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "listedMemberChats", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => Chat_1.Chat, (chat) => chat.actualGroupMembers),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "actualGroupMemberChats", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => Chat_1.Chat, (chat) => chat.admins),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "adminChats", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => Message_1.Message, (message) => message.holders),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "holderMessages", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => Chat_1.Chat, (chat) => chat.owner),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "ownerChats", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => Message_1.Message, (message) => message.sender),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "senderMessages", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => Recipient_1.Recipient, (recipient) => recipient.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "recipients", void 0);
User = tslib_1.__decorate([
    (0, index_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map