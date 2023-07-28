"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Bar_1 = require("./entity/Bar");
describe("github issues > #2199 - Inserting value for @PrimaryGeneratedColumn() for mysql, sqlite and mssql", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: [
            "mysql",
            "mariadb",
            "sqlite",
            "better-sqlite3",
            "mssql",
        ],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should allow to explicitly insert primary key value", () => Promise.all(connections.map(async (connection) => {
        const firstBarQuery = connection.manager.create(Bar_1.Bar, {
            id: 10,
            description: "forced id value",
        });
        const firstBar = await connection.manager.save(firstBarQuery);
        (0, chai_1.expect)(firstBar.id).to.eql(10);
        // Mysql stores and tracks AUTO_INCREMENT value for each table,
        // If the new value is higher than the current maximum value or not specified (use DEFAULT),
        // the AUTO_INCREMENT value is updated, so the next value will be higher.
        const secondBarQuery = connection.manager.create(Bar_1.Bar, {
            description: "default next id value",
        });
        const secondBar = await connection.manager.save(secondBarQuery);
        (0, chai_1.expect)(secondBar.id).to.eql(firstBarQuery.id + 1);
        // If the new value is lower than the current maximum value,
        // the AUTO_INCREMENT value remains unchanged.
        const thirdBarQuery = connection.manager.create(Bar_1.Bar, {
            id: 5,
            description: "lower forced id value",
        });
        const thirdBar = await connection.manager.save(thirdBarQuery);
        (0, chai_1.expect)(thirdBar.id).to.eql(5);
    })));
    it("should reset mssql's INSERT_IDENTITY flag correctly after failed queries", () => Promise.all(connections
        .filter((connection) => connection.driver.options.type === "mssql")
        .map(async (connection) => {
        // Run a query that failes at the database level
        await (0, chai_1.expect)(connection
            .createQueryBuilder()
            .insert()
            .into(Bar_1.Bar)
            .values({
            id: 20,
            description: () => "NONEXISTINGFUNCTION()",
        })
            .execute()).to.be.rejectedWith("Error: 'NONEXISTINGFUNCTION' is not a recognized built-in function name.");
        // And now check that IDENTITY_INSERT is disabled by inserting something without an ID value and see if that works
        const successfulBarQuery = connection.manager.create(Bar_1.Bar, {
            description: "default id value",
        });
        const bar = await connection.manager.save(successfulBarQuery);
        (0, chai_1.expect)(bar.id).to.be.a("number");
    })));
});
//# sourceMappingURL=issue-2199.js.map