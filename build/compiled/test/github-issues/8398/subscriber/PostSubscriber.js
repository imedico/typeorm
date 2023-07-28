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
        const { entity } = event;
        entity.beforeUpdateSubscriber++;
    }
    afterUpdate(event) {
        const { entity } = event;
        entity.afterUpdateSubscriber++;
    }
    beforeSoftRemove(event) {
        const { entity } = event;
        entity.beforeSoftRemoveSubscriber++;
    }
    afterSoftRemove(event) {
        const { entity } = event;
        entity.afterSoftRemoveSubscriber++;
    }
    beforeRecover(event) {
        const { entity } = event;
        entity.beforeRecoverSubscriber++;
    }
    afterRecover(event) {
        const { entity } = event;
        entity.afterRecoverSubscriber++;
    }
};
PostSubscriber = tslib_1.__decorate([
    (0, src_1.EventSubscriber)()
], PostSubscriber);
exports.PostSubscriber = PostSubscriber;
//# sourceMappingURL=PostSubscriber.js.map