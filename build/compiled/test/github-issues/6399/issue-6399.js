"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Comment_1 = require("./entity/Comment");
describe("github issues > #6399 Process extraAppendedAndWhereCondition for inherited entity", () => {
    let connections;
    before(async () => {
        return (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post, Post_1.TargetPost, Comment_1.Comment],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["mysql"],
        }));
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("Query with join and limit for inhered entity", () => Promise.all(connections.map(async (connection) => {
        const targetPostRepo = connection.getRepository(Post_1.TargetPost);
        const posts = [
            {
                id: 1,
                title: "Post 1",
                postType: "TargetPost",
            },
            { id: 2, title: "Post 2", postType: "TargetPost" },
            {
                id: 3,
                title: "Post 3",
                postType: "TargetPost",
            },
        ];
        await targetPostRepo.save(posts);
        const result = await targetPostRepo
            .createQueryBuilder("targetPosts")
            .leftJoinAndSelect("targetPosts.comments", "comments")
            .take(2)
            .getMany();
        (0, chai_1.expect)(result.length).eq(2);
    })));
});
//# sourceMappingURL=issue-6399.js.map