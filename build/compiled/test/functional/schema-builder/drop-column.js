"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("schema builder > drop column", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly drop column", () => Promise.all(connections.map(async (connection) => {
        const studentMetadata = connection.getMetadata("student");
        const removedColumns = studentMetadata.columns.filter((column) => ["name", "faculty"].indexOf(column.propertyName) !== -1);
        removedColumns.forEach((column) => {
            studentMetadata.columns.splice(studentMetadata.columns.indexOf(column), 1);
        });
        // in real sync indices removes automatically
        studentMetadata.indices = studentMetadata.indices.filter((index) => {
            return !index.columns.find((column) => ["name", "facultyId"].indexOf(column.databaseName) !== -1);
        });
        const removedForeignKey = studentMetadata.foreignKeys.find((fk) => {
            return !!fk.columns.find((column) => column.propertyName === "faculty");
        });
        studentMetadata.foreignKeys.splice(studentMetadata.foreignKeys.indexOf(removedForeignKey), 1);
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const studentTable = await queryRunner.getTable("student");
        await queryRunner.release();
        (0, chai_1.expect)(studentTable.findColumnByName("name")).to.be.undefined;
        (0, chai_1.expect)(studentTable.findColumnByName("faculty")).to.be
            .undefined;
        // CockroachDB creates indices for foreign keys
        if (connection.driver.options.type === "cockroachdb") {
            studentTable.indices.length.should.be.equal(1);
        }
        else {
            studentTable.indices.length.should.be.equal(0);
        }
        studentTable.foreignKeys.length.should.be.equal(1);
    })));
});
//# sourceMappingURL=drop-column.js.map