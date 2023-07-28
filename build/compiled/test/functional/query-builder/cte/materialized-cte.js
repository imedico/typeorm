"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const foo_1 = require("./entity/foo");
const helpers_1 = require("./helpers");
describe("query builder > cte > materialized", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        // enabledDrivers: [']
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should allow MATERIALIZED hint", () => Promise.all(connections
        .filter((0, helpers_1.filterByCteCapabilities)("enabled"))
        .filter((0, helpers_1.filterByCteCapabilities)("materializedHint"))
        .map(async (connection) => {
        await connection
            .getRepository(foo_1.Foo)
            .insert([1, 2, 3].map((i) => ({ id: i, bar: String(i) })));
        const cteQuery = connection
            .createQueryBuilder()
            .select()
            .addSelect(`foo.bar`, "bar")
            .from(foo_1.Foo, "foo")
            .where(`foo.bar = :value`, { value: "2" });
        const cteOptions = {
            columnNames: ["raz"],
            materialized: true,
        };
        const cteSelection = "qaz.raz";
        const qb = await connection
            .createQueryBuilder()
            .addCommonTableExpression(cteQuery, "qaz", cteOptions)
            .from("qaz", "qaz")
            .select([])
            .addSelect(cteSelection, "raz");
        (0, chai_1.expect)(qb.getQuery()).to.contain(`WITH "qaz"("raz") AS MATERIALIZED (`);
        (0, chai_1.expect)(await qb.getRawMany()).to.deep.equal([{ raz: "2" }]);
    })));
    it("should allow NOT MATERIALIZED hint", () => Promise.all(connections
        .filter((0, helpers_1.filterByCteCapabilities)("enabled"))
        .filter((0, helpers_1.filterByCteCapabilities)("materializedHint"))
        .map(async (connection) => {
        await connection
            .getRepository(foo_1.Foo)
            .insert([1, 2, 3].map((i) => ({ id: i, bar: String(i) })));
        const cteQuery = connection
            .createQueryBuilder()
            .select()
            .addSelect(`foo.bar`, "bar")
            .from(foo_1.Foo, "foo")
            .where(`foo.bar = :value`, { value: "2" });
        const cteOptions = {
            columnNames: ["raz"],
            materialized: false,
        };
        const cteSelection = "qaz.raz";
        const qb = await connection
            .createQueryBuilder()
            .addCommonTableExpression(cteQuery, "qaz", cteOptions)
            .from("qaz", "qaz")
            .select([])
            .addSelect(cteSelection, "raz");
        (0, chai_1.expect)(qb.getQuery()).to.contain(`WITH "qaz"("raz") AS NOT MATERIALIZED (`);
        (0, chai_1.expect)(await qb.getRawMany()).to.deep.equal([{ raz: "2" }]);
    })));
    it("should omit hint if materialized option is not set", () => Promise.all(connections
        .filter((0, helpers_1.filterByCteCapabilities)("enabled"))
        .filter((0, helpers_1.filterByCteCapabilities)("materializedHint"))
        .map(async (connection) => {
        await connection
            .getRepository(foo_1.Foo)
            .insert([1, 2, 3].map((i) => ({ id: i, bar: String(i) })));
        const cteQuery = connection
            .createQueryBuilder()
            .select()
            .addSelect(`foo.bar`, "bar")
            .from(foo_1.Foo, "foo")
            .where(`foo.bar = :value`, { value: "2" });
        const cteOptions = {
            columnNames: ["raz"],
        };
        const cteSelection = "qaz.raz";
        const qb = await connection
            .createQueryBuilder()
            .addCommonTableExpression(cteQuery, "qaz", cteOptions)
            .from("qaz", "qaz")
            .select([])
            .addSelect(cteSelection, "raz");
        (0, chai_1.expect)(qb.getQuery()).to.contain(`WITH "qaz"("raz") AS (`);
        (0, chai_1.expect)(await qb.getRawMany()).to.deep.equal([{ raz: "2" }]);
    })));
});
//# sourceMappingURL=materialized-cte.js.map