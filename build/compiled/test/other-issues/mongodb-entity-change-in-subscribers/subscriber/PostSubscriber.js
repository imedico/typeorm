"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSubscriber = void 0;
const tslib_1 = require("tslib");
const Post_1 = require("../entity/Post");
const src_1 = require("../../../../src");
let PostSubscriber = class PostSubscriber {
    listenTo() {
        return Post_1.Post;
    }
    beforeUpdate(event) {
        if (event.entity) {
            event.entity.updatedColumns = event.updatedColumns.length;
        }
    }
    afterLoad(entity) {
        entity.loaded = true;
    }
};
PostSubscriber = tslib_1.__decorate([
    (0, src_1.EventSubscriber)()
], PostSubscriber);
exports.PostSubscriber = PostSubscriber;
//# sourceMappingURL=PostSubscriber.js.map