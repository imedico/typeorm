"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
const Test_1 = require("./entity/Test");
const AmbigiousPrimaryKey_1 = require("./entity/AmbigiousPrimaryKey");
describe("query builder > count", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Test_1.Test, AmbigiousPrimaryKey_1.AmbigiousPrimaryKey],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("Count query should of empty table should be 0", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(Test_1.Test);
        const count = await repo.count();
        (0, chai_1.expect)(count).to.be.equal(0);
    })));
    it("Count query should count database values", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(Test_1.Test);
        await repo.save({
            varcharField: "ok",
            uuidField: "123e4567-e89b-12d3-a456-426614174000",
            intField: 4,
        });
        await repo.save({
            varcharField: "ok",
            uuidField: "123e4567-e89b-12d3-a456-426614174001",
            intField: 4,
        });
        const count = await repo.count();
        (0, chai_1.expect)(count).to.be.equal(2);
    })));
    it("Count query should handle ambiguous values", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(AmbigiousPrimaryKey_1.AmbigiousPrimaryKey);
        await repo.save({ a: "A", b: "AAA" });
        await repo.save({ a: "AAA", b: "A" });
        await repo.save({ a: "AA", b: "AA" });
        await repo.save({ a: "BB", b: "BB" });
        await repo.save({ a: "B", b: "BBB" });
        await repo.save({ a: "BBB", b: "B" });
        const count = await repo.count();
        (0, chai_1.expect)(count).to.be.equal(6, connection.name);
    })));
    it("counting joined query should count database values", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(Test_1.Test);
        await repo.save({
            varcharField: "ok",
            uuidField: "123e4567-e89b-12d3-a456-426614174000",
            intField: 4,
        });
        await repo.save({
            varcharField: "ok",
            uuidField: "123e4567-e89b-12d3-a456-426614174001",
            intField: 4,
        });
        const count = await repo
            .createQueryBuilder()
            .from(Test_1.Test, "main")
            .leftJoin(Test_1.Test, "self", "self.intField = main.intField")
            .getCount();
        (0, chai_1.expect)(count).to.be.equal(2);
    })));
    it("counting joined queries should handle ambiguous values", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(AmbigiousPrimaryKey_1.AmbigiousPrimaryKey);
        await repo.save({ a: "A", b: "AAA" });
        await repo.save({ a: "AAA", b: "A" });
        await repo.save({ a: "AA", b: "AA" });
        await repo.save({ a: "BB", b: "BB" });
        await repo.save({ a: "B", b: "BBB" });
        await repo.save({ a: "BBB", b: "B" });
        const count = await repo
            .createQueryBuilder()
            .from(AmbigiousPrimaryKey_1.AmbigiousPrimaryKey, "main")
            .leftJoin(AmbigiousPrimaryKey_1.AmbigiousPrimaryKey, "self", "self.a = main.a")
            .getCount();
        (0, chai_1.expect)(count).to.be.equal(6, connection.name);
    })));
});
//# sourceMappingURL=query-builder-count.js.map