"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const post_entity_1 = require("./entity/post.entity");
const comment_1 = require("./entity/comment");
const value_1 = require("./entity/value");
const chai_1 = require("chai");
describe("github issues > #9049 mongodb entities with 2 level-nested arrays throws an 'document[embedded.prefix].map is not a function' error", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should save entities properly", async () => {
        for (const connection of connections) {
            const post = new post_entity_1.Post();
            const comment = new comment_1.Comment();
            const value = new value_1.Value();
            value.description = "description";
            comment.values = [value];
            post.comments = [comment];
            await connection.mongoManager.save(post);
            const postRepo = await connection.getRepository(post_entity_1.Post);
            const posts = await postRepo.find({});
            posts.forEach((post) => (0, chai_1.expect)(post).to.be.instanceof(post_entity_1.Post));
        }
    });
});
//# sourceMappingURL=issue-9049.js.map