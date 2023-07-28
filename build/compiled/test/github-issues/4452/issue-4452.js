"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("github issues > #4452 InsertQueryBuilder fails on some SQL Expressions values", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        // enabledDrivers: ["postgres"],
        entities: [User_1.User],
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to use sql functions", () => Promise.all(connections.map(async (connection) => {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values({
            name: "Ben Dover",
            created_at: connection.driver.options.type === "oracle"
                ? () => "SYSDATE"
                : () => "current_timestamp",
        })
            .execute();
        const loadedUser1 = await connection
            .getRepository(User_1.User)
            .findOneBy({ name: "Ben Dover" });
        (0, chai_1.expect)(loadedUser1).to.exist;
        loadedUser1.created_at.should.be.instanceOf(Date);
    })));
});
//# sourceMappingURL=issue-4452.js.map