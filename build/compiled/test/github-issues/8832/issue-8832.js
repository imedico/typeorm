"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const index_1 = require("../../../src/index");
const chai_1 = require("chai");
const User_1 = require("../8832/entity/User");
const Address_1 = require("./entity/Address");
const ConnectionMetadataBuilder_1 = require("../../../src/connection/ConnectionMetadataBuilder");
const EntityMetadataValidator_1 = require("../../../src/metadata-builder/EntityMetadataValidator");
const UuidEntity_1 = require("./entity/UuidEntity");
describe("github issues > #8832 Add uuid, inet4, and inet6 types for mariadb", () => {
    let connections;
    afterEach(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("basic use of new maria db types", () => {
        const newUser = {
            uuid: "ceb2897c-a1cf-11ed-8dbd-040300000000",
            inet4: "192.0.2.146",
            inet6: "2001:0db8:0000:0000:0000:ff00:0042:8329",
        };
        const expectedInet6 = "2001:db8::ff00:42:8329";
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["mariadb"],
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        it("should create table with uuid, inet4, and inet6 type set to column for relevant mariadb versions", () => Promise.all(connections.map(async (connection) => {
            const userRepository = connection.getRepository(User_1.User);
            // seems there is an issue with the persisting id that crosses over from mysql to mariadb
            await userRepository.save(newUser);
            const savedUser = await userRepository.findOneOrFail({
                where: { uuid: newUser.uuid },
            });
            const foundUser = await userRepository.findOne({
                where: { id: savedUser.id },
            });
            (0, chai_1.expect)(foundUser).to.not.be.null;
            (0, chai_1.expect)(foundUser.uuid).to.deep.equal(newUser.uuid);
            (0, chai_1.expect)(foundUser.inet4).to.deep.equal(newUser.inet4);
            (0, chai_1.expect)(foundUser.inet6).to.deep.equal(expectedInet6);
            (0, chai_1.expect)(foundUser.another_uuid_field).to.not.be.undefined;
            const columnTypes = await connection.query(`
                        SELECT 
                            COLUMN_NAME,
                            DATA_TYPE 
                        FROM INFORMATION_SCHEMA.COLUMNS 
                        WHERE
                            TABLE_SCHEMA = ?
                            AND TABLE_NAME = ? 
                            AND COLUMN_NAME IN (?, ?, ?, ?)
                    `, [
                connection.driver.database,
                "user",
                "id",
                "uuid",
                "inet4",
                "inet6",
                "anotherUuid",
            ]);
            const expectedColumnTypes = {
                id: "uuid",
                uuid: "uuid",
                inet4: "inet4",
                inet6: "inet6",
                another_uuid_field: "uuid",
            };
            columnTypes.forEach(({ COLUMN_NAME, DATA_TYPE }) => {
                (0, chai_1.expect)(DATA_TYPE).to.equal(expectedColumnTypes[COLUMN_NAME]);
            });
            // save a relation
            const addressRepository = connection.getRepository(Address_1.Address);
            const newAddress = {
                city: "Codersville",
                state: "Coderado",
                user: foundUser,
            };
            await addressRepository.save(newAddress);
            const foundAddress = await addressRepository.findOne({
                where: { user: { id: foundUser.id } },
            });
            (0, chai_1.expect)(foundAddress).to.not.be.null;
        })));
    });
    describe("regression test mysql uuid generation", () => {
        const uuidEntity = {
            id: "ceb2897c-a1cf-11ed-8dbd-040300000000",
        };
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [UuidEntity_1.UuidEntity],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["mysql", "mariadb"],
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        it("should create table with with varchar with length 36 when version is mysql", () => Promise.all(connections.map(async (connection) => {
            const uuidRepository = connection.getRepository(UuidEntity_1.UuidEntity);
            // seems there is an issue with the persisting id that crosses over from mysql to mariadb
            await uuidRepository.save(uuidEntity);
            const columnTypes = await connection.query(`
                    SELECT 
                        DATA_TYPE,
                        CHARACTER_MAXIMUM_LENGTH
                    FROM INFORMATION_SCHEMA.COLUMNS 
                    WHERE
                        TABLE_SCHEMA = ?
                        AND TABLE_NAME = ? 
                        AND COLUMN_NAME = ?
                `, [connection.driver.database, "UuidEntity", "id"]);
            const isMysql = connection.driver.options.type === "mysql";
            const expectedType = isMysql ? "varchar" : "uuid";
            const expectedLength = isMysql ? "36" : null;
            columnTypes.forEach(({ DATA_TYPE, CHARACTER_MAXIMUM_LENGTH }) => {
                (0, chai_1.expect)(DATA_TYPE).to.equal(expectedType);
                (0, chai_1.expect)(CHARACTER_MAXIMUM_LENGTH).to.equal(expectedLength);
            });
        })));
    });
    describe("entity-metadata-validator", () => {
        it("should throw error if mariadb uuid is supported and length is provided to property", async () => {
            Promise.all(["BadInet4", "BadInet6", "BadUuid"].map(async (entity) => {
                const entityLocation = `${__dirname}/badEntity/${entity}{.js,.ts}"`;
                const connection = new index_1.DataSource({
                    // dummy connection options, connection won't be established anyway
                    type: "mariadb",
                    host: "localhost",
                    username: "test",
                    password: "test",
                    database: "test",
                    entities: [entityLocation],
                });
                // version supports all the new types
                connection.driver.version = "10.10.0";
                const connectionMetadataBuilder = new ConnectionMetadataBuilder_1.ConnectionMetadataBuilder(connection);
                const entityMetadatas = await connectionMetadataBuilder.buildEntityMetadatas([
                    entityLocation,
                ]);
                const entityMetadataValidator = new EntityMetadataValidator_1.EntityMetadataValidator();
                (0, chai_1.expect)(() => entityMetadataValidator.validateMany(entityMetadatas, connection.driver)).to.throw(Error);
            }));
        });
        it("should not throw error for mysql when uuid is provided and a length property is provided", async () => {
            Promise.all(["BadInet4", "BadInet6", "BadUuid"].map(async (entity) => {
                const entityLocation = `${__dirname}/badEntity/${entity}{.js,.ts}"`;
                const connection = new index_1.DataSource({
                    // dummy connection options, connection won't be established anyway
                    type: "mysql",
                    host: "localhost",
                    username: "test",
                    password: "test",
                    database: "test",
                    entities: [entityLocation],
                });
                // version supports all the new types
                connection.driver.version = "10.10.0";
                const connectionMetadataBuilder = new ConnectionMetadataBuilder_1.ConnectionMetadataBuilder(connection);
                const entityMetadatas = await connectionMetadataBuilder.buildEntityMetadatas([
                    entityLocation,
                ]);
                const entityMetadataValidator = new EntityMetadataValidator_1.EntityMetadataValidator();
                (0, chai_1.expect)(() => entityMetadataValidator.validateMany(entityMetadatas, connection.driver)).not.to.throw();
            }));
        });
    });
});
//# sourceMappingURL=issue-8832.js.map