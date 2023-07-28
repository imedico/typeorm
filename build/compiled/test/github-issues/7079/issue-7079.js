"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const entities_1 = require("./entities");
describe("github issues > #7079 Error when sorting by an embedded entity while using join and skip/take", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [entities_1.Post, entities_1.User],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to getMany with join and sorting by an embedded entity column while user take and skip", () => Promise.all(connections.map(async (connection) => {
        const postRepo = connection.getRepository(entities_1.Post);
        const userRepo = connection.getRepository(entities_1.User);
        const users = [
            { id: 1, name: "Mike" },
            { id: 2, name: "Alice" },
        ];
        await userRepo.save(users);
        const posts = [
            {
                id: 1,
                text: "Happy Holidays",
                userId: 1,
                blog: { date: new Date() },
                newsletter: { date: new Date() },
            },
            {
                id: 2,
                text: "My Vacation",
                userId: 1,
                blog: { date: new Date() },
                newsletter: { date: new Date() },
            },
            {
                id: 3,
                text: "Working with TypeORM",
                userId: 2,
                blog: { date: new Date() },
                newsletter: { date: new Date() },
            },
        ];
        await postRepo.save(posts);
        const result = await postRepo
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.user", "user")
            .orderBy("post.blog.date")
            .take(2)
            .skip(1)
            .getMany();
        (0, chai_1.expect)(result.length).eq(2);
    })));
});
//# sourceMappingURL=issue-7079.js.map