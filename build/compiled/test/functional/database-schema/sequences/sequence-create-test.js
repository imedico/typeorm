"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
const Person_1 = require("./entity/Person");
describe("sequences > creating a sequence and marking the column as generated", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Person_1.Person],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("create table and check that primary key column is marked as generated", function () {
        it("should check that the primary key column is generated automatically", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const table = await queryRunner.getTable("person");
            await queryRunner.release();
            (0, chai_1.expect)(table.findColumnByName("Id").isGenerated).to.be
                .true;
        })));
    });
});
//# sourceMappingURL=sequence-create-test.js.map