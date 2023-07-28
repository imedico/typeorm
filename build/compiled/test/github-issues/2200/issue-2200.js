"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Booking_1 = require("./entity/Booking");
const NamingStrategyUnderTest_1 = require("./naming/NamingStrategyUnderTest");
describe("github issue > #2200 Bug - Issue with snake_case naming strategy", () => {
    let connections;
    let namingStrategy = new NamingStrategyUnderTest_1.NamingStrategyUnderTest();
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        namingStrategy,
    })));
    beforeEach(() => {
        return (0, test_utils_1.reloadTestingDatabases)(connections);
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("Renammed alias allow to query correctly", () => Promise.all(connections.map(async (connection) => {
        await connection.getRepository(Booking_1.Booking).find({ take: 10 });
    })));
});
//# sourceMappingURL=issue-2200.js.map