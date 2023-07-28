"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Plan_1 = require("./entity/Plan");
const Item_1 = require("./entity/Item");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("github issues > #1476 subqueries", () => {
    let connections = [];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: [
            "mysql",
            "mariadb",
            "sqlite",
            "better-sqlite3",
            "sqljs",
        ],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should", () => Promise.all(connections.map(async (connection) => {
        const planRepo = connection.getRepository(Plan_1.Plan);
        const itemRepo = connection.getRepository(Item_1.Item);
        const plan1 = new Plan_1.Plan();
        plan1.planId = 1;
        plan1.planName = "Test";
        await planRepo.save(plan1);
        const item1 = new Item_1.Item();
        item1.itemId = 1;
        item1.planId = 1;
        const item2 = new Item_1.Item();
        item2.itemId = 2;
        item2.planId = 1;
        await itemRepo.save([item1, item2]);
        const plans = await planRepo
            .createQueryBuilder("b")
            .leftJoinAndSelect((subQuery) => {
            return subQuery
                .select(`COUNT("planId")`, `total`)
                .addSelect(`planId`)
                .from(Item_1.Item, "items")
                .groupBy(`items.planId`);
        }, "i", `i.planId = b.planId`)
            .getRawMany();
        (0, chai_1.expect)(plans).to.not.be.undefined;
        const plan = plans[0];
        (0, chai_1.expect)(plan.b_planId).to.be.equal(1);
        (0, chai_1.expect)(plan.b_planName).to.be.equal("Test");
        (0, chai_1.expect)(plan.planId).to.be.equal(1);
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            (0, chai_1.expect)(plan.total).to.be.equal("2");
        }
        else {
            (0, chai_1.expect)(plan.total).to.be.equal(2);
        }
    })));
});
//# sourceMappingURL=issue-1476.js.map