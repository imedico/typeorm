"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("columns > getters and setters", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not update columns marked with readonly property", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // create and save a post first
        const post = new Post_1.Post();
        post.title = "hello";
        await postRepository.save(post);
        // check if title is a value applied by a setter
        const loadedPost1 = await postRepository.findOneBy({
            id: post.id,
        });
        (0, chai_1.expect)(loadedPost1.title).to.be.equal("bye");
        // try to load a column by its value
        const loadedPost2 = await postRepository.findOneBy({
            title: "bye",
        });
        (0, chai_1.expect)(loadedPost2.title).to.be.equal("bye");
    })));
});
//# sourceMappingURL=columns-getters-setters.js.map