"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const user_1 = require("./user");
let Message = class Message {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({ type: "varbinary", length: 16 }),
    tslib_1.__metadata("design:type", Buffer)
], Message.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => user_1.User, (user) => user.id, { nullable: false }),
    (0, src_1.JoinColumn)({ referencedColumnName: "id" }),
    tslib_1.__metadata("design:type", user_1.User)
], Message.prototype, "sender", void 0);
Message = tslib_1.__decorate([
    (0, src_1.Entity)("Message")
], Message);
exports.Message = Message;
//# sourceMappingURL=message.js.map