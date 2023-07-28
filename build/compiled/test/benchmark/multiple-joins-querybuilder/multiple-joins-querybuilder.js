"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const One_1 = require("./entity/One");
/**
 * This test attempts to benchmark the raw CPU usage/latency of the query builder's
 * SQL string generation. We intentionally don't migrate the database or perform
 * any actual queries.
 */
describe("benchmark > QueryBuilder > wide join", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        __dirname,
        enabledDrivers: ["postgres"],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("testing query builder with join to 10 relations with 10 columns each", () => {
        for (let i = 1; i <= 10000; i++) {
            connections.forEach((connection) => connection.manager
                .createQueryBuilder(One_1.One, "ones")
                .setFindOptions({
                where: { id: 1 },
                relations: {
                    two: true,
                    three: true,
                    four: true,
                    five: true,
                    six: true,
                    seven: true,
                    eight: true,
                    nine: true,
                    ten: true,
                },
            })
                .getQuery());
        }
        /**
         * On a M1 macbook air, 5 runs:
         * 1861ms
         * 1850ms
         * 1859ms
         * 1859ms
         * 1884ms
         */
    });
});
//# sourceMappingURL=multiple-joins-querybuilder.js.map