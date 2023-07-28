"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const src_1 = require("../../../../src");
const url_1 = require("url");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: String,
        // marshall
        transformer: {
            from(value) {
                return new url_1.URL(value);
            },
            to(value) {
                return value.toString();
            },
        },
    }),
    tslib_1.__metadata("design:type", url_1.URL)
], User.prototype, "url", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map