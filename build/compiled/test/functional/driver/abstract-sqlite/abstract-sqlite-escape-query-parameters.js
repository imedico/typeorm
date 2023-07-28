"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../../utils/test-utils");
describe("escape sqlite query parameters", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite", "better-sqlite3"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should transform boolean parameters with value `true` into `1`", () => Promise.all(connections.map((connection) => {
        const [_, parameters] = connection.driver.escapeQueryWithParameters("SELECT nothing FROM irrelevant WHERE a = :param1", { param1: true }, {});
        parameters.should.eql([1]);
    })));
    it("should transform boolean parameters with value `false` into `0`", () => Promise.all(connections.map((connection) => {
        const [_, parameters] = connection.driver.escapeQueryWithParameters("SELECT nothing FROM irrelevant WHERE a = :param1", { param1: false }, {});
        parameters.should.eql([0]);
    })));
    it("should transform boolean nativeParameters with value `true` into `1`", () => Promise.all(connections.map((connection) => {
        const [_, parameters] = connection.driver.escapeQueryWithParameters("SELECT nothing FROM irrelevant", {}, { nativeParam1: true });
        parameters.should.eql([1]);
    })));
    it("should transform boolean nativeParameters with value `false` into 0", () => Promise.all(connections.map((connection) => {
        const [_, parameters] = connection.driver.escapeQueryWithParameters("SELECT nothing FROM irrelevant", {}, { nativeParam1: false });
        parameters.should.eql([0]);
    })));
});
//# sourceMappingURL=abstract-sqlite-escape-query-parameters.js.map