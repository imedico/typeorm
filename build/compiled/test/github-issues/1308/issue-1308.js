"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const Author_1 = require("./entity/Author");
const Post_1 = require("./entity/Post");
describe("github issues > #1308 Raw Postgresql Update query result is always an empty array", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [
            new src_1.EntitySchema(Author_1.AuthorSchema),
            new src_1.EntitySchema(Post_1.PostSchema),
        ],
        dropSchema: true,
        enabledDrivers: [
            "postgres",
            "mysql",
            "mariadb",
            "aurora-mysql",
        ],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    async function prepareData(connection) {
        const author = new Author_1.Author();
        author.id = 1;
        author.name = "Jane Doe";
        await connection.manager.save(author);
    }
    it("Update query returns the number of affected rows", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const result1 = await connection
            .createQueryBuilder()
            .update(Author_1.Author)
            .set({ name: "John Doe" })
            .where("name = :name", { name: "Jonas Doe" })
            .execute();
        result1.affected.should.be.eql(0);
        const result2 = await connection
            .createQueryBuilder()
            .update(Author_1.Author)
            .set({ name: "John Doe" })
            .where("name = :name", { name: "Jane Doe" })
            .execute();
        result2.affected.should.be.eql(1);
    })));
});
//# sourceMappingURL=issue-1308.js.map