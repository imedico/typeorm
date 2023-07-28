"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSubscriber = void 0;
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const src_1 = require("../../../../src");
const Post_1 = require("../entity/Post");
let PostSubscriber = class PostSubscriber {
    listenTo() {
        return Post_1.Post;
    }
    afterSoftRemove(event) {
        const { entity } = event;
        (0, chai_1.expect)(Object.prototype.toString.call(entity.deletedAt)).to.be.eq("[object Date]");
    }
    afterRecover(event) {
        const { entity } = event;
        (0, chai_1.expect)(entity.deletedAt).to.be.null;
    }
};
PostSubscriber = tslib_1.__decorate([
    (0, src_1.EventSubscriber)()
], PostSubscriber);
exports.PostSubscriber = PostSubscriber;
//# sourceMappingURL=PostSubscriber.js.map