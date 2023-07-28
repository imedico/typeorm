"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.MessageType = void 0;
const tslib_1 = require("tslib");
const Chat_1 = require("./Chat");
const User_1 = require("./User");
const Recipient_1 = require("./Recipient");
const index_1 = require("../../../../src/index");
var MessageType;
(function (MessageType) {
    MessageType[MessageType["TEXT"] = 0] = "TEXT";
    MessageType[MessageType["LOCATION"] = 1] = "LOCATION";
    MessageType[MessageType["PICTURE"] = 2] = "PICTURE";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
let Message = class Message {
    constructor({ sender, content, type, recipients, holders, chat, } = {}) {
        if (sender) {
            this.sender = sender;
        }
        if (content) {
            this.content = content;
        }
        if (type) {
            this.type = type;
        }
        if (recipients) {
            recipients.forEach((recipient) => (recipient.message = this));
            this.recipients = recipients;
            // this.recipients = recipients.map(recipient => (new Recipient({...recipient, message: this})));
        }
        if (holders) {
            this.holders = holders;
        }
        if (chat) {
            this.chat = chat;
        }
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Message.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => User_1.User, (user) => user.senderMessages, { eager: true }),
    tslib_1.__metadata("design:type", User_1.User)
], Message.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "content", void 0);
tslib_1.__decorate([
    (0, index_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Number)
], Message.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, index_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Message.prototype, "type", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => Recipient_1.Recipient, (recipient) => recipient.message, {
        cascade: true,
        eager: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Message.prototype, "recipients", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => User_1.User, (user) => user.holderMessages, { eager: true }),
    (0, index_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Message.prototype, "holders", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => Chat_1.Chat, (chat) => chat.messages),
    tslib_1.__metadata("design:type", Chat_1.Chat)
], Message.prototype, "chat", void 0);
Message = tslib_1.__decorate([
    (0, index_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Message);
exports.Message = Message;
//# sourceMappingURL=Message.js.map