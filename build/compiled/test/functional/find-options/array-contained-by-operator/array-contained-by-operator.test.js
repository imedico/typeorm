"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../utils/test-setup");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const ArrayContainedBy_1 = require("../../../../src/find-options/operator/ArrayContainedBy");
describe("find options > find operators > ArrayContainedBy", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        __dirname,
        enabledDrivers: ["postgres", "cockroachdb"],
        // logging: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    async function prepareData(manager) {
        const post1 = new Post_1.Post();
        post1.title = "Post #1";
        post1.authors = ["dmitry", "olimjon"];
        post1.statuses = [Post_1.PostStatus.draft, Post_1.PostStatus.published];
        await manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "Post #2";
        post2.authors = ["olimjon"];
        post2.statuses = [Post_1.PostStatus.published];
        await manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "Post #3";
        post3.authors = [];
        post3.statuses = [];
        await manager.save(post3);
    }
    it("should find entries in regular arrays", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection.manager);
        const loadedPost1 = await connection.manager.find(Post_1.Post, {
            where: {
                authors: (0, ArrayContainedBy_1.ArrayContainedBy)(["dmitry", "olimjon"]),
            },
            order: {
                id: "asc",
            },
        });
        loadedPost1.should.be.eql([
            {
                id: 1,
                title: "Post #1",
                authors: ["dmitry", "olimjon"],
                statuses: [Post_1.PostStatus.draft, Post_1.PostStatus.published],
            },
            {
                id: 2,
                title: "Post #2",
                authors: ["olimjon"],
                statuses: [Post_1.PostStatus.published],
            },
            {
                id: 3,
                title: "Post #3",
                authors: [],
                statuses: [],
            },
        ]);
        const loadedPost2 = await connection.manager.find(Post_1.Post, {
            where: {
                authors: (0, ArrayContainedBy_1.ArrayContainedBy)(["olimjon"]),
            },
            order: {
                id: "asc",
            },
        });
        loadedPost2.should.be.eql([
            {
                id: 2,
                title: "Post #2",
                authors: ["olimjon"],
                statuses: [Post_1.PostStatus.published],
            },
            {
                id: 3,
                title: "Post #3",
                authors: [],
                statuses: [],
            },
        ]);
    })));
    it("should find entries in enum arrays", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection.manager);
        const loadedPost1 = await connection.manager.find(Post_1.Post, {
            where: {
                statuses: (0, ArrayContainedBy_1.ArrayContainedBy)([
                    Post_1.PostStatus.draft,
                    Post_1.PostStatus.published,
                ]),
            },
            order: {
                id: "asc",
            },
        });
        loadedPost1.should.be.eql([
            {
                id: 1,
                title: "Post #1",
                authors: ["dmitry", "olimjon"],
                statuses: [Post_1.PostStatus.draft, Post_1.PostStatus.published],
            },
            {
                id: 2,
                title: "Post #2",
                authors: ["olimjon"],
                statuses: [Post_1.PostStatus.published],
            },
            {
                id: 3,
                title: "Post #3",
                authors: [],
                statuses: [],
            },
        ]);
        const loadedPost2 = await connection.manager.find(Post_1.Post, {
            where: {
                statuses: (0, ArrayContainedBy_1.ArrayContainedBy)([Post_1.PostStatus.published]),
            },
            order: {
                id: "asc",
            },
        });
        loadedPost2.should.be.eql([
            {
                id: 2,
                title: "Post #2",
                authors: ["olimjon"],
                statuses: [Post_1.PostStatus.published],
            },
            {
                id: 3,
                title: "Post #3",
                authors: [],
                statuses: [],
            },
        ]);
    })));
});
//# sourceMappingURL=array-contained-by-operator.test.js.map