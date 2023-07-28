"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #3350 ER_DUP_FIELDNAME with simple find", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should find without errors", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.category = new Category_1.Category();
        post.category.name = "new category";
        await connection.manager.save(post.category);
        await connection.manager.save(post);
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                category: true,
            },
        });
        (0, chai_1.expect)(loadedPost).to.be.not.empty;
        (0, chai_1.expect)(loadedPost.category).to.be.not.empty;
    })));
});
//# sourceMappingURL=issue-3350.js.map