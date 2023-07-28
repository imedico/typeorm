"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const UserEntity_1 = require("./entity/UserEntity");
const UserToOrganizationEntity_1 = require("./entity/UserToOrganizationEntity");
const OrganizationEntity_1 = require("./entity/OrganizationEntity");
describe("github issues > #1703 Many to Many with association table returns odd values.", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work as expected", () => Promise.all(connections.map(async (connection) => {
        const user1 = new UserEntity_1.UserEntity();
        const user2 = new UserEntity_1.UserEntity();
        const user3 = new UserEntity_1.UserEntity();
        await connection.manager.save(user1);
        await connection.manager.save(user2);
        await connection.manager.save(user3);
        const organization1 = new OrganizationEntity_1.OrganizationEntity();
        const organization2 = new OrganizationEntity_1.OrganizationEntity();
        const organization3 = new OrganizationEntity_1.OrganizationEntity();
        await connection.manager.save(organization1);
        await connection.manager.save(organization2);
        await connection.manager.save(organization3);
        const userOrganization1 = new UserToOrganizationEntity_1.UserToOrganizationEntity();
        userOrganization1.role = "owner";
        userOrganization1.user = user1;
        userOrganization1.organization = organization1;
        await connection.manager.save(userOrganization1);
        const userOrganization2 = new UserToOrganizationEntity_1.UserToOrganizationEntity();
        userOrganization2.role = "owner";
        userOrganization2.user = user2;
        userOrganization2.organization = organization2;
        await connection.manager.save(userOrganization2);
        const userOrganization3 = new UserToOrganizationEntity_1.UserToOrganizationEntity();
        userOrganization3.role = "owner";
        userOrganization3.user = user2;
        userOrganization3.organization = organization3;
        await connection.manager.save(userOrganization3);
        await connection.manager
            .createQueryBuilder(OrganizationEntity_1.OrganizationEntity, "organization")
            .leftJoinAndSelect("organization.users", "users")
            .getMany();
        // console.log(organizations);
    })));
});
//# sourceMappingURL=issue-1703.js.map