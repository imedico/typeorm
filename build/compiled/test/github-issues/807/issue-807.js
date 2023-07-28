"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Tournament_1 = require("./entity/Tournament");
describe("github issues > #807 Error in persisting dates", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to save dates as objects", () => Promise.all(connections.map(async (connection) => {
        const tournament = new Tournament_1.Tournament();
        tournament.name = "One";
        tournament.startDate = new Date();
        tournament.endDate = new Date();
        await connection.manager.save(tournament);
    })));
    it("should be able to save dates as strings", () => Promise.all(connections.map(async (connection) => {
        const tournament = Object.assign(new Tournament_1.Tournament(), {
            name: "One",
            startDate: "2017-08-28T00:00:00.000Z",
            endDate: "2017-08-31T23:59:59.999Z",
        });
        await connection.manager.save(tournament);
    })));
});
//# sourceMappingURL=issue-807.js.map