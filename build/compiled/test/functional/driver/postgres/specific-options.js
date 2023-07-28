"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
describe("postgres specific options", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        driverSpecific: {
            applicationName: "some test name",
        },
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should set application_name", () => Promise.all(connections.map(async (connection) => {
        const result = await connection.query("select current_setting('application_name') as application_name");
        (0, chai_1.expect)(result.length).equals(1);
        (0, chai_1.expect)(result[0].application_name).equals("some test name");
    })));
});
//# sourceMappingURL=specific-options.js.map