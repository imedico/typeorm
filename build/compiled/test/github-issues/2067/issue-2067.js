"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("github issues > #2067 Unhandled promise rejection warning on postgres connection issues", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return a catchable error on connection errors in queries", () => Promise.all(connections.map(async (connection) => {
        const connectionFailureMessage = "Test error to simulate a connection error";
        if (connection.driver.options.type === "postgres") {
            connection.driver.obtainMasterConnection = () => Promise.reject(new Error(connectionFailureMessage));
            connection.driver.obtainSlaveConnection = () => Promise.reject(new Error(connectionFailureMessage));
        }
        const repository = connection.getRepository(User_1.User);
        return (0, chai_1.expect)(repository.find()).to.be.rejectedWith(Error, connectionFailureMessage);
    })));
});
//# sourceMappingURL=issue-2067.js.map