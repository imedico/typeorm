"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const IndexMetadata_1 = require("../../../src/metadata/IndexMetadata");
const Teacher_1 = require("./entity/Teacher");
const Student_1 = require("./entity/Student");
const TableIndex_1 = require("../../../src/schema-builder/table/TableIndex");
const chai_1 = require("chai");
describe("schema builder > change index", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly add new index", () => Promise.all(connections.map(async (connection) => {
        const teacherMetadata = connection.getMetadata(Teacher_1.Teacher);
        const nameColumn = teacherMetadata.findColumnWithPropertyName("name");
        const indexMetadata = new IndexMetadata_1.IndexMetadata({
            entityMetadata: teacherMetadata,
            columns: [nameColumn],
            args: {
                target: Teacher_1.Teacher,
                synchronize: true,
            },
        });
        indexMetadata.build(connection.namingStrategy);
        teacherMetadata.indices.push(indexMetadata);
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const teacherTable = await queryRunner.getTable("teacher");
        await queryRunner.release();
        teacherTable.indices.length.should.be.equal(1);
        // revert changes
        teacherMetadata.indices.splice(teacherMetadata.indices.indexOf(indexMetadata), 1);
    })));
    it("should correctly change index", () => Promise.all(connections.map(async (connection) => {
        const studentMetadata = connection.getMetadata(Student_1.Student);
        studentMetadata.indices[0].name = "changed_index";
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const studentTable = await queryRunner.getTable("student");
        await queryRunner.release();
        const index = studentTable.indices.find((i) => i.name === "changed_index");
        (0, chai_1.expect)(index).not.be.undefined;
    })));
    it("should correctly drop removed index", () => Promise.all(connections.map(async (connection) => {
        const studentMetadata = connection.getMetadata(Student_1.Student);
        studentMetadata.indices.splice(0, 1);
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const studentTable = await queryRunner.getTable("student");
        await queryRunner.release();
        // CockroachDB also stores indices for relation columns
        if (connection.driver.options.type === "cockroachdb") {
            studentTable.indices.length.should.be.equal(2);
        }
        else {
            studentTable.indices.length.should.be.equal(0);
        }
    })));
    it("should ignore index synchronization when `synchronize` set to false", () => Promise.all(connections.map(async (connection) => {
        // You can not disable synchronization for unique index in CockroachDB, because unique indices are stored as UNIQUE constraints
        const queryRunner = connection.createQueryRunner();
        let teacherTable = await queryRunner.getTable("teacher");
        teacherTable.indices.length.should.be.equal(0);
        const index = new TableIndex_1.TableIndex({
            name: "ignored_index",
            columnNames: ["name"],
            isUnique: true,
        });
        await queryRunner.createIndex(teacherTable, index);
        teacherTable = await queryRunner.getTable("teacher");
        // CockroachDB stores unique indices as UNIQUE constraints
        if (connection.driver.options.type === "cockroachdb") {
            teacherTable.indices.length.should.be.equal(0);
            teacherTable.uniques.length.should.be.equal(1);
            teacherTable.findColumnByName("name").isUnique.should.be
                .true;
        }
        else {
            teacherTable.indices.length.should.be.equal(1);
            teacherTable.indices[0].isUnique.should.be.true;
        }
        await connection.synchronize();
        teacherTable = await queryRunner.getTable("teacher");
        // CockroachDB stores unique indices as UNIQUE constraints
        if (connection.driver.options.type === "cockroachdb") {
            teacherTable.indices.length.should.be.equal(0);
            teacherTable.uniques.length.should.be.equal(0);
            teacherTable.findColumnByName("name").isUnique.should.be
                .false;
        }
        else {
            teacherTable.indices.length.should.be.equal(1);
            teacherTable.indices[0].isUnique.should.be.true;
        }
        await queryRunner.release();
    })));
});
//# sourceMappingURL=change-index.js.map