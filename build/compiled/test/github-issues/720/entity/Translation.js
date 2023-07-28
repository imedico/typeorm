"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translation = void 0;
const tslib_1 = require("tslib");
const Index_1 = require("../../../../src/decorator/Index");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Message_1 = require("./Message");
const Locale_1 = require("./Locale");
const src_1 = require("../../../../src");
let Translation = class Translation {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "localeCode", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "messageId", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)(() => Locale_1.Locale, { nullable: false }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Locale_1.Locale)
], Translation.prototype, "locale", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)(() => Message_1.Message, { nullable: false }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Message_1.Message)
], Translation.prototype, "message", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("text"),
    tslib_1.__metadata("design:type", String)
], Translation.prototype, "text", void 0);
Translation = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Index_1.Index)(["locale", "message"], { unique: true })
], Translation);
exports.Translation = Translation;
//# sourceMappingURL=Translation.js.map