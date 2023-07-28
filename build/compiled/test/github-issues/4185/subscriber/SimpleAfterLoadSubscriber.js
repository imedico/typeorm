"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleAfterLoadSubscriber = void 0;
const tslib_1 = require("tslib");
const Post_1 = require("../entity/Post");
const src_1 = require("../../../../src");
// "Old" subscribers which only take one parameter should still compile and work
let SimpleAfterLoadSubscriber = class SimpleAfterLoadSubscriber {
    listenTo() {
        return Post_1.Post;
    }
    async afterLoad(entity) {
        entity.simpleSubscriberSaw = true;
    }
};
SimpleAfterLoadSubscriber = tslib_1.__decorate([
    (0, src_1.EventSubscriber)()
], SimpleAfterLoadSubscriber);
exports.SimpleAfterLoadSubscriber = SimpleAfterLoadSubscriber;
//# sourceMappingURL=SimpleAfterLoadSubscriber.js.map