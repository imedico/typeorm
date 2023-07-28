"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Photo_1 = require("./entity/Photo");
const User_1 = require("./entity/User");
const getCurrentTimestamp = async () => {
    // give some time to simulate dataset modifications
    await (0, test_utils_1.sleep)(100);
    const timestamp = new Date();
    await (0, test_utils_1.sleep)(100);
    return timestamp;
};
describe("github issues > #4646 add support for temporal (system-versioned) table", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            dropSchema: true,
            enabledDrivers: ["mariadb", "mssql"],
            entities: [Photo_1.Photo, User_1.User],
            schemaCreate: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should check new find methods from the BaseEntity class", async () => {
        // this test has to run serial because class User exists only once
        for (const dataSource of dataSources) {
            User_1.User.useDataSource(dataSource);
            const user = new User_1.User();
            user.id = 1;
            user.name = "foo";
            await dataSource.manager.save(user);
            const timestamp = await getCurrentTimestamp();
            let result = await User_1.User.findOneBy({ id: 1 });
            (0, chai_1.expect)(result === null || result === void 0 ? void 0 : result.name).to.be.equal("foo");
            user.name = "bar";
            await dataSource.manager.save(user);
            result = await User_1.User.findOneBy({ id: 1 });
            (0, chai_1.expect)(result === null || result === void 0 ? void 0 : result.name).to.be.equal("bar");
            result = await User_1.User.findOneAt(timestamp, { where: { id: 1 } });
            (0, chai_1.expect)(result === null || result === void 0 ? void 0 : result.name).to.be.equal("foo");
            let users = await User_1.User.findAt(timestamp);
            (0, chai_1.expect)(users[0].name).to.be.eql("foo");
            users = await User_1.User.findAt(timestamp, { where: { id: 1 } });
            (0, chai_1.expect)(users[0].name).to.be.eql("foo");
            await user.remove();
        }
    });
    it("should check new find methods from the Repository class", () => Promise.all(dataSources.map(async ({ manager }) => {
        const repository = manager.getRepository(User_1.User);
        const user = new User_1.User();
        user.id = 1;
        user.name = "foo";
        await manager.save(user);
        const timestamp = await getCurrentTimestamp();
        let result = await repository.findOneBy({ id: 1 });
        (0, chai_1.expect)(result === null || result === void 0 ? void 0 : result.name).to.be.equal("foo");
        user.name = "bar";
        await manager.save(user);
        result = await repository.findOne({ where: { id: 1 } });
        (0, chai_1.expect)(result === null || result === void 0 ? void 0 : result.name).to.be.equal("bar");
        // check user name from the history
        let users = await repository.findAt(timestamp);
        (0, chai_1.expect)(users[0].name).to.be.eql("foo");
        users = await repository.findAt(timestamp, { where: { id: 1 } });
        (0, chai_1.expect)(users[0].name).to.be.eql("foo");
        result = await repository.findOneAt(timestamp, {
            where: { id: 1 },
        });
        (0, chai_1.expect)(result === null || result === void 0 ? void 0 : result.name).to.be.equal("foo");
        await repository.delete(1);
    })));
    it("should get deleted datasets from the temporal tables (history)", () => Promise.all(dataSources.map(async ({ manager }) => {
        const repository = manager.getRepository(User_1.User);
        const userOne = new User_1.User();
        userOne.id = 1;
        userOne.name = "foo";
        await manager.save(userOne);
        const userTwo = new User_1.User();
        userTwo.id = 2;
        userTwo.name = "bar";
        await manager.save(userTwo);
        const timestamp = await getCurrentTimestamp();
        let results = await repository.find();
        (0, chai_1.expect)(results).to.have.length(2);
        await repository.delete(2);
        results = await repository.find();
        (0, chai_1.expect)(results).to.have.length(1);
        results = await repository.findAt(timestamp);
        (0, chai_1.expect)(results).to.have.length(2);
        await repository.delete(1);
    })));
    it("should ignore internal columns (row_start, row_end) which are used for temporal tables", () => Promise.all(dataSources.map(async (dataSource) => {
        await dataSource.runMigrations();
        const sqlInMemory = await dataSource.driver
            .createSchemaBuilder()
            .log();
        (0, chai_1.expect)(sqlInMemory.upQueries).to.have.length(0);
        (0, chai_1.expect)(sqlInMemory.downQueries).to.have.length(0);
    })));
});
//# sourceMappingURL=issue-4646.js.map