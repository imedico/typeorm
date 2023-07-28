"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var Singleton;
(function (Singleton) {
    Singleton["EMPTY"] = "";
})(Singleton || (Singleton = {}));
let Settings = class Settings {
    constructor() {
        this.singleton = Singleton.EMPTY;
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "singleton", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Settings.prototype, "value", void 0);
Settings = tslib_1.__decorate([
    (0, src_1.Entity)()
], Settings);
exports.Settings = Settings;
//# sourceMappingURL=Settings.js.map