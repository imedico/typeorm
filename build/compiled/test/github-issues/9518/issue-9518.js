"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
describe("github issues > #9518 Can't pass ObjectLiteral in MongoRepository.find where condition due to typings", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to use ObjectLiteral in find where condition", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        const firstPost = new Post_1.Post();
        firstPost.title = "Post #1";
        await postRepository.save(firstPost);
        const secondPost = new Post_1.Post();
        secondPost.title = "Post #2";
        await postRepository.save(secondPost);
        const loadedPosts = await postRepository.find({
            where: {
                title: { $in: ["Post #1"] },
            },
        });
        (0, chai_1.expect)(loadedPosts).to.have.length(1);
        (0, chai_1.expect)(loadedPosts[0].title).to.eql("Post #1");
    })));
});
//# sourceMappingURL=issue-9518.js.map