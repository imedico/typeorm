"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedAfterLoadSubscriber = void 0;
const tslib_1 = require("tslib");
const Post_1 = require("../entity/Post");
const src_1 = require("../../../../src");
let ExtendedAfterLoadSubscriber = class ExtendedAfterLoadSubscriber {
    listenTo() {
        return Post_1.Post;
    }
    async afterLoad(entity, event) {
        entity.extendedSubscriberSaw = event;
    }
};
ExtendedAfterLoadSubscriber = tslib_1.__decorate([
    (0, src_1.EventSubscriber)()
], ExtendedAfterLoadSubscriber);
exports.ExtendedAfterLoadSubscriber = ExtendedAfterLoadSubscriber;
//# sourceMappingURL=ExtendedAfterLoadSubscriber.js.map