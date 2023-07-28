"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const src_1 = require("../../../src");
const xfail_1 = require("../../utils/xfail");
describe("github issues > #3387 named columns", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    xfail_1.xfail
        .unless(() => connections.length > 0)
        .it("should allow inserting named columns", () => Promise.all(connections.map(async (connection) => {
        // Create the categories table.
        const qr = connection.createQueryRunner();
        await qr.createTable(new src_1.Table({
            name: "category",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                },
            ],
        }));
        const insert = connection.manager.insert("category", [
            { name: "Easy" },
            { name: "Medium" },
            { name: "Hard" },
        ]);
        return (0, chai_1.expect)(insert).to.fulfilled;
    })));
});
//# sourceMappingURL=issue-3387.js.map