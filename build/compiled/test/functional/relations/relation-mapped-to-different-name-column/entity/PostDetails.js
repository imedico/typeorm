"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDetails = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../../src/decorator/columns/PrimaryColumn");
let PostDetails = class PostDetails {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], PostDetails.prototype, "keyword", void 0);
PostDetails = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostDetails);
exports.PostDetails = PostDetails;
//# sourceMappingURL=PostDetails.js.map