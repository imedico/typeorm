"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Animal_1 = require("./entity/Animal");
const NamingStrategyUnderTest_1 = require("./naming/NamingStrategyUnderTest");
describe("github issues > #3847 FEATURE REQUEST - Naming strategy foreign key override name", () => {
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
        let metadata = connection.getMetadata(Animal_1.Animal);
        (0, chai_1.expect)(metadata.foreignKeys[0].name).to.eq("fk_animal_category_categoryId");
    })));
});
//# sourceMappingURL=issue-3847.js.map