"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
describe("github issues > #3112 default:null should inserts nulls to database", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.User],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert null when no value specified", () => Promise.all(connections.map(async (connection) => {
        const UserRepository = connection.manager.getRepository(User_1.User);
        const user1 = new User_1.User();
        await UserRepository.save(user1);
        const loadedUser = await UserRepository.find();
        (0, chai_1.expect)(loadedUser[0].first).to.be.null;
        (0, chai_1.expect)(loadedUser[0].second).to.be.null;
    })));
});
//# sourceMappingURL=issue-3112.js.map