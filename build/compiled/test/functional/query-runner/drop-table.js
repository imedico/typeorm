"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
describe("query runner > drop table", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly drop table without relations and revert drop", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        table.should.exist;
        await queryRunner.dropTable("post");
        table = await queryRunner.getTable("post");
        (0, chai_1.expect)(table).to.be.undefined;
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("post");
        table.should.exist;
        await queryRunner.release();
    })));
    it("should correctly drop table with relations and revert drop", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let studentTable = await queryRunner.getTable("student");
        let teacherTable = await queryRunner.getTable("teacher");
        let facultyTable = await queryRunner.getTable("faculty");
        studentTable.should.exist;
        teacherTable.should.exist;
        facultyTable.should.exist;
        await queryRunner.dropTable(studentTable);
        await queryRunner.dropTable(teacherTable);
        await queryRunner.dropTable(facultyTable);
        studentTable = await queryRunner.getTable("student");
        teacherTable = await queryRunner.getTable("teacher");
        facultyTable = await queryRunner.getTable("faculty");
        (0, chai_1.expect)(studentTable).to.be.undefined;
        (0, chai_1.expect)(teacherTable).to.be.undefined;
        (0, chai_1.expect)(facultyTable).to.be.undefined;
        await queryRunner.executeMemoryDownSql();
        studentTable = await queryRunner.getTable("student");
        teacherTable = await queryRunner.getTable("teacher");
        facultyTable = await queryRunner.getTable("faculty");
        studentTable.should.exist;
        teacherTable.should.exist;
        facultyTable.should.exist;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=drop-table.js.map