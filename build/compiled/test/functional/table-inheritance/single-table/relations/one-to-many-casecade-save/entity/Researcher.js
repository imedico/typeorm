"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Researcher = void 0;
const tslib_1 = require("tslib");
const ChildEntity_1 = require("../../../../../../../src/decorator/entity/ChildEntity");
const Staff_1 = require("./Staff");
const src_1 = require("../../../../../../../src");
let Researcher = class Researcher extends Staff_1.Staff {
    constructor(areaOfStudy) {
        super();
        this.areaOfStudy = areaOfStudy;
    }
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Researcher.prototype, "areaOfStudy", void 0);
Researcher = tslib_1.__decorate([
    (0, ChildEntity_1.ChildEntity)("RESEARCHER"),
    tslib_1.__metadata("design:paramtypes", [String])
], Researcher);
exports.Researcher = Researcher;
//# sourceMappingURL=Researcher.js.map