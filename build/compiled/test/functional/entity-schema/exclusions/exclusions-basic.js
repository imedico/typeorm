"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Meeting_1 = require("./entity/Meeting");
describe("entity-schema > exclusions", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Meeting_1.MeetingSchema],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create an exclusion constraint", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("meeting");
        await queryRunner.release();
        table.exclusions.length.should.be.equal(1);
    })));
});
//# sourceMappingURL=exclusions-basic.js.map