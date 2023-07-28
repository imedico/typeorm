"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const User_1 = require("./User");
const string_decoder_1 = require("string_decoder");
let Photo = class Photo {
    get id() {
        const decoder = new string_decoder_1.StringDecoder("hex");
        return decoder.end(this._id);
    }
    set id(value) {
        this._id = Buffer.from(value, "hex");
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)("binary", {
        length: 2,
    }),
    tslib_1.__metadata("design:type", Buffer)
], Photo.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "description", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => User_1.User, (user) => user.photos),
    tslib_1.__metadata("design:type", User_1.User)
], Photo.prototype, "user", void 0);
Photo = tslib_1.__decorate([
    (0, src_1.Entity)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map