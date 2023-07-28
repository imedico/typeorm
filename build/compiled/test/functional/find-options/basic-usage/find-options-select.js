"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../utils/test-setup");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const find_options_test_utils_1 = require("./find-options-test-utils");
describe("find options > select", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({ __dirname })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("select id", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts1 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            select: { id: true },
            order: {
                id: "asc",
            },
        })
            .getMany();
        posts1.should.be.eql([
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
        ]);
        const posts2 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            select: {
                id: true,
            },
            order: {
                id: "asc",
            },
        })
            .getMany();
        posts2.should.be.eql([
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
        ]);
    })));
    it("select title", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts1 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            select: { title: true },
            order: {
                title: "asc",
            },
        })
            .getMany();
        posts1.should.be.eql([
            { title: "Post #1" },
            { title: "Post #2" },
            { title: "Post #3" },
            { title: "Post #4" },
        ]);
        const posts2 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            select: {
                title: true,
            },
            order: {
                title: "asc",
            },
        })
            .getMany();
        posts2.should.be.eql([
            { title: "Post #1" },
            { title: "Post #2" },
            { title: "Post #3" },
            { title: "Post #4" },
        ]);
    })));
    it("select title and text", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts1 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            select: { title: true, text: true },
            order: {
                title: "asc",
            },
        })
            .getMany();
        posts1.should.be.eql([
            { title: "Post #1", text: "About post #1" },
            { title: "Post #2", text: "About post #2" },
            { title: "Post #3", text: "About post #3" },
            { title: "Post #4", text: "About post #4" },
        ]);
        const posts2 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            select: {
                title: true,
                text: true,
            },
            order: {
                title: "asc",
            },
        })
            .getMany();
        posts2.should.be.eql([
            { title: "Post #1", text: "About post #1" },
            { title: "Post #2", text: "About post #2" },
            { title: "Post #3", text: "About post #3" },
            { title: "Post #4", text: "About post #4" },
        ]);
    })));
    it("select column in embed", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            select: {
                counters: {
                    likes: true,
                },
            },
            order: {
                id: "asc",
            },
        })
            .getMany();
        posts.should.be.eql([
            { counters: { likes: 1 } },
            { counters: { likes: 2 } },
            { counters: { likes: 1 } },
            { counters: { likes: 1 } },
        ]);
    })));
});
//# sourceMappingURL=find-options-select.js.map