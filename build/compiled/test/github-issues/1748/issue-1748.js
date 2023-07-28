"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const Post_1 = require("./entity/Post");
describe("github issues > #1748 PrimaryColumn combined with transformer leads to error on save", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work as expected", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "mssql")
            return;
        const postRepository = connection.getRepository(Post_1.Post);
        const id = new Post_1.Uuid("6f715828-d2c6-4e96-a749-aecb9598fd69");
        // create and save a post first
        const post = new Post_1.Post(id);
        post.title = "About columns";
        await postRepository.save(post);
        // then update all its properties and save again
        post.title = "About columns1";
        await postRepository.save(post);
        // check if all columns are updated except for readonly columns
        const loadedPost = await postRepository.findOneBy({
            id: (0, src_1.Equal)(id),
        });
        (0, chai_1.expect)(loadedPost.id).to.deep.eq(id);
        (0, chai_1.expect)(loadedPost.title).to.be.equal("About columns1");
    })));
});
//# sourceMappingURL=issue-1748.js.map