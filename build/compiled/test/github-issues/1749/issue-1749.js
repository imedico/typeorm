"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Bar_1 = require("./entity/Bar");
describe("github issues > #1749 Can't delete tables in non-default schema", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should delete entites from tables in different schemas", () => Promise.all(connections.map(async (connection) => {
        const bar = new Bar_1.Bar();
        const persistedBar = await connection.manager.save(bar);
        await connection.manager.delete(Bar_1.Bar, persistedBar.id);
    })));
});
//# sourceMappingURL=issue-1749.js.map