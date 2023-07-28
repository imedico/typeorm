"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const PostCategory_1 = require("./entity/PostCategory");
describe("other issues > getId should not return undefined for composite primary keys with lazy relations", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("getId should not return undefined", () => Promise.all(connections.map(async ({ manager }) => {
        const post = manager.create(Post_1.Post, {
            content: "Sample Post",
        });
        await manager.save(post);
        const category = manager.create(Category_1.Category, {
            name: "javascript",
        });
        await manager.save(category);
        const postCategory = manager.create(PostCategory_1.PostCategory, {});
        postCategory.post = Promise.resolve(post);
        postCategory.category = Promise.resolve(category);
        await manager.save(postCategory);
        (0, chai_1.expect)(manager.getId(post)).not.to.be.undefined;
        (0, chai_1.expect)(manager.getId(category)).not.to.be.undefined;
        (0, chai_1.expect)(manager.getId(postCategory)).not.to.be.undefined;
    })));
});
//# sourceMappingURL=get-id-for-composite-primary-key.js.map