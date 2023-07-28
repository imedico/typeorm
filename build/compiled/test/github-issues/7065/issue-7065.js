"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const entity_1 = require("./entity");
// TODO:
//  this test doesn't work with relationLoadStrategy: "query" enabled, because there is a bug with RelationMetadata.
//  Due to how relations work (in this test we have one relation with a single target to "user" from Email or Phone)
//  it leads to a single relation inside RelationMetadata with a single target (Email or Phone), and leads to further issues.
//  to fix this bug we need to re-write current implementation which is hard to do at this moment.
describe("github issues > #7065 ChildEntity type relationship produces unexpected results", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [entity_1.Contact, entity_1.Email, entity_1.Phone, entity_1.User],
        schemaCreate: true,
        dropSchema: true,
        relationLoadStrategy: "join", // TODO: fix it later
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should join child entity with discriminator value condition", () => Promise.all(connections.map(async (connection) => {
        const userRepo = connection.getRepository(entity_1.User);
        const email = new entity_1.Email();
        email.value = "email";
        const phone = new entity_1.Phone();
        phone.value = "phone";
        const user = new entity_1.User();
        user.name = "Mike";
        user.emails = [email];
        user.phones = [phone];
        await userRepo.save(user);
        const result = await userRepo.findOne({
            where: {
                id: 1,
            },
            relations: { emails: true, phones: true },
        });
        (0, chai_1.expect)(result.emails.length).eq(1);
        (0, chai_1.expect)(result.emails[0].value).eq("email");
        (0, chai_1.expect)(result.phones.length).eq(1);
        (0, chai_1.expect)(result.phones[0].value).eq("phone");
    })));
});
//# sourceMappingURL=issue-7065.js.map