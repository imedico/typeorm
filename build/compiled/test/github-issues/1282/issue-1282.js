"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Animal_1 = require("./entity/Animal");
const NamingStrategyUnderTest_1 = require("./naming/NamingStrategyUnderTest");
describe("github issue > #1282 FEATURE REQUEST - Naming strategy joinTableColumnName if it is called from the owning or owned (inverse) context ", () => {
    let connections;
    let namingStrategy = new NamingStrategyUnderTest_1.NamingStrategyUnderTest();
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        namingStrategy,
    })));
    beforeEach(() => {
        return (0, test_utils_1.reloadTestingDatabases)(connections);
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("NamingStrategyUnderTest#", () => Promise.all(connections.map(async (connection) => {
        await connection.getRepository(Animal_1.Animal).find();
        let metadata = connection.getManyToManyMetadata(Animal_1.Animal, "categories");
        let columns;
        if (metadata !== undefined) {
            columns = metadata.columns;
        }
        else {
            columns = [];
        }
        (0, chai_1.expect)(columns.find((column) => column.databaseName === "animalIdForward")).not.to.be.undefined;
        (0, chai_1.expect)(columns.find((column) => column.databaseName === "categoryIdInverse")).not.to.be.undefined;
    })));
});
//# sourceMappingURL=issue-1282.js.map