"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Dummy_1 = require("./entity/Dummy");
const chai_1 = require("chai");
function ingestStream(stream) {
    let chunks = [];
    return new Promise((ok, fail) => {
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", fail);
        stream.on("end", () => ok(chunks));
    });
}
describe("github issues > #7109 stream() bug from 0.2.25 to 0.2.26 with postgresql", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: [
            "postgres",
            "mysql",
            "mariadb",
            "cockroachdb",
            "spanner",
        ],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should release the QueryRunner created by a SelectQueryBuilder", () => Promise.all(connections.map(async (connection) => {
        const values = [
            { field: "abc" },
            { field: "def" },
            { field: "ghi" },
        ];
        // First create some test data
        await connection
            .createQueryBuilder()
            .insert()
            .into(Dummy_1.Dummy)
            .values(values)
            .execute();
        // Stream data:
        const stream = await connection
            .createQueryBuilder()
            .from(Dummy_1.Dummy, "dummy")
            .select("field")
            .stream();
        const streamedEntities = await ingestStream(stream);
        // If the runner is properly released, the test is already successful; this assert is just a sanity check.
        const extractFields = (val) => val.field;
        (0, chai_1.expect)(streamedEntities.map(extractFields)).to.have.members(values.map(extractFields));
    })));
});
//# sourceMappingURL=issue-7109.js.map