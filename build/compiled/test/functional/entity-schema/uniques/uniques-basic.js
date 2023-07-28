"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
const Person_1 = require("./entity/Person");
const DriverUtils_1 = require("../../../../src/driver/DriverUtils");
describe("entity-schema > uniques", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Person_1.PersonSchema],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create an unique constraint with 2 columns", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("person");
        await queryRunner.release();
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner") {
            (0, chai_1.expect)(table.indices.length).to.be.equal(1);
            (0, chai_1.expect)(table.indices[0].name).to.be.equal("UNIQUE_TEST");
            (0, chai_1.expect)(table.indices[0].isUnique).to.be.true;
            (0, chai_1.expect)(table.indices[0].columnNames.length).to.be.equal(2);
            (0, chai_1.expect)(table.indices[0].columnNames).to.deep.include.members(["FirstName", "LastName"]);
        }
        else if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver)) {
            (0, chai_1.expect)(table.uniques.length).to.be.equal(1);
            (0, chai_1.expect)(table.uniques[0].columnNames.length).to.be.equal(2);
            (0, chai_1.expect)(table.uniques[0].columnNames).to.deep.include.members(["FirstName", "LastName"]);
        }
        else {
            (0, chai_1.expect)(table.uniques.length).to.be.equal(1);
            (0, chai_1.expect)(table.uniques[0].name).to.be.equal("UNIQUE_TEST");
            (0, chai_1.expect)(table.uniques[0].columnNames.length).to.be.equal(2);
            (0, chai_1.expect)(table.uniques[0].columnNames).to.deep.include.members(["FirstName", "LastName"]);
        }
    })));
});
//# sourceMappingURL=uniques-basic.js.map