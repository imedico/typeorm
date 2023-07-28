"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const Car_1 = require("./entity/Car");
const Plane_1 = require("./entity/Plane");
describe("github issues > #2800 - Can't override embedded entities in STI implementation", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to save entity with embedded entities overriding", () => Promise.all(connections.map(async (connection) => {
        await connection.manager.save(Car_1.Car, connection.manager.create(Car_1.Car, {
            engine: {
                horsePower: 42,
                torque: 42,
            },
        }));
        await connection.manager.save(Plane_1.Plane, connection.manager.create(Plane_1.Plane, {
            engine: {
                beep: 42,
                boop: 42,
            },
        }));
    })));
});
//# sourceMappingURL=issue-2800.js.map