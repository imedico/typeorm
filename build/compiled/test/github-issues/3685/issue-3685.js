"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const user_1 = require("./entity/user");
describe("github issues > #3685 Brackets syntax failed when use where with object literal", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        dropSchema: true,
        schemaCreate: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => connections && (0, test_utils_1.closeTestingConnections)(connections));
    it("should accept objects in .where method (github issue #3685)", () => Promise.all(connections.map(async (connection) => {
        await connection.manager.save(Object.assign(new user_1.User(), {
            firstName: "Jean",
            lastName: "Doe",
        }));
        await connection.manager.save(Object.assign(new user_1.User(), {
            firstName: "John",
            lastName: "Doe",
        }));
        await connection.manager.save(Object.assign(new user_1.User(), {
            firstName: "John",
            lastName: "Dupont",
        }));
        await connection.manager.save(Object.assign(new user_1.User(), {
            firstName: "Fred",
            lastName: "Doe",
        }));
        const qb = connection
            .createQueryBuilder(user_1.User, "u")
            .where(new src_1.Brackets((qb) => {
            qb.where({ firstName: "John" }).orWhere("u.firstName = :firstName", { firstName: "Jean" });
        }))
            .andWhere("u.lastName = :lastName", { lastName: "Doe" })
            .orderBy({
            "u.firstName": "ASC",
            "u.lastName": "ASC",
        });
        const results = await qb.getMany();
        (0, chai_1.expect)(results.length).to.equal(2);
        (0, chai_1.expect)(results[0].firstName).to.equal("Jean");
        (0, chai_1.expect)(results[0].lastName).to.equal("Doe");
        (0, chai_1.expect)(results[1].firstName).to.equal("John");
        (0, chai_1.expect)(results[1].lastName).to.equal("Doe");
    })));
});
//# sourceMappingURL=issue-3685.js.map