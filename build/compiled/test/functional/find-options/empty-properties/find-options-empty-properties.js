"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../utils/test-setup");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("find options > where", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({ __dirname })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    async function prepareData(connection) {
        const post1 = new Post_1.Post();
        post1.title = "Post #1";
        post1.text = "About post #1";
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "Post #2";
        post2.text = "About post #2";
        await connection.manager.save(post2);
    }
    it("should skip undefined properties", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            where: {
                title: "Post #1",
                text: undefined,
            },
            order: {
                id: "asc",
            },
        })
            .getMany();
        posts.should.be.eql([
            { id: 1, title: "Post #1", text: "About post #1" },
        ]);
    })));
    it("should skip null properties", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const posts1 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            // @ts-expect-error
            where: {
                title: "Post #1",
                text: null,
            },
            order: {
                id: "asc",
            },
        })
            .getMany();
        posts1.should.be.eql([
            { id: 1, title: "Post #1", text: "About post #1" },
        ]);
        const posts2 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            // @ts-expect-error
            where: {
                text: null,
            },
            order: {
                id: "asc",
            },
        })
            .getMany();
        posts2.should.be.eql([
            { id: 1, title: "Post #1", text: "About post #1" },
            { id: 2, title: "Post #2", text: "About post #2" },
        ]);
    })));
});
//# sourceMappingURL=find-options-empty-properties.js.map