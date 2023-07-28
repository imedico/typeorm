"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Roles_1 = require("./entity/Roles");
describe("github issues > #3536 Sync only works once for enums on entities with capital letters in entity name", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Roles_1.Roles],
            enabledDrivers: ["postgres"],
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should run without throw error", () => Promise.all(connections.map(async (connection) => {
        await connection.synchronize();
        await connection.synchronize();
    })));
});
//# sourceMappingURL=issue-3536.js.map