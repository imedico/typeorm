"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ForeignKeyMetadata_1 = require("../../../src/metadata/ForeignKeyMetadata");
const test_utils_1 = require("../../utils/test-utils");
const Album_1 = require("./entity/Album");
const Photo_1 = require("./entity/Photo");
describe("schema builder > custom-db-and-schema-sync", () => {
    describe("custom database", () => {
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [Album_1.Album, Photo_1.Photo],
                enabledDrivers: ["mysql"],
                dropSchema: true,
            });
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should correctly sync tables with custom schema and database", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const photoMetadata = connection.getMetadata("photo");
            const albumMetadata = connection.getMetadata("album");
            // create tables
            photoMetadata.synchronize = true;
            albumMetadata.synchronize = true;
            photoMetadata.database = "secondDB";
            photoMetadata.tablePath = "secondDB.photo";
            albumMetadata.database = "secondDB";
            albumMetadata.tablePath = "secondDB.album";
            await queryRunner.createDatabase(photoMetadata.database, true);
            await connection.synchronize();
            // create foreign key
            let albumTable = await queryRunner.getTable(albumMetadata.tablePath);
            let photoTable = await queryRunner.getTable(photoMetadata.tablePath);
            albumTable.should.be.exist;
            photoTable.should.be.exist;
            const columns = photoMetadata.columns.filter((column) => column.propertyName === "albumId");
            const referencedColumns = albumMetadata.columns.filter((column) => column.propertyName === "id");
            const fkMetadata = new ForeignKeyMetadata_1.ForeignKeyMetadata({
                entityMetadata: photoMetadata,
                referencedEntityMetadata: albumMetadata,
                columns: columns,
                referencedColumns: referencedColumns,
                namingStrategy: connection.namingStrategy,
            });
            photoMetadata.foreignKeys.push(fkMetadata);
            await connection.synchronize();
            photoTable = await queryRunner.getTable(photoMetadata.tablePath);
            photoTable.foreignKeys.length.should.be.equal(1);
            // drop foreign key
            photoMetadata.foreignKeys = [];
            await connection.synchronize();
            // drop tables manually, because they will not synchronize automatically
            await queryRunner.dropTable(photoMetadata.tablePath, true, false);
            await queryRunner.dropTable(albumMetadata.tablePath, true, false);
            // drop created database
            await queryRunner.dropDatabase("secondDB", true);
            await queryRunner.release();
        })));
    });
    describe("custom schema", () => {
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                enabledDrivers: ["postgres", "sap"],
                entities: [Album_1.Album, Photo_1.Photo],
                dropSchema: true,
            });
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should correctly sync tables with custom schema", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const photoMetadata = connection.getMetadata("photo");
            const albumMetadata = connection.getMetadata("album");
            // create tables
            photoMetadata.synchronize = true;
            albumMetadata.synchronize = true;
            photoMetadata.schema = "photo-schema";
            photoMetadata.tablePath = "photo-schema.photo";
            albumMetadata.schema = "album-schema";
            albumMetadata.tablePath = "album-schema.album";
            await queryRunner.createSchema(photoMetadata.schema, true);
            await queryRunner.createSchema(albumMetadata.schema, true);
            await connection.synchronize();
            // create foreign key
            let albumTable = await queryRunner.getTable(albumMetadata.tablePath);
            let photoTable = await queryRunner.getTable(photoMetadata.tablePath);
            albumTable.should.be.exist;
            photoTable.should.be.exist;
            const columns = photoMetadata.columns.filter((column) => column.propertyName === "albumId");
            const referencedColumns = albumMetadata.columns.filter((column) => column.propertyName === "id");
            const fkMetadata = new ForeignKeyMetadata_1.ForeignKeyMetadata({
                entityMetadata: photoMetadata,
                referencedEntityMetadata: albumMetadata,
                columns: columns,
                referencedColumns: referencedColumns,
                namingStrategy: connection.namingStrategy,
            });
            photoMetadata.foreignKeys.push(fkMetadata);
            await connection.synchronize();
            photoTable = await queryRunner.getTable(photoMetadata.tablePath);
            photoTable.foreignKeys.length.should.be.equal(1);
            // drop foreign key
            photoMetadata.foreignKeys = [];
            await connection.synchronize();
            // drop tables manually, because they will not synchronize automatically
            await queryRunner.dropTable(photoMetadata.tablePath, true, false);
            await queryRunner.dropTable(albumMetadata.tablePath, true, false);
            // drop created database
            await queryRunner.dropDatabase("secondDB", true);
            await queryRunner.release();
        })));
        it("should correctly sync tables with `public` schema", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const photoMetadata = connection.getMetadata("photo");
            const albumMetadata = connection.getMetadata("album");
            // create tables
            photoMetadata.synchronize = true;
            albumMetadata.synchronize = true;
            photoMetadata.schema = "public";
            photoMetadata.tablePath = "photo";
            albumMetadata.schema = "public";
            albumMetadata.tablePath = "album";
            await queryRunner.createSchema(photoMetadata.schema, true);
            await queryRunner.createSchema(albumMetadata.schema, true);
            await connection.synchronize();
            // create foreign key
            let albumTable = await queryRunner.getTable(albumMetadata.tablePath);
            let photoTable = await queryRunner.getTable(photoMetadata.tablePath);
            albumTable.should.be.exist;
            photoTable.should.be.exist;
            photoTable.foreignKeys.length.should.be.equal(0);
            const columns = photoMetadata.columns.filter((column) => column.propertyName === "albumId");
            const referencedColumns = albumMetadata.columns.filter((column) => column.propertyName === "id");
            const fkMetadata = new ForeignKeyMetadata_1.ForeignKeyMetadata({
                entityMetadata: photoMetadata,
                referencedEntityMetadata: albumMetadata,
                columns: columns,
                referencedColumns: referencedColumns,
                namingStrategy: connection.namingStrategy,
            });
            photoMetadata.foreignKeys.push(fkMetadata);
            await connection.synchronize();
            photoTable = await queryRunner.getTable(photoMetadata.tablePath);
            photoTable.foreignKeys.length.should.be.equal(1);
            // drop foreign key
            photoMetadata.foreignKeys = [];
            await connection.synchronize();
            // drop tables manually, because they will not synchronize automatically
            await queryRunner.dropTable(photoMetadata.tablePath, true, false);
            await queryRunner.dropTable(albumMetadata.tablePath, true, false);
            // drop created database
            await queryRunner.dropDatabase("secondDB", true);
            await queryRunner.release();
        })));
    });
    describe("custom database and schema", () => {
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [Album_1.Album, Photo_1.Photo],
                enabledDrivers: ["mssql"],
                dropSchema: true,
            });
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should correctly sync tables with custom schema and database", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const photoMetadata = connection.getMetadata("photo");
            const albumMetadata = connection.getMetadata("album");
            // create tables
            photoMetadata.synchronize = true;
            albumMetadata.synchronize = true;
            photoMetadata.database = "secondDB";
            photoMetadata.schema = "photo-schema";
            photoMetadata.tablePath = "secondDB.photo-schema.photo";
            const photoMetadataSchemaPath = "secondDB.photo-schema";
            albumMetadata.database = "secondDB";
            albumMetadata.schema = "album-schema";
            albumMetadata.tablePath = "secondDB.album-schema.album";
            const albumMetadataSchemaPath = "secondDB.album-schema";
            await queryRunner.createDatabase(photoMetadata.database, true);
            await queryRunner.createSchema(photoMetadataSchemaPath, true);
            await queryRunner.createSchema(albumMetadataSchemaPath, true);
            await connection.synchronize();
            // create foreign key
            let albumTable = await queryRunner.getTable(albumMetadata.tablePath);
            let photoTable = await queryRunner.getTable(photoMetadata.tablePath);
            albumTable.should.be.exist;
            photoTable.should.be.exist;
            const columns = photoMetadata.columns.filter((column) => column.propertyName === "albumId");
            const referencedColumns = albumMetadata.columns.filter((column) => column.propertyName === "id");
            const fkMetadata = new ForeignKeyMetadata_1.ForeignKeyMetadata({
                entityMetadata: photoMetadata,
                referencedEntityMetadata: albumMetadata,
                columns: columns,
                referencedColumns: referencedColumns,
                namingStrategy: connection.namingStrategy,
            });
            photoMetadata.foreignKeys.push(fkMetadata);
            await connection.synchronize();
            photoTable = await queryRunner.getTable(photoMetadata.tablePath);
            photoTable.foreignKeys.length.should.be.equal(1);
            // drop foreign key
            photoMetadata.foreignKeys = [];
            await connection.synchronize();
            // drop tables manually, because they will not synchronize automatically
            await queryRunner.dropTable(photoMetadata.tablePath, true, false);
            await queryRunner.dropTable(albumMetadata.tablePath, true, false);
            // drop created database
            await queryRunner.dropDatabase("secondDB", true);
            await queryRunner.release();
        })));
    });
});
//# sourceMappingURL=custom-db-and-schema-sync.js.map