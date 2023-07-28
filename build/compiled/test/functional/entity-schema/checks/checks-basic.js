"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Person_1 = require("./entity/Person");
const Person2_1 = require("./entity/Person2");
describe("entity-schema > checks", () => {
    describe("entity-schema > checks > postgres, cockroachdb, oracle, mssql", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Person_1.PersonSchema],
            enabledDrivers: [
                "postgres",
                "cockroachdb",
                "oracle",
                "mssql",
            ],
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should create a check constraints", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const table = await queryRunner.getTable("person");
            await queryRunner.release();
            table.checks.length.should.be.equal(2);
        })));
    });
    describe("entity-schema > checks > spanner", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Person2_1.PersonSchema2],
            enabledDrivers: ["spanner"],
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should create a check constraints", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const table = await queryRunner.getTable("person");
            await queryRunner.release();
            table.checks.length.should.be.equal(2);
        })));
    });
});
//# sourceMappingURL=checks-basic.js.map