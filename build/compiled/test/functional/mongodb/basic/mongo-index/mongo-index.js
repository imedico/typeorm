"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("mongodb > indices", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert entity with indices correctly", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // save a post
        const post = new Post_1.Post();
        post.title = "Post";
        post.name = "About Post";
        await postRepository.save(post);
        // check saved post
        const loadedPost = await postRepository.findOneBy({
            title: "Post",
        });
        (0, chai_1.expect)(loadedPost).to.be.not.empty;
    })));
});
//# sourceMappingURL=mongo-index.js.map