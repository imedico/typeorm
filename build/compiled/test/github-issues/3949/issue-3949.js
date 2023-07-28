"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #3949 sqlite date hydration is susceptible to corruption", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["sqlite", "better-sqlite3", "sqljs"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    const testDateString = (sqlDateString, jsDateString) => async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const repo = connection.getRepository(Post_1.Post);
        await queryRunner.query(`INSERT INTO "POST"("id", "date") VALUES (?, ?)`, [1, sqlDateString]);
        const post = await repo.findOneBy({ id: 1 });
        post.date.should.eql(new Date(jsDateString));
    };
    it("should correctly read date column that was inserted raw in canonical format", () => 
    // Append UTC to javascript date string, because while sqlite assumes naive date strings are UTC,
    // javascript assumes they are in local system time.
    Promise.all(connections.map(testDateString("2018-03-14 02:33:33.906", "2018-03-14T02:33:33.906Z"))));
    it("should correctly read date column that was inserted raw in iso 8601 format", () => Promise.all(connections.map(testDateString("2018-03-14T02:33:33.906+00:00", "2018-03-14T02:33:33.906Z"))));
});
//# sourceMappingURL=issue-3949.js.map