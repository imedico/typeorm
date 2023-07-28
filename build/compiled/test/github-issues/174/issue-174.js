"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Organisation_1 = require("./entity/Organisation");
const Contact_1 = require("./entity/Contact");
describe("github issues > #174 Embeded types confusing with order by", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should order organisations correctly when properties are duplicate in its embeddable", () => Promise.all(connections.map(async (connection) => {
        const organisation1 = new Organisation_1.Organisation();
        organisation1.name = "MilkyWay Co";
        organisation1.contact = new Contact_1.Contact();
        organisation1.contact.name = "Albert Cow";
        organisation1.contact.email = "ceo@mlkyway.com";
        await connection.manager.save(organisation1);
        const organisation2 = new Organisation_1.Organisation();
        organisation2.name = "ChockoWay";
        organisation2.contact = new Contact_1.Contact();
        organisation2.contact.name = "Brendan Late";
        organisation2.contact.email = "ceo@chockoway.com";
        await connection.manager.save(organisation2);
        const organisations = await connection
            .getRepository(Organisation_1.Organisation)
            .createQueryBuilder("organisation")
            .orderBy("organisation.name")
            .getMany();
        (0, chai_1.expect)(organisations).not.to.be.undefined;
        organisations.should.be.eql([
            {
                id: 2,
                name: "ChockoWay",
                contact: {
                    name: "Brendan Late",
                    email: "ceo@chockoway.com",
                },
            },
            {
                id: 1,
                name: "MilkyWay Co",
                contact: {
                    name: "Albert Cow",
                    email: "ceo@mlkyway.com",
                },
            },
        ]);
    })));
});
//# sourceMappingURL=issue-174.js.map