"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const user_1 = require("./entity/user");
describe("github issues > #966 Inheritance in embeddables", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should save and load Superclass fields in embeddable", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(user_1.User);
        const info = new user_1.UserInfo();
        info.firstName = "Ed";
        info.lastName = "Edd";
        info.userName = "Eddy";
        info.address = "github.com";
        const user = new user_1.User();
        user.info = info;
        await repository.save(user);
        const loadedUser = await repository.findOneBy({
            id: user.id,
        });
        (0, chai_1.expect)(info).to.deep.equal(loadedUser.info);
    })));
});
//# sourceMappingURL=issue-966.js.map