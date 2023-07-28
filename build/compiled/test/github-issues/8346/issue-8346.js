"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Customer_1 = require("./entity/Customer");
const CustomerContact_1 = require("./entity/CustomerContact");
describe("github issues > #8346 MySQL: Regression when using take, orderBy, and getMany on a joined relation", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return customers ordered by contacts", () => Promise.all(connections.map(async (connection) => {
        const [user1, user2] = await connection
            .getRepository(Customer_1.Customer)
            .save([{ name: "userA" }, { name: "userB" }]);
        await connection.getRepository(CustomerContact_1.CustomerContact).save([
            {
                firstName: "firstName1",
                lastName: "lastName1",
                customer: user1,
            },
            {
                firstName: "firstName2",
                lastName: "lastName2",
                customer: user2,
            },
        ]);
        const customerRepository = connection.getRepository(Customer_1.Customer);
        const results = await customerRepository
            .createQueryBuilder("customer")
            .leftJoinAndSelect("customer.contacts", "contacts")
            .take(10)
            .orderBy("contacts.firstName", "DESC")
            .getMany();
        (0, chai_1.expect)(results[0].id).to.equal(user2.id);
        (0, chai_1.expect)(results[1].id).to.equal(user1.id);
    })));
});
//# sourceMappingURL=issue-8346.js.map