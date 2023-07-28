"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #2737 MySQLDriver findChangedColumns (fields: width, precision)", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        dropSchema: false,
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql", "mariadb", "aurora-mysql"],
        schemaCreate: false,
        cache: false,
        driverSpecific: {
            bigNumberStrings: false,
        },
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not create migrations for an existing unique index when bigNumberStrings is false", () => Promise.all(connections.map(async (connection) => {
        const entityMetadata = connection.entityMetadatas.find((x) => x.name === "TestEntity");
        const indexMetadata = entityMetadata.indices.find((index) => index.columns.some((column) => column.propertyName === "unique_column"));
        // Ensure the setup is correct
        (0, chai_1.expect)(indexMetadata).to.exist;
        (0, chai_1.expect)(indexMetadata.isUnique).to.be.true;
        await connection.synchronize(false);
        const schemaBuilder = connection.driver.createSchemaBuilder();
        const syncQueries = await schemaBuilder.log();
        (0, chai_1.expect)(syncQueries.downQueries).to.be.an("array").that.is.empty;
        (0, chai_1.expect)(syncQueries.upQueries).to.be.an("array").that.is.empty;
    })));
});
//# sourceMappingURL=issue-2737.js.map