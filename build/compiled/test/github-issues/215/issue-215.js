"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Author_1 = require("./entity/Author");
const Abbreviation_1 = require("./entity/Abbreviation");
describe("github issues > #215 invalid replacements of join conditions", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not do invalid replacements of join conditions", () => Promise.all(connections.map(async (connection) => {
        const author = new Author_1.Author();
        author.name = "John Doe";
        await connection.manager.save(author);
        const abbrev = new Abbreviation_1.Abbreviation();
        abbrev.name = "test";
        await connection.manager.save(abbrev);
        const post = new Post_1.Post();
        post.author = author;
        post.abbreviation = abbrev;
        await connection.manager.save(post);
        // generated query should end with "ON p.abbreviation_id = ab.id"
        // not with ON p.abbreviation.id = ab.id (notice the dot) which would
        // produce an error.
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "p")
            .leftJoinAndMapOne("p.author", Author_1.Author, "n", "p.author_id = n.id")
            .leftJoinAndMapOne("p.abbreviation", Abbreviation_1.Abbreviation, "ab", "p.abbreviation_id = ab.id")
            .getMany();
        loadedPosts.length.should.be.equal(1);
    })));
});
//# sourceMappingURL=issue-215.js.map