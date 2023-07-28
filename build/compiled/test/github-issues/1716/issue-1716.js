"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const pgEntity_1 = require("./entity/pgEntity");
const mysqlEntity_1 = require("./entity/mysqlEntity");
const mariadbEntity_1 = require("./entity/mariadbEntity");
const mssqlEntity_1 = require("./entity/mssqlEntity");
const toISOString = (input) => new Date(input).toISOString();
const convertPropsToISOStrings = (obj, props) => {
    props.map((prop) => {
        obj[prop] = toISOString(obj[prop]);
    });
};
const isDriverEnabled = (driver) => {
    const ormConfigConnectionOptionsArray = (0, test_utils_1.getTypeOrmConfig)();
    const config = ormConfigConnectionOptionsArray.find((options) => options.name === driver);
    return config && !config.skip;
};
describe("github issues > #1716 send timestamp to database without converting it into UTC", () => {
    describe("postgres", async () => {
        if (!isDriverEnabled("postgres")) {
            return;
        }
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [pgEntity_1.PgEntity],
                schemaCreate: true,
                dropSchema: true,
                enabledDrivers: ["postgres"],
            });
            for (const connection of connections) {
                if (connection.driver.options.type === "postgres") {
                    // We want to have UTC as timezone
                    await connection.query("SET TIME ZONE 'UTC';");
                }
            }
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should persist dates and times correctly", async () => {
            const manager = connections[0].manager;
            await manager.save(pgEntity_1.PgEntity, {
                id: 1,
                fieldTime: "14:00:00+05",
                fieldTimeWithTZ: "14:00:00+05",
                fieldTimeWithoutTZ: "14:00:00+05",
                fieldTimestamp: "2018-03-07 14:00:00+05",
                fieldTimestampWithoutTZ: "2018-03-07 14:00:00+05",
                fieldTimestampWithTZ: "2018-03-07 14:00:00+05",
            });
            const result1 = await manager.findOneBy(pgEntity_1.PgEntity, {
                id: 1,
            });
            convertPropsToISOStrings(result1, [
                "fieldTimestamp",
                "fieldTimestampWithoutTZ",
                "fieldTimestampWithTZ",
            ]);
            (0, chai_1.expect)(result1).to.deep.equal({
                id: 1,
                fieldTime: "14:00:00",
                fieldTimeWithTZ: "14:00:00+05",
                fieldTimeWithoutTZ: "14:00:00",
                fieldTimestamp: toISOString("2018-03-07 14:00:00+05"),
                fieldTimestampWithoutTZ: toISOString("2018-03-07 14:00:00+05"),
                fieldTimestampWithTZ: toISOString("2018-03-07 14:00:00+05"),
            });
            await manager.save(pgEntity_1.PgEntity, {
                id: 2,
                fieldTime: "17:00:00",
                fieldTimeWithTZ: "17:00:00",
                fieldTimeWithoutTZ: "17:00:00",
                fieldTimestamp: "2018-03-07 17:00:00",
                fieldTimestampWithoutTZ: "2018-03-07 17:00:00",
                fieldTimestampWithTZ: "2018-03-07 17:00:00",
            });
            const result2 = await manager.findOneBy(pgEntity_1.PgEntity, {
                id: 2,
            });
            convertPropsToISOStrings(result2, [
                "fieldTimestamp",
                "fieldTimestampWithoutTZ",
                "fieldTimestampWithTZ",
            ]);
            (0, chai_1.expect)(result2).to.deep.equal({
                id: 2,
                fieldTime: "17:00:00",
                fieldTimeWithTZ: "17:00:00+00",
                fieldTimeWithoutTZ: "17:00:00",
                fieldTimestamp: toISOString("2018-03-07 17:00:00"),
                fieldTimestampWithoutTZ: toISOString("2018-03-07 17:00:00"),
                fieldTimestampWithTZ: toISOString("2018-03-07 17:00:00"),
            });
        });
    });
    describe("mysql", async () => {
        if (!isDriverEnabled("mysql")) {
            return;
        }
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [mysqlEntity_1.MysqlEntity],
                schemaCreate: true,
                dropSchema: true,
                enabledDrivers: ["mysql"],
            });
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should persist dates and times correctly", async () => {
            const manager = connections[0].manager;
            await manager.save(mysqlEntity_1.MysqlEntity, {
                id: 1,
                fieldTime: "14:00:00",
                fieldTimestamp: "2018-03-07 14:00:00+05",
                fieldDatetime: "2018-03-07 14:00:00+05",
            });
            const result1 = await manager.findOneBy(mysqlEntity_1.MysqlEntity, {
                id: 1,
            });
            convertPropsToISOStrings(result1, [
                "fieldTimestamp",
                "fieldDatetime",
            ]);
            (0, chai_1.expect)(result1).to.deep.equal({
                id: 1,
                fieldTime: "14:00:00",
                fieldTimestamp: toISOString("2018-03-07 14:00:00+05"),
                fieldDatetime: toISOString("2018-03-07 14:00:00+05"),
            });
            await manager.save(mysqlEntity_1.MysqlEntity, {
                id: 2,
                fieldTime: "17:00:00",
                fieldTimestamp: "2018-03-07 17:00:00",
                fieldDatetime: "2018-03-07 17:00:00",
            });
            const result2 = await manager.findOneBy(mysqlEntity_1.MysqlEntity, {
                id: 2,
            });
            convertPropsToISOStrings(result2, [
                "fieldTimestamp",
                "fieldDatetime",
            ]);
            (0, chai_1.expect)(result2).to.deep.equal({
                id: 2,
                fieldTime: "17:00:00",
                fieldTimestamp: toISOString("2018-03-07 17:00:00"),
                fieldDatetime: toISOString("2018-03-07 17:00:00"),
            });
        });
    });
    describe("mariadb", async () => {
        if (!isDriverEnabled("mariadb")) {
            return;
        }
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [mariadbEntity_1.MariadbEntity],
                schemaCreate: true,
                dropSchema: true,
                enabledDrivers: ["mariadb"],
            });
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should persist dates and times correctly", async () => {
            const manager = connections[0].manager;
            await manager.save(mariadbEntity_1.MariadbEntity, {
                id: 1,
                fieldTime: "14:00:00",
                fieldTimestamp: "2018-03-07 14:00:00+05",
                fieldDatetime: "2018-03-07 14:00:00+05",
            });
            const result1 = await manager.findOneBy(mariadbEntity_1.MariadbEntity, {
                id: 1,
            });
            convertPropsToISOStrings(result1, [
                "fieldTimestamp",
                "fieldDatetime",
            ]);
            (0, chai_1.expect)(result1).to.deep.equal({
                id: 1,
                fieldTime: "14:00:00",
                fieldTimestamp: toISOString("2018-03-07 14:00:00+05"),
                fieldDatetime: toISOString("2018-03-07 14:00:00+05"),
            });
            await manager.save(mariadbEntity_1.MariadbEntity, {
                id: 2,
                fieldTime: "17:00:00",
                fieldTimestamp: "2018-03-07 17:00:00",
                fieldDatetime: "2018-03-07 17:00:00",
            });
            const result2 = await manager.findOneBy(mariadbEntity_1.MariadbEntity, {
                id: 2,
            });
            convertPropsToISOStrings(result2, [
                "fieldTimestamp",
                "fieldDatetime",
            ]);
            (0, chai_1.expect)(result2).to.deep.equal({
                id: 2,
                fieldTime: "17:00:00",
                fieldTimestamp: toISOString("2018-03-07 17:00:00"),
                fieldDatetime: toISOString("2018-03-07 17:00:00"),
            });
        });
    });
    describe("mssql", async () => {
        if (!isDriverEnabled("mssql")) {
            return;
        }
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [mssqlEntity_1.MssqlEntity],
                schemaCreate: true,
                dropSchema: true,
                enabledDrivers: ["mssql"],
            });
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should persist dates and times correctly", async () => {
            const manager = connections[0].manager;
            await manager.save(mssqlEntity_1.MssqlEntity, {
                id: 1,
                fieldTime: "14:00:00",
                fieldDatetime: "2018-03-07 14:00:00+05",
                fieldDatetime2: "2018-03-07 14:00:00+05",
                fieldDatetimeoffset: "2018-03-07 14:00:00+05",
            });
            const result1 = await manager.findOneBy(mssqlEntity_1.MssqlEntity, {
                id: 1,
            });
            convertPropsToISOStrings(result1, [
                "fieldDatetime",
                "fieldDatetime2",
                "fieldDatetimeoffset",
            ]);
            (0, chai_1.expect)(result1).to.deep.equal({
                id: 1,
                fieldTime: "14:00:00",
                fieldDatetime: toISOString("2018-03-07 14:00:00+05"),
                fieldDatetime2: toISOString("2018-03-07 14:00:00+05"),
                fieldDatetimeoffset: toISOString("2018-03-07 14:00:00+05"),
            });
            await manager.save(mssqlEntity_1.MssqlEntity, {
                id: 2,
                fieldTime: "17:00:00",
                fieldDatetime: "2018-03-07 17:00:00",
                fieldDatetime2: "2018-03-07 17:00:00",
                fieldDatetimeoffset: "2018-03-07 17:00:00",
            });
            const result2 = await manager.findOneBy(mssqlEntity_1.MssqlEntity, {
                id: 2,
            });
            convertPropsToISOStrings(result2, [
                "fieldDatetime",
                "fieldDatetime2",
                "fieldDatetimeoffset",
            ]);
            (0, chai_1.expect)(result2).to.deep.equal({
                id: 2,
                fieldTime: "17:00:00",
                fieldDatetime: toISOString("2018-03-07 17:00:00"),
                fieldDatetime2: toISOString("2018-03-07 17:00:00"),
                fieldDatetimeoffset: toISOString("2018-03-07 17:00:00"),
            });
        });
    });
});
//# sourceMappingURL=issue-1716.js.map