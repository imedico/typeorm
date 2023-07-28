"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const Address_1 = require("./entities/Address");
const chai_1 = require("chai");
describe("github issues > #9664 add JsonContains operator ", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [Address_1.Address],
            enabledDrivers: ["postgres"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should find addresses in json field by name", async () => {
        await Promise.all(dataSources.map(async (dataSource) => {
            const address1 = new Address_1.Address();
            address1.country = {
                code: 1,
                name: "United States",
            };
            address1.city = {
                id: 1,
                name: "New York",
            };
            const address2 = new Address_1.Address();
            address2.country = {
                code: 2,
                name: "Germany",
            };
            address2.city = {
                id: 2,
                name: "Berlin",
            };
            await dataSource.manager.save([address1, address2]);
            const addressesByName = await dataSource.manager.find(Address_1.Address, {
                where: {
                    city: (0, src_1.JsonContains)({ name: "Berlin" }),
                },
            });
            const emptyAddressesResult = await dataSource.manager.find(Address_1.Address, {
                where: {
                    city: (0, src_1.JsonContains)({
                        name: "Berl",
                    }),
                },
            });
            // check than operator find correctl
            (0, chai_1.expect)(addressesByName).to.have.length(1);
            (0, chai_1.expect)(addressesByName.find((address) => address.city.name === "Berlin")).to.be.not.undefined;
            // check than operator find correctly empty result
            (0, chai_1.expect)(emptyAddressesResult).to.have.length(0);
        }));
    });
});
//# sourceMappingURL=issue-9664.js.map