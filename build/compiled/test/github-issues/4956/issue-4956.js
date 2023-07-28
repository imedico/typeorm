"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const mocha_1 = require("mocha");
const chai_1 = require("chai");
describe("github issues > #4956 create typeorm_metatable when running migrations.", () => {
    let connections;
    (0, mocha_1.afterEach)(async () => {
        await (0, test_utils_1.closeTestingConnections)(connections);
    });
    it("should create typeorm_metadata table when running migrations with views", async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entities/*{.js,.ts}"],
            migrations: [__dirname + "/migrations/WithView{.js,.ts}"],
            enabledDrivers: ["mysql", "mariadb"],
            schemaCreate: false,
            dropSchema: true,
        });
        await Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const typeormMetadataTableName = "typeorm_metadata";
            const hasMetadataTable = await queryRunner.hasTable(typeormMetadataTableName);
            (0, chai_1.expect)(hasMetadataTable).to.be.false;
            await connection.runMigrations();
            const hasPostMigrationMetadataTable = await queryRunner.hasTable(typeormMetadataTableName);
            (0, chai_1.expect)(hasPostMigrationMetadataTable).to.be.true;
        }));
    });
    it("should not create typeorm_metadata table when running migrations if there are no views", async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entities/Foo{.js,.ts}"],
            migrations: [__dirname + "/migrations/WithoutView{.js,.ts}"],
            enabledDrivers: ["mysql", "mariadb"],
            schemaCreate: false,
            dropSchema: true,
        });
        await Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const typeormMetadataTableName = "typeorm_metadata";
            const hasMetadataTable = await queryRunner.hasTable(typeormMetadataTableName);
            (0, chai_1.expect)(hasMetadataTable).to.be.false;
            await connection.runMigrations();
            const hasPostMigrationMetadataTable = await queryRunner.hasTable(typeormMetadataTableName);
            (0, chai_1.expect)(hasPostMigrationMetadataTable).to.be.false;
        }));
    });
});
//# sourceMappingURL=issue-4956.js.map