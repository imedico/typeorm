"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const DriverUtils_1 = require("../../../../src/driver/DriverUtils");
describe("transaction > transaction with load many", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres", "mariadb", "mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should loadMany in same transaction with same query runner", () => Promise.all(connections.map(async (connection) => {
        let acquireCount = 0;
        const driver = connection.driver;
        if (DriverUtils_1.DriverUtils.isMySQLFamily(driver)) {
            const pool = driver.pool;
            pool.on("acquire", () => acquireCount++);
        }
        else if (driver.options.type === "postgres") {
            const pool = driver.master;
            pool.on("acquire", () => acquireCount++);
        }
        await connection.manager.transaction(async (entityManager) => {
            await entityManager
                .createQueryBuilder()
                .relation(Post_1.Post, "categories")
                .of(1)
                .loadMany();
            (0, chai_1.expect)(acquireCount).to.be.eq(1);
        });
    })));
});
//# sourceMappingURL=transaction-load-many.js.map