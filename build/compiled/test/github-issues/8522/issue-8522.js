"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const InternalUser_1 = require("./entity/InternalUser");
const InternalRole_1 = require("./entity/InternalRole");
const User_1 = require("./entity/User");
const Role_1 = require("./entity/Role");
const src_1 = require("../../../src");
const ClientRole_1 = require("./entity/ClientRole");
const mocha_1 = require("mocha");
describe("github issues > #8522 Single table inheritance returns the same discriminator value error for unrelated tables where their parents extend from the same entity", () => {
    let connections;
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    (0, mocha_1.afterEach)(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("Unrelated tables", () => {
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [
                src_1.BaseEntity,
                InternalUser_1.InternalUser,
                InternalRole_1.InternalRole,
                Role_1.Role,
                User_1.User,
            ],
            schemaCreate: true,
            dropSchema: true,
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        it("should loads internal user and internal role", () => Promise.all(connections.map(async (connection) => {
            const id = 1;
            const date = new Date();
            const firstName = "Jane";
            const lastName = "Walker";
            const name = "admin";
            const description = "All permissions";
            const internalUser = new InternalUser_1.InternalUser();
            internalUser.id = id;
            internalUser.firstName = firstName;
            internalUser.lastName = lastName;
            internalUser.createdAt = date;
            internalUser.updatedAt = date;
            await connection.manager.save(internalUser);
            const internalRole = new InternalRole_1.InternalRole();
            internalRole.id = id;
            internalRole.name = name;
            internalRole.description = description;
            internalRole.createdAt = date;
            internalRole.updatedAt = date;
            await connection.manager.save(internalRole);
            let users = await connection.manager
                .createQueryBuilder(User_1.User, "user")
                .getMany();
            (0, chai_1.expect)(users[0].id).to.be.equal(id);
            (0, chai_1.expect)(users[0].firstName).to.be.equal(firstName);
            (0, chai_1.expect)(users[0].lastName).to.be.equal(lastName);
            (0, chai_1.expect)(users[0].createdAt.should.be.instanceOf(Date));
            (0, chai_1.expect)(users[0].updatedAt.should.be.instanceOf(Date));
            let roles = await connection.manager
                .createQueryBuilder(Role_1.Role, "role")
                .getMany();
            (0, chai_1.expect)(roles[0].id).to.be.equal(id);
            (0, chai_1.expect)(roles[0].name).to.be.equal(name);
            (0, chai_1.expect)(roles[0].description).to.be.equal(description);
            (0, chai_1.expect)(roles[0].createdAt.should.be.instanceOf(Date));
            (0, chai_1.expect)(roles[0].updatedAt.should.be.instanceOf(Date));
        })));
    });
    describe("Related tables", () => {
        it("Should throw error when related tables have the same discriminator", async () => {
            await (0, test_utils_1.createTestingConnections)({
                entities: [src_1.BaseEntity, ClientRole_1.ClientRole, InternalRole_1.InternalRole, Role_1.Role, User_1.User],
                schemaCreate: true,
                dropSchema: true,
            }).should.be.rejectedWith(src_1.TypeORMError, `Entities ClientRole and InternalRole have the same discriminator values. Make sure they are different while using the @ChildEntity decorator.`);
        });
    });
});
//# sourceMappingURL=issue-8522.js.map