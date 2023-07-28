"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const Post_1 = require("./entity/Post");
describe('github issues > #4147 `SQLITE_ERROR: near "-": syntax error` when use sqlite, simple-enum', () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [new src_1.EntitySchema(Post_1.PostSchema)],
        dropSchema: true,
        enabledDrivers: ["sqlite", "better-sqlite3"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not error while synchronizing when using simple-enum with sqlite", () => Promise.all(connections.map(async (connection) => {
        await connection.synchronize();
        await connection.synchronize();
    })));
});
//# sourceMappingURL=issue-4147.js.map