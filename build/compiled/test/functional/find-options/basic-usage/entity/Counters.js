"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const Author_1 = require("./Author");
class Counters {
}
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Counters.prototype, "likes", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => Author_1.Author),
    (0, src_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Counters.prototype, "likedUsers", void 0);
exports.Counters = Counters;
//# sourceMappingURL=Counters.js.map