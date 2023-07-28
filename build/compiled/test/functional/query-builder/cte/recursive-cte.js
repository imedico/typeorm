"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const helpers_1 = require("./helpers");
describe("query builder > cte > recursive", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work with simple recursive query", () => Promise.all(connections
        .filter((0, helpers_1.filterByCteCapabilities)("enabled"))
        .map(async (connection) => {
        // CTE cannot reference itself in Spanner
        if (connection.options.type === "spanner")
            return;
        const qb = await connection
            .createQueryBuilder()
            .select([])
            .from("cte", "cte")
            .addCommonTableExpression(`
                    SELECT 1
                    UNION ALL
                    SELECT cte.foo + 1
                    FROM cte
                    WHERE cte.foo < 10
                `, "cte", { recursive: true, columnNames: ["foo"] })
            .addSelect("cte.foo", "foo")
            .getRawMany();
        (0, chai_1.expect)(qb).to.have.length(10);
    })));
});
//# sourceMappingURL=recursive-cte.js.map