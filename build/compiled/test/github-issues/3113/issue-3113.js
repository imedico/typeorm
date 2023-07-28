"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entities/User");
const chai_1 = require("chai");
describe("github issues > #9316 specify how should interpret null and undefined values in conditions ", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [User_1.User],
            enabledDrivers: ["postgres", "mysql"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should find users what money is not null and money is more than 10 and money is less than 100", async () => {
        await Promise.all(dataSources.map(async (dataSource) => {
            const foo = new User_1.User();
            foo.name = "Foo";
            foo.money = null;
            const john = new User_1.User();
            john.name = "John";
            john.money = 11;
            const jane = new User_1.User();
            jane.name = "Jane";
            jane.money = 90;
            const bar = new User_1.User();
            bar.name = "Bar";
            bar.money = 101;
            await dataSource.manager.save([foo, john, jane, bar]);
            const users = await dataSource.manager.find(User_1.User, {
                where: {
                    money: (0, src_1.And)((0, src_1.Not)((0, src_1.IsNull)()), (0, src_1.MoreThan)(10), (0, src_1.LessThan)(100)),
                },
            });
            // assert users
            (0, chai_1.expect)(users).to.have.length(2);
            (0, chai_1.expect)(users.find((user) => user.name === "John")).to.be.not
                .undefined;
            (0, chai_1.expect)(users.find((user) => user.name === "Jane")).to.be.not
                .undefined;
        }));
    });
});
//# sourceMappingURL=issue-3113.js.map