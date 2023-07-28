"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSubscriber = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Post_1 = require("../entity/Post");
let PostSubscriber = class PostSubscriber {
    listenTo() {
        return Post_1.Post;
    }
    beforeUpdate(event) {
        event.entity.updatedNameColumnsCount = event.updatedColumns.reduce((p, c) => {
            return p + (c.propertyName === "name" ? 1 : 0);
        }, 0);
    }
    afterUpdate(event) {
        event.entity.updatedNameColumnsCount = event.updatedColumns.reduce((p, c) => {
            return p + (c.propertyName === "name" ? 1 : 0);
        }, 0);
    }
};
PostSubscriber = tslib_1.__decorate([
    (0, src_1.EventSubscriber)()
], PostSubscriber);
exports.PostSubscriber = PostSubscriber;
//# sourceMappingURL=PostSubscriber.js.map