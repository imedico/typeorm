"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const EquipmentModel_1 = require("./entity/EquipmentModel");
const chai_1 = require("chai");
describe("github issues > #3587 do not generate change queries for number based enum types every time", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [EquipmentModel_1.EquipmentModel],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should NOT generate change queries in case enum is not changed", () => Promise.all(connections.map(async function (connection) {
        await connection.synchronize(true);
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        (0, chai_1.expect)(sqlInMemory.downQueries).to.be.eql([]);
        (0, chai_1.expect)(sqlInMemory.upQueries).to.be.eql([]);
    })));
});
//# sourceMappingURL=issue-3587.js.map