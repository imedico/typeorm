"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("custom repository", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.User],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("withRepository must work properly in transactions", () => Promise.all(dataSources.map(async (dataSource) => {
        const CustomRepository = dataSource.getRepository(User_1.User).extend({
            findOneByName(name) {
                return this.findOneBy({ name });
            },
        });
        // check if custom repository function works
        await CustomRepository.save({ name: "Timber Saw" });
        const user = await CustomRepository.findOneByName("Timber Saw");
        (0, chai_1.expect)(user).to.be.eql({
            id: 1,
            name: "Timber Saw",
        });
        // now check it in the transaction
        await dataSource.manager.transaction(async (transactionalManager) => {
            const transactionalCustomRepository = await transactionalManager.withRepository(CustomRepository);
            await transactionalCustomRepository.save({
                name: "Natures Prophet",
            });
            const user = await transactionalCustomRepository.findOneByName("Natures Prophet");
            (0, chai_1.expect)(user).to.be.eql({
                id: 2,
                name: "Natures Prophet",
            });
        });
    })));
});
//# sourceMappingURL=custom-repository.test.js.map