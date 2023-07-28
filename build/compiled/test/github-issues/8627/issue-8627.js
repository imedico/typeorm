"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const long_name_entity_1 = require("./entity/long-name.entity");
describe("github issues > #8627 junction aliases are not unique", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        dropSchema: true,
        schemaCreate: true,
        name: (0, test_utils_1.generateRandomText)(10), // Use a different name to avoid a random failure in build pipeline
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not fail querying many-to-many-relation", () => Promise.all(connections.map(async (connection) => {
        const manager = connection.createEntityManager();
        // Nothing special to be checked here, just the query shouldn't fail.
        const result = await manager.find(long_name_entity_1.ThisIsARealLongNameForAnEntityBecauseThisIsNecessary);
        (0, chai_1.expect)(result).to.eql([]);
    })));
});
//# sourceMappingURL=issue-8627.js.map