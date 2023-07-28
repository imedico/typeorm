"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
const Role_1 = require("./entity/Role");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #6265 `fix: resolve issue with find with relations returns soft-deleted entities", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [User_1.User, Role_1.Role],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should soft delete one record in relation table", () => Promise.all(connections.map(async (connection) => {
        const role = new Role_1.Role();
        role.title = "Manager";
        await connection.manager.save(role);
        const firstUser = new User_1.User();
        firstUser.name = "Alex Messer";
        firstUser.role = role;
        await connection.manager.save(firstUser);
        const secondUser = new User_1.User();
        secondUser.name = "Timber Saw";
        secondUser.role = role;
        await connection.manager.save(secondUser);
        const roleWithAllUser = await connection.manager
            .createQueryBuilder(Role_1.Role, "role")
            .leftJoinAndSelect("role.users", "users")
            .getMany();
        (0, chai_1.expect)(roleWithAllUser[0].users.length).eq(2);
        (0, chai_1.expect)(roleWithAllUser.should.be.eql([
            {
                id: 1,
                title: "Manager",
                deleteDate: null,
                users: [
                    { id: 1, name: "Alex Messer", deleteAt: null },
                    { id: 2, name: "Timber Saw", deleteAt: null },
                ],
            },
        ]));
        await connection.manager
            .createQueryBuilder(User_1.User, "user")
            .softDelete()
            .where({ name: "Timber Saw" })
            .execute();
        const roleWithUserIsNotSoftDelete = await connection.manager
            .createQueryBuilder(Role_1.Role, "role")
            .leftJoinAndSelect("role.users", "users")
            .getMany();
        (0, chai_1.expect)(roleWithUserIsNotSoftDelete[0].users.length).eq(1);
        (0, chai_1.expect)(roleWithUserIsNotSoftDelete.should.be.eql([
            {
                id: 1,
                title: "Manager",
                deleteDate: null,
                users: [
                    { id: 1, name: "Alex Messer", deleteAt: null },
                ],
            },
        ]));
        const roleWithUserSoftDelete = await connection.manager
            .createQueryBuilder(Role_1.Role, "role")
            .withDeleted()
            .leftJoinAndSelect("role.users", "users")
            .getMany();
        (0, chai_1.expect)(roleWithUserSoftDelete[0].users.length).eq(2);
        (0, chai_1.expect)(roleWithUserSoftDelete[0].users[1].deleteAt).to.be.not
            .null;
    })));
});
//# sourceMappingURL=issue-6265.js.map