"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Teacher_1 = require("./entity/Teacher");
const Post_1 = require("./entity/Post");
const CheckMetadata_1 = require("../../../src/metadata/CheckMetadata");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("schema builder > change check constraint", () => {
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
    it("should correctly add new check constraint", () => Promise.all(connections.map(async (connection) => {
        // Mysql does not support check constraints.
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver))
            return;
        const teacherMetadata = connection.getMetadata(Teacher_1.Teacher);
        const checkMetadata = new CheckMetadata_1.CheckMetadata({
            entityMetadata: teacherMetadata,
            args: {
                target: Teacher_1.Teacher,
                expression: `${connection.driver.escape("name")} <> 'asd'`,
            },
        });
        checkMetadata.build(connection.namingStrategy);
        teacherMetadata.checks.push(checkMetadata);
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("teacher");
        await queryRunner.release();
        table.checks.length.should.be.equal(1);
    })));
    it("should correctly change check", () => Promise.all(connections.map(async (connection) => {
        // Mysql does not support check constraints.
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver))
            return;
        const postMetadata = connection.getMetadata(Post_1.Post);
        postMetadata.checks[0].expression = `${connection.driver.escape("likesCount")} < 2000`;
        postMetadata.checks[0].build(connection.namingStrategy);
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        table.checks[0]
            .expression.indexOf("2000")
            .should.be.not.equal(-1);
    })));
    it("should correctly drop removed check", () => Promise.all(connections.map(async (connection) => {
        // Mysql does not support check constraints.
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver))
            return;
        const postMetadata = connection.getMetadata(Post_1.Post);
        postMetadata.checks = [];
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        table.checks.length.should.be.equal(0);
    })));
});
//# sourceMappingURL=change-check-constraint.js.map