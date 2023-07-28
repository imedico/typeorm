"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../utils/test-setup");
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const Author_1 = require("./entity/Author");
const Post_1 = require("./entity/Post");
const Tag_1 = require("./entity/Tag");
const find_options_test_utils_1 = require("./find-options-test-utils");
describe("github issues > #9977", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        __dirname,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("where relations with (More|Less)ThanOrEqual operators", () => Promise.all(connections.map(async (connection) => {
        await (0, find_options_test_utils_1.prepareData)(connection.manager);
        const posts1 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            where: {
                tags: (0, src_1.MoreThanOrEqual)(2),
            },
        })
            .getMany();
        posts1.should.be.eql([
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
        ]);
        const posts2 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            where: {
                tags: (0, src_1.MoreThanOrEqual)(1),
                counters: {
                    likedUsers: (0, src_1.MoreThanOrEqual)(2),
                },
            },
        })
            .getMany();
        posts2.should.be.eql([
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
        ]);
        const posts3 = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            where: {
                author: {
                    photos: (0, src_1.MoreThanOrEqual)(2),
                },
            },
            order: {
                id: "asc",
            },
        })
            .getMany();
        posts3.should.be.eql([
            {
                id: 1,
                title: "Post #1",
                text: "About post #1",
                counters: { likes: 1 },
            },
            {
                id: 2,
                title: "Post #2",
                text: "About post #2",
                counters: { likes: 2 },
            },
            {
                id: 4,
                title: "Post #4",
                text: "About post #4",
                counters: { likes: 1 },
            },
        ]);
        const authors = await connection
            .createQueryBuilder(Author_1.Author, "author")
            .setFindOptions({
            where: {
                photos: (0, src_1.MoreThanOrEqual)(1),
            },
        })
            .getMany();
        authors.should.be.eql([
            { id: 1, firstName: "Timber", lastName: "Saw", age: 25 },
        ]);
        const tags1 = await connection
            .createQueryBuilder(Tag_1.Tag, "tag")
            .setFindOptions({
            where: {
                posts: (0, src_1.MoreThanOrEqual)(2),
            },
            order: {
                id: "asc",
            },
        })
            .getMany();
        tags1.should.be.eql([
            { id: 1, name: "category #1" },
            { id: 2, name: "category #2" },
        ]);
        const tags2 = await connection
            .createQueryBuilder(Tag_1.Tag, "tag")
            .setFindOptions({
            where: {
                posts: (0, src_1.LessThanOrEqual)(0),
            },
        })
            .getMany();
        tags2.should.be.eql([{ id: 3, name: "category #3" }]);
    })));
});
//# sourceMappingURL=issue-9977.js.map