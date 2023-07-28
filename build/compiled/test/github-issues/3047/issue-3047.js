"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("github issues > #3047 Mysqsl on duplicate key update use current values", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.User],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    let user1 = new User_1.User();
    user1.first_name = "John";
    user1.last_name = "Lenon";
    user1.is_updated = "no";
    let user2 = new User_1.User();
    user2.first_name = "John";
    user2.last_name = "Lenon";
    user2.is_updated = "yes";
    it("should overwrite using current value in MySQL/MariaDB", () => Promise.all(connections.map(async (connection) => {
        try {
            if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
                const UserRepository = connection.manager.getRepository(User_1.User);
                await UserRepository.createQueryBuilder()
                    .insert()
                    .into(User_1.User)
                    .values(user1)
                    .execute();
                await UserRepository.createQueryBuilder()
                    .insert()
                    .into(User_1.User)
                    .values(user2)
                    .orUpdate(["is_updated"])
                    .execute();
                let loadedUser = await UserRepository.find();
                (0, chai_1.expect)(loadedUser).not.to.be.null;
                (0, chai_1.expect)(loadedUser).to.have.lengthOf(1);
                (0, chai_1.expect)(loadedUser[0]).to.includes({ is_updated: "yes" });
            }
        }
        catch (err) {
            throw new Error(err);
        }
    })));
    it("should overwrite using current value in PostgreSQL", () => Promise.all(connections.map(async (connection) => {
        try {
            if (connection.driver.options.type === "postgres") {
                const UserRepository = connection.manager.getRepository(User_1.User);
                await UserRepository.createQueryBuilder()
                    .insert()
                    .into(User_1.User)
                    .values(user1)
                    .execute();
                await UserRepository.createQueryBuilder()
                    .insert()
                    .into(User_1.User)
                    .values(user2)
                    .orUpdate(["is_updated"], ["first_name", "last_name"])
                    .execute();
                let loadedUser = await UserRepository.find();
                (0, chai_1.expect)(loadedUser).not.to.be.null;
                (0, chai_1.expect)(loadedUser).to.have.lengthOf(1);
                (0, chai_1.expect)(loadedUser[0]).to.includes({ is_updated: "yes" });
            }
        }
        catch (err) {
            throw new Error(err);
        }
    })));
});
//# sourceMappingURL=issue-3047.js.map