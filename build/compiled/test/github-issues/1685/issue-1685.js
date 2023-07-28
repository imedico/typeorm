"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const year_1 = require("./entity/year");
const month_1 = require("./entity/month");
const user_1 = require("./entity/user");
const user_month_1 = require("./entity/user-month");
describe.skip("github issues > #1685 JoinColumn from JoinColum is not considered when inserting new value", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not fail when inserting a new UserMonth with good PKs from JoinColumn", () => Promise.all(connections.map(async (connection) => {
        const year = new year_1.Year();
        year.yearNo = 2018;
        await connection.manager.save(year);
        const month = new month_1.Month();
        month.year = year;
        month.monthNo = 2;
        month.yearNo = year.yearNo;
        await connection.manager.save(month);
        const user = new user_1.User();
        user.username = "bobs";
        await connection.manager.save(user);
        const userMonth = new user_month_1.UserMonth();
        userMonth.user = user;
        userMonth.month = month;
        try {
            await connection.manager.save(userMonth);
        }
        catch (err) {
            throw new Error("userMonth should be added");
        }
    })));
});
//# sourceMappingURL=issue-1685.js.map