"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
const test_utils_1 = require("../../utils/test-utils");
const url_1 = require("url");
describe("github issues > #5762 `Using URL as a rich column type breaks", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [User_1.User],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should allow assigning URL as a field value", () => Promise.all(connections.map(async (connection) => {
        const userRepository = connection.getRepository(User_1.User);
        const url = new url_1.URL("https://typeorm.io");
        const user = new User_1.User();
        user.id = 1;
        user.url = url;
        const promise = userRepository.save(user);
        return (0, chai_1.expect)(promise)
            .to.eventually.be.deep.equal(user)
            .and.to.have.property("url")
            .be.instanceOf(url_1.URL)
            .and.to.have.nested.property("href")
            .equal(url.href);
    })));
});
//# sourceMappingURL=issue-5762.js.map