"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("github issues > #1576 Entities with null as `id` are merged [@next]", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should successfully create object", () => Promise.all(connections.map(async (connection) => {
        const newpost = new Post_1.Post();
        let cat1 = new Category_1.Category();
        cat1.name2 = "1";
        let cat2 = new Category_1.Category();
        cat2.name = "2";
        newpost.categories = [cat1, cat2];
        const post = connection.manager.create(Post_1.Post, newpost);
        (0, chai_1.expect)(post.categories).to.have.length(2);
    })));
});
//# sourceMappingURL=issue-1576.js.map