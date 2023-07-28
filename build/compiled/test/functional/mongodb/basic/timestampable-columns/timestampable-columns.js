"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../../utils/test-setup");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("mongodb > timestampable columns", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist timestampable columns", () => Promise.all(connections.map(async (connection) => {
        const commentMongoRepository = connection.getMongoRepository(Post_1.Post);
        // save a post
        const post = new Post_1.Post();
        post.message = "Hello";
        await commentMongoRepository.save(post);
        (0, chai_1.expect)(post.id).to.be.not.undefined;
        post.createdAt.should.be.instanceof(Date);
        const createdAt = post.createdAt;
        post.updatedAt.should.be.instanceof(Date);
        const updatedAt = post.updatedAt;
        // test has +/- delta range of 5 milliseconds, because earlier this test fell due to the difference of 1 millisecond
        (0, chai_1.expect)(post.updatedAt.getTime() - post.createdAt.getTime()).to.be.closeTo(0, 5);
        // update
        const date = new Date();
        date.setFullYear(2001);
        post.message = "New message";
        post.createdAt = date;
        post.updatedAt = date;
        await commentMongoRepository.save(post);
        const updatedPost = await commentMongoRepository.findOneBy({
            _id: post.id,
        });
        (0, chai_1.expect)(updatedPost).to.be.ok;
        (0, chai_1.expect)(updatedPost.createdAt.getTime()).to.equal(createdAt.getTime());
        (0, chai_1.expect)(updatedPost.updatedAt.getTime()).to.gte(updatedAt.getTime());
    })));
});
//# sourceMappingURL=timestampable-columns.js.map