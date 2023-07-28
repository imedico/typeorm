"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const ViewC_1 = require("./entity/ViewC");
const ViewA_1 = require("./entity/ViewA");
const ViewB_1 = require("./entity/ViewB");
const Test_1 = require("./entity/Test");
describe("views dependencies", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        schemaCreate: true,
        dropSchema: true,
        // entities: [ViewC, ViewB, ViewA, TestEntity],
        entities: [Test_1.TestEntity, ViewA_1.ViewA, ViewB_1.ViewB, ViewC_1.ViewC],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should generate drop and create queries in correct order", () => Promise.all(connections.map(async (connection) => {
        var _a;
        const expectedDrops = [];
        const expectedCreates = [];
        // Views in order in which they should be created
        for (const view of [ViewA_1.ViewA, ViewB_1.ViewB, ViewC_1.ViewC]) {
            const metadata = connection.getMetadata(view);
            // Modify ViewA, this should trigger updates on all views that depend on it
            if (view === ViewA_1.ViewA) {
                metadata.expression = (_a = metadata.expression) === null || _a === void 0 ? void 0 : _a.replace("V1", "V2");
            }
            expectedDrops.push(new RegExp(`^DROP\\s+VIEW.*"${metadata.tableName}"`));
            expectedCreates.push(new RegExp(`^CREATE\\s+VIEW.*"${metadata.tableName}"`));
        }
        // Drop order should be reverse of create order
        expectedDrops.reverse();
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        // console.log(sqlInMemory.upQueries.map(q => q.query));
        const dropPositions = expectedDrops.map((expected) => sqlInMemory.upQueries.findIndex((q) => q.query.match(expected)));
        // console.log("dropPositions", dropPositions);
        (0, chai_1.expect)(dropPositions).to.have.length(3);
        const dropPositionsSorted = dropPositions
            .slice()
            .sort((a, b) => a - b);
        (0, chai_1.expect)(dropPositions).eql(dropPositionsSorted);
        const createPositions = expectedCreates.map((expected) => sqlInMemory.upQueries.findIndex((q) => q.query.match(expected)));
        // console.log("createPositions", createPositions);
        (0, chai_1.expect)(createPositions).to.have.length(3);
        const createPositionsSorted = createPositions
            .slice()
            .sort((a, b) => a - b);
        (0, chai_1.expect)(createPositions).eql(createPositionsSorted);
    })));
});
//# sourceMappingURL=view-entity-dependencies.js.map