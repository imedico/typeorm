"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const chai_1 = require("chai");
describe("lazy-relations-loading-via-base-entity-finders", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        // we can properly test lazy-relations only on one platform
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("works", async () => {
        for (let connection of connections) {
            Category_1.Category.useDataSource(connection);
            Post_1.Post.useDataSource(connection);
            const category = new Category_1.Category();
            category.name = "hello";
            await category.save();
            const post = new Post_1.Post();
            post.title = "hello post";
            post.category = Promise.resolve(category);
            await post.save();
            (0, chai_1.expect)((await Post_1.Post.findOneByOrFail({
                category: { id: category.id, name: category.name },
            })).id).equal(post.id);
            (0, chai_1.expect)((await Post_1.Post.findOneByOrFail({ category: { id: category.id } }))
                .id).equal(post.id);
        }
    });
});
//# sourceMappingURL=index.js.map