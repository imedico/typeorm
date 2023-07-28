"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../utils/test-setup");
const chai_1 = require("chai");
const Record_1 = require("./entity/Record");
const test_utils_1 = require("../../../utils/test-utils");
describe("jsonb type", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Record_1.Record],
        enabledDrivers: ["postgres"], // because only postgres supports jsonb type
        // logging: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should make correct schema with Postgres' jsonb type", () => Promise.all(connections.map(async (connection) => {
        await connection.synchronize(true);
        const queryRunner = connection.createQueryRunner();
        let schema = await queryRunner.getTable("record");
        await queryRunner.release();
        (0, chai_1.expect)(schema).not.to.be.undefined;
        (0, chai_1.expect)(schema.columns.find((tableColumn) => tableColumn.name === "config" &&
            tableColumn.type === "json")).to.be.not.empty;
        (0, chai_1.expect)(schema.columns.find((tableColumn) => tableColumn.name === "data" &&
            tableColumn.type === "jsonb")).to.be.not.empty;
        (0, chai_1.expect)(schema.columns.find((tableColumn) => tableColumn.name === "dataWithDefaultObject" &&
            tableColumn.type === "jsonb")).to.be.not.empty;
        (0, chai_1.expect)(schema.columns.find((tableColumn) => tableColumn.name === "dataWithDefaultNull" &&
            tableColumn.type === "jsonb")).to.be.not.empty;
    })));
    it("should persist jsonb correctly", () => Promise.all(connections.map(async (connection) => {
        await connection.synchronize(true);
        let recordRepo = connection.getRepository(Record_1.Record);
        let record = new Record_1.Record();
        record.data = { foo: "bar" };
        let persistedRecord = await recordRepo.save(record);
        let foundRecord = await recordRepo.findOneBy({
            id: persistedRecord.id,
        });
        (0, chai_1.expect)(foundRecord).to.be.not.undefined;
        (0, chai_1.expect)(foundRecord.data.foo).to.eq("bar");
        (0, chai_1.expect)(foundRecord.dataWithDefaultNull).to.be.null;
        (0, chai_1.expect)(foundRecord.dataWithDefaultObject).to.eql({
            hello: "world",
            foo: "bar",
        });
    })));
    it("should persist jsonb string correctly", () => Promise.all(connections.map(async (connection) => {
        let recordRepo = connection.getRepository(Record_1.Record);
        let record = new Record_1.Record();
        record.data = `foo`;
        let persistedRecord = await recordRepo.save(record);
        let foundRecord = await recordRepo.findOneBy({
            id: persistedRecord.id,
        });
        (0, chai_1.expect)(foundRecord).to.be.not.undefined;
        (0, chai_1.expect)(foundRecord.data).to.be.a("string");
        (0, chai_1.expect)(foundRecord.data).to.eq("foo");
    })));
    it("should persist jsonb array correctly", () => Promise.all(connections.map(async (connection) => {
        let recordRepo = connection.getRepository(Record_1.Record);
        let record = new Record_1.Record();
        record.data = [1, `2`, { a: 3 }];
        let persistedRecord = await recordRepo.save(record);
        let foundRecord = await recordRepo.findOneBy({
            id: persistedRecord.id,
        });
        (0, chai_1.expect)(foundRecord).to.be.not.undefined;
        (0, chai_1.expect)(foundRecord.data).to.deep.include.members([
            1,
            "2",
            { a: 3 },
        ]);
    })));
    it("should create updates when changing object", () => Promise.all(connections.map(async (connection) => {
        await connection.query(`ALTER TABLE record ALTER COLUMN "dataWithDefaultObject" SET DEFAULT '{"foo":"baz","hello": "earth"}';`);
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        (0, chai_1.expect)(sqlInMemory.upQueries).not.to.eql([]);
        (0, chai_1.expect)(sqlInMemory.downQueries).not.to.eql([]);
    })));
    it("should not create updates when resorting object", () => Promise.all(connections.map(async (connection) => {
        await connection.query(`ALTER TABLE record ALTER COLUMN "dataWithDefaultObject" SET DEFAULT '{"foo":"bar", "hello": "world"}';`);
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        (0, chai_1.expect)(sqlInMemory.upQueries).to.eql([]);
        (0, chai_1.expect)(sqlInMemory.downQueries).to.eql([]);
    })));
    it("should not create new migrations when everything is equivalent", () => Promise.all(connections.map(async (connection) => {
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        (0, chai_1.expect)(sqlInMemory.upQueries).to.eql([]);
        (0, chai_1.expect)(sqlInMemory.downQueries).to.eql([]);
    })));
});
//# sourceMappingURL=basic-jsonb.test.js.map