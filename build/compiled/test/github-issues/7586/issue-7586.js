"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Test_1 = require("./entity/Test");
const ViewA_1 = require("./entity/ViewA");
const ViewB_1 = require("./entity/ViewB");
const ViewC_1 = require("./entity/ViewC");
describe("github issues > #7586 Oddly indexed views are not dropped in migration", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        schemaCreate: true,
        dropSchema: true,
        entities: [Test_1.TestEntity, ViewA_1.ViewA, ViewB_1.ViewB, ViewC_1.ViewC],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should generate drop queries for all views", () => Promise.all(connections.map(async (connection) => {
        var _a;
        const expectedDrops = [];
        for (const view of [ViewA_1.ViewA, ViewB_1.ViewB, ViewC_1.ViewC]) {
            const metadata = connection.getMetadata(view);
            metadata.expression = (_a = metadata.expression) === null || _a === void 0 ? void 0 : _a.replace("V1", "V2");
            expectedDrops.push(new RegExp(`^DROP\\s+VIEW.*"${metadata.tableName}"`));
        }
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.downQueries
            .filter((q) => expectedDrops.find((expected) => q.query.match(expected)))
            .length.should.be.equal(expectedDrops.length);
        sqlInMemory.upQueries
            .filter((q) => expectedDrops.find((expected) => q.query.match(expected)))
            .length.should.be.equal(expectedDrops.length);
    })));
});
//# sourceMappingURL=issue-7586.js.map