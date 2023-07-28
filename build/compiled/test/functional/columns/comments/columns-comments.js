"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Test_1 = require("./entity/Test");
describe("columns > comments", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Test_1.Test],
        // Only supported on postgres, cockroachdb, and mysql
        enabledDrivers: ["postgres", "cockroachdb", "mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist comments of different types to the database", () => Promise.all(connections.map(async (connection) => {
        const table = (await connection
            .createQueryRunner()
            .getTable("test"));
        (0, chai_1.expect)(table.findColumnByName("a").comment).to.be.equal("Hello World");
        (0, chai_1.expect)(table.findColumnByName("b").comment).to.be.equal("Hello\nWorld");
        (0, chai_1.expect)(table.findColumnByName("c").comment).to.be.equal("Hello World! It's going to be a beautiful day.");
        (0, chai_1.expect)(table.findColumnByName("d").comment).to.be.equal("Hello World! #@!$`");
        (0, chai_1.expect)(table.findColumnByName("e").comment).to.be.equal("Hello World. \r\n\t\b\f\v");
        (0, chai_1.expect)(table.findColumnByName("f").comment).to.be.equal("Hello World.\\");
        (0, chai_1.expect)(table.findColumnByName("g").comment).to.be.equal(" ");
        (0, chai_1.expect)(table.findColumnByName("h").comment).to.be.equal(undefined);
        (0, chai_1.expect)(table.findColumnByName("i").comment).to.be.equal(undefined);
    })));
});
//# sourceMappingURL=columns-comments.js.map