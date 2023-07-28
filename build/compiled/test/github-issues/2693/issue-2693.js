"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const QueryFailedError_1 = require("../../../src/error/QueryFailedError");
describe("github issues > #2875 Option to run migrations in 1-transaction-per-migration mode", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        __dirname,
        schemaCreate: false,
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should fail to run all necessary migrations when transaction is all", () => Promise.all(connections.map(async (connection) => {
        return connection
            .runMigrations({ transaction: "all" })
            .should.be.rejectedWith(QueryFailedError_1.QueryFailedError, 'relation "users" does not exist');
    })));
    it("should be able to run all necessary migrations when transaction is each", () => Promise.all(connections.map(async (connection) => {
        const mymigr = await connection.runMigrations({
            transaction: "each",
        });
        mymigr.length.should.be.equal(3);
        mymigr[0].name.should.be.equal("CreateUuidExtension0000000000001");
        mymigr[1].name.should.be.equal("CreateUsers0000000000002");
        mymigr[2].name.should.be.equal("InsertUser0000000000003");
    })));
});
//# sourceMappingURL=issue-2693.js.map