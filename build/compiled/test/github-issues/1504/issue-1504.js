"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const TestEntity1_1 = require("./entity/TestEntity1");
describe("github issues > #1504 Cannot eagerly query Entity with relation more than 3 levels deep", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not throw an error", () => Promise.all(connections.map(async (connection) => {
        await connection.getRepository(TestEntity1_1.TestEntity1).findOne({
            where: {
                id: 1,
            },
            relations: {
                Entity2: {
                    Entity3: {
                        Entity4: true,
                    },
                },
            },
        });
    })));
});
//# sourceMappingURL=issue-1504.js.map