"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidEntityCheckSubscriber = void 0;
const tslib_1 = require("tslib");
const Post_1 = require("../entity/Post");
const src_1 = require("../../../../src");
/**
 * Subscriber which checks the validity of the entity passed to beforeInsert().
 * Tests the fix for issue #5734 in which we saw an empty array leak into
 * beforeInsert().
 */
let ValidEntityCheckSubscriber = class ValidEntityCheckSubscriber {
    listenTo() {
        return Post_1.Post;
    }
    beforeInsert(event) {
        const entity = event.entity;
        if (Array.isArray(entity) || !entity.id) {
            throw new Error(`Subscriber saw invalid entity: ${JSON.stringify(entity)}`);
        }
    }
};
ValidEntityCheckSubscriber = tslib_1.__decorate([
    (0, src_1.EventSubscriber)()
], ValidEntityCheckSubscriber);
exports.ValidEntityCheckSubscriber = ValidEntityCheckSubscriber;
//# sourceMappingURL=CheckValidEntitySubscriber.js.map