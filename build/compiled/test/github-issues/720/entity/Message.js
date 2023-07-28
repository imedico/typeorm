"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
let Message = class Message {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)("increment", { type: "bigint" }),
    tslib_1.__metadata("design:type", String)
], Message.prototype, "id", void 0);
Message = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Message);
exports.Message = Message;
//# sourceMappingURL=Message.js.map