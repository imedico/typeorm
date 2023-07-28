"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const TeamEntity_1 = require("./entity/TeamEntity");
const UserEntity_1 = require("./entity/UserEntity");
describe("other issues > redundant cascade schema queries in many-to-many relation", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [TeamEntity_1.TeamEntity, UserEntity_1.UserEntity],
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work correctly", () => Promise.all(connections.map(async (connection) => {
        await connection.synchronize();
        console.log("------");
        await connection.synchronize();
    })));
});
//# sourceMappingURL=redundant-cascade-schema-queries-many-to-many-relation.js.map