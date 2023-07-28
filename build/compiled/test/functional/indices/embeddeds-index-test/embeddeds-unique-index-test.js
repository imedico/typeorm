"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Customer_1 = require("./entity/Customer");
const Profile_1 = require("./entity/Profile");
describe("indices > embeds index test", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("embeddeds index", function () {
        it("should work without errors", () => Promise.all(connections.map(async (connection) => {
            const customer = new Customer_1.Customer();
            customer.nameEnglish = "Umed";
            customer.nameHebrew = "Uma";
            customer.profile = new Profile_1.Profile();
            customer.profile.job = "Developer";
            customer.profile.address = "Anywhere";
            await connection.manager.save(customer);
        })));
    });
});
//# sourceMappingURL=embeddeds-unique-index-test.js.map