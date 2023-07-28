"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Photo_1 = require("./Photo");
const string_decoder_1 = require("string_decoder");
let User = class User {
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
], User.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "age", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => Photo_1.Photo, (photo) => photo.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "photos", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map