"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("schema builder > create table", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create tables with all dependencies", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let postTable = await queryRunner.getTable("post");
        let teacherTable = await queryRunner.getTable("teacher");
        let studentTable = await queryRunner.getTable("student");
        let facultyTable = await queryRunner.getTable("faculty");
        (0, chai_1.expect)(postTable).to.be.undefined;
        (0, chai_1.expect)(teacherTable).to.be.undefined;
        (0, chai_1.expect)(studentTable).to.be.undefined;
        (0, chai_1.expect)(facultyTable).to.be.undefined;
        await connection.synchronize();
        postTable = await queryRunner.getTable("post");
        const idColumn = postTable.findColumnByName("id");
        const versionColumn = postTable.findColumnByName("version");
        const nameColumn = postTable.findColumnByName("name");
        postTable.should.exist;
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner") {
            postTable.indices.length.should.be.equal(2);
        }
        else {
            postTable.uniques.length.should.be.equal(2);
            postTable.checks.length.should.be.equal(1);
        }
        idColumn.isPrimary.should.be.true;
        versionColumn.isUnique.should.be.true;
        if (connection.driver.options.type !== "spanner") {
            nameColumn.default.should.be.exist;
        }
        teacherTable = await queryRunner.getTable("teacher");
        teacherTable.should.exist;
        studentTable = await queryRunner.getTable("student");
        studentTable.should.exist;
        studentTable.foreignKeys.length.should.be.equal(2);
        // CockroachDB also stores indices for relation columns
        if (connection.driver.options.type === "cockroachdb") {
            studentTable.indices.length.should.be.equal(3);
        }
        else {
            studentTable.indices.length.should.be.equal(1);
        }
        facultyTable = await queryRunner.getTable("faculty");
        facultyTable.should.exist;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=create-table.js.map