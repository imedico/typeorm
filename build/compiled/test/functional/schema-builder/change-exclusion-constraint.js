"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Teacher_1 = require("./entity/Teacher");
const Post_1 = require("./entity/Post");
const ExclusionMetadata_1 = require("../../../src/metadata/ExclusionMetadata");
describe("schema builder > change exclusion constraint", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly add new exclusion constraint", () => Promise.all(connections.map(async (connection) => {
        const teacherMetadata = connection.getMetadata(Teacher_1.Teacher);
        const exclusionMetadata = new ExclusionMetadata_1.ExclusionMetadata({
            entityMetadata: teacherMetadata,
            args: {
                target: Teacher_1.Teacher,
                expression: `USING gist ("name" WITH =)`,
            },
        });
        exclusionMetadata.build(connection.namingStrategy);
        teacherMetadata.exclusions.push(exclusionMetadata);
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("teacher");
        await queryRunner.release();
        table.exclusions.length.should.be.equal(1);
    })));
    it("should correctly change exclusion", () => Promise.all(connections.map(async (connection) => {
        const postMetadata = connection.getMetadata(Post_1.Post);
        postMetadata.exclusions[0].expression = `USING gist ("tag" WITH =)`;
        postMetadata.exclusions[0].build(connection.namingStrategy);
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        table.exclusions[0]
            .expression.indexOf("tag")
            .should.be.not.equal(-1);
    })));
    it("should correctly drop removed exclusion", () => Promise.all(connections.map(async (connection) => {
        const postMetadata = connection.getMetadata(Post_1.Post);
        postMetadata.exclusions = [];
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        table.exclusions.length.should.be.equal(0);
    })));
});
//# sourceMappingURL=change-exclusion-constraint.js.map