"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Person_1 = require("./entity/Person");
describe("entity-schema > columns > mysql", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Person_1.PersonSchema],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create columns with different options", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("person");
        await queryRunner.release();
        table.findColumnByName("Id").unsigned.should.be.true;
        table.findColumnByName("PostCode").zerofill.should.be.true;
        table.findColumnByName("PostCode").unsigned.should.be.true;
        table.findColumnByName("PostCode").width.should.be.equal(9);
        table
            .findColumnByName("VirtualFullName")
            .asExpression.should.be.equal("concat(`FirstName`,' ',`LastName`)");
        table
            .findColumnByName("VirtualFullName")
            .generatedType.should.be.equal("VIRTUAL");
        table
            .findColumnByName("StoredFullName")
            .asExpression.should.be.equal("concat(`FirstName`,' ',`LastName`)");
        table
            .findColumnByName("StoredFullName")
            .generatedType.should.be.equal("STORED");
        table
            .findColumnByName("LastVisitDate")
            .onUpdate.should.be.equal("CURRENT_TIMESTAMP(3)");
    })));
});
//# sourceMappingURL=columns-mysql.js.map