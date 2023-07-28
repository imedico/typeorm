"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Message_1 = require("./Message");
const User_1 = require("./User");
let Chat = class Chat {
    constructor({ name, picture, allTimeMembers, listingMembers, actualGroupMembers, admins, owner, messages, } = {}) {
        if (name) {
            this.name = name;
        }
        if (picture) {
            this.picture = picture;
        }
        if (allTimeMembers) {
            this.allTimeMembers = allTimeMembers;
        }
        if (listingMembers) {
            this.listingMembers = listingMembers;
        }
        if (actualGroupMembers) {
            this.actualGroupMembers = actualGroupMembers;
        }
        if (admins) {
            this.admins = admins;
        }
        if (owner) {
            this.owner = owner;
        }
        if (messages) {
            this.messages = messages;
        }
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Chat.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Chat.prototype, "name", void 0);
tslib_1.__decorate([
    (0, index_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Chat.prototype, "picture", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)(() => User_1.User, (user) => user.allTimeMemberChats, { eager: true }),
    (0, index_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Chat.prototype, "allTimeMembers", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)(() => User_1.User, (user) => user.listedMemberChats, { eager: true }),
    (0, index_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Chat.prototype, "listingMembers", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)(() => User_1.User, (user) => user.actualGroupMemberChats, {
        eager: true,
    }),
    (0, index_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Chat.prototype, "actualGroupMembers", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)(() => User_1.User, (user) => user.adminChats, { eager: true }),
    (0, index_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Chat.prototype, "admins", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)(() => User_1.User, (user) => user.ownerChats, { eager: true }),
    tslib_1.__metadata("design:type", User_1.User)
], Chat.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)(() => Message_1.Message, (message) => message.chat, {
        cascade: true,
        eager: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Chat.prototype, "messages", void 0);
Chat = tslib_1.__decorate([
    (0, index_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Chat);
exports.Chat = Chat;
//# sourceMappingURL=Chat.js.map