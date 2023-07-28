"use strict";
var AmbigiousPrimaryKey_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmbigiousPrimaryKey = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let AmbigiousPrimaryKey = AmbigiousPrimaryKey_1 = class AmbigiousPrimaryKey {
    static make({ a, b }) {
        const apk = new AmbigiousPrimaryKey_1();
        apk.a = a;
        apk.b = b;
        return apk;
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], AmbigiousPrimaryKey.prototype, "a", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], AmbigiousPrimaryKey.prototype, "b", void 0);
AmbigiousPrimaryKey = AmbigiousPrimaryKey_1 = tslib_1.__decorate([
    (0, src_1.Entity)("ambig_primary_key")
], AmbigiousPrimaryKey);
exports.AmbigiousPrimaryKey = AmbigiousPrimaryKey;
//# sourceMappingURL=AmbigiousPrimaryKey.js.map