"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const TestEntity_1 = require("./entity/TestEntity");
describe('github issues > #9341 "bigNumberStrings:false" is not working for postgres', () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
        driverSpecific: {
            parseInt8: true,
        },
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should fetch big int as number not string when using parseInt8=true", async () => {
        for (const connection of connections) {
            const origin = await connection.getRepository(TestEntity_1.TestEntity).save({
                big_int: Number.MAX_SAFE_INTEGER,
                big_decimal: 1.23456789,
            });
            const result = await connection.getRepository(TestEntity_1.TestEntity).findOne({
                where: { id: origin.id },
            });
            // count also returns bigint (as string by default)
            const [{ count }] = await connection.query(`select count(*) from (VALUES (1), (2), (3)) as tmp`);
            // big int should be number
            (0, chai_1.expect)(typeof (result === null || result === void 0 ? void 0 : result.big_int)).to.eq("number");
            (0, chai_1.expect)(result === null || result === void 0 ? void 0 : result.big_int).to.eq(Number.MAX_SAFE_INTEGER);
            // big decimal should remain string, only int8 is parsed
            (0, chai_1.expect)(typeof (result === null || result === void 0 ? void 0 : result.big_decimal)).to.eq("string");
            (0, chai_1.expect)(result === null || result === void 0 ? void 0 : result.big_decimal).to.eq("1.23456789");
            // count should be number (it is int8)
            (0, chai_1.expect)(typeof count).to.eq("number");
            (0, chai_1.expect)(count).to.eq(3);
        }
    });
});
//# sourceMappingURL=issue-9341.js.map