"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Post_1 = require("../../sample/sample1-simple-entity/entity/Post");
const test_utils_1 = require("../utils/test-utils");
describe("insertion", function () {
    // -------------------------------------------------------------------------
    // Setup
    // -------------------------------------------------------------------------
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Specifications: persist
    // -------------------------------------------------------------------------
    it("basic insert functionality", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        let newPost = new Post_1.Post();
        newPost.text = "Hello post";
        newPost.title = "this is post title";
        newPost.likesCount = 0;
        const savedPost = await postRepository.save(newPost);
        savedPost.should.be.equal(newPost);
        (0, chai_1.expect)(savedPost.id).not.to.be.undefined;
        const insertedPost = await postRepository.findOneBy({
            id: savedPost.id,
        });
        insertedPost.should.be.eql({
            id: savedPost.id,
            text: "Hello post",
            title: "this is post title",
            likesCount: 0,
        });
    })));
});
//# sourceMappingURL=sample1-simple-entity.js.map