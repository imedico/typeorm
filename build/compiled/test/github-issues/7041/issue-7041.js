"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const entity_1 = require("./entity");
describe("github issues > #7041 When requesting nested relations on foreign key primary entities, relation becomes empty entity rather than null", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [entity_1.Organization, entity_1.Admin, entity_1.User, entity_1.OrganizationMembership],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return null when requested nested relations are empty on OneToOne relation", () => Promise.all(connections.map(async (connection) => {
        const userRepo = connection.getRepository(entity_1.User);
        const testUser = new entity_1.User();
        testUser.randomField = "foo";
        await userRepo.save(testUser);
        const foundUser = await userRepo.findOne({
            where: {
                id: testUser.id,
            },
            relations: { admin: { organization: true } },
        });
        (0, chai_1.expect)(foundUser === null || foundUser === void 0 ? void 0 : foundUser.randomField).eq("foo");
        (0, chai_1.expect)(foundUser === null || foundUser === void 0 ? void 0 : foundUser.admin).eq(null);
    })));
    it("should return [] when requested nested relations are empty on OneToMany relation", () => Promise.all(connections.map(async (connection) => {
        const userRepo = connection.getRepository(entity_1.User);
        const testUser = new entity_1.User();
        testUser.randomField = "foo";
        await userRepo.save(testUser);
        const foundUser = await userRepo.findOne({
            where: {
                id: testUser.id,
            },
            relations: { membership: { organization: true } },
        });
        (0, chai_1.expect)(foundUser === null || foundUser === void 0 ? void 0 : foundUser.randomField).eq("foo");
        (0, chai_1.expect)(foundUser === null || foundUser === void 0 ? void 0 : foundUser.membership).eql([]);
    })));
});
//# sourceMappingURL=issue-7041.js.map