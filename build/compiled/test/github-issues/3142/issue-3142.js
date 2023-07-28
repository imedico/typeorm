"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #3142 Unique constraint not created on embedded entity field", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create unique constraint on embedded entity", () => Promise.all(connections.map(async function (connection) {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("person");
        await queryRunner.release();
        (0, chai_1.expect)(table.uniques.length).to.be.equal(2);
        const contactUnique = table.uniques.find((unique) => unique.columnNames.indexOf("email") !== 0);
        (0, chai_1.expect)(contactUnique).to.be.exist;
    })));
});
//# sourceMappingURL=issue-3142.js.map