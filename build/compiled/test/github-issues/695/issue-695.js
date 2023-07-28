"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Device_1 = require("./entity/Device");
const DeviceInstance_1 = require("./entity/DeviceInstance");
describe("github issues > #695 Join columns are not using correct length", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should set correct length on to join columns", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("device_instances");
        await queryRunner.release();
        const device = new Device_1.Device();
        device.id = "ABCDEFGHIJKL";
        device.registrationToken = "123456";
        await connection.manager.save(device);
        const deviceInstance = new DeviceInstance_1.DeviceInstance();
        deviceInstance.id = "new post";
        deviceInstance.device = device;
        deviceInstance.instance = 10;
        deviceInstance.type = "type";
        await connection.manager.save(deviceInstance);
        table
            .findColumnByName("device_id")
            .type.should.be.equal("char");
        table
            .findColumnByName("device_id")
            .length.should.be.equal("12");
    })));
});
//# sourceMappingURL=issue-695.js.map