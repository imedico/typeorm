"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Company_1 = require("./entity/Company");
const Office_1 = require("./entity/Office");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("deferrable fk constraints should be check at the end of transaction (#2191)", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("use initially deferred deferrable fk constraints", () => Promise.all(connections.map(async (connection) => {
        await connection.manager.transaction(async (entityManager) => {
            // first save user
            const user = new User_1.User();
            user.id = 1;
            user.company = { id: 100 };
            user.name = "Bob";
            await entityManager.save(user);
            // then save company
            const company = new Company_1.Company();
            company.id = 100;
            company.name = "Acme";
            await entityManager.save(company);
        });
        // now check
        const user = await connection.manager.findOne(User_1.User, {
            relations: { company: true },
            where: { id: 1 },
        });
        (0, chai_1.expect)(user).not.to.be.null;
        user.should.be.eql({
            id: 1,
            name: "Bob",
            company: {
                id: 100,
                name: "Acme",
            },
        });
    })));
    it("use initially immediated deferrable fk constraints", () => Promise.all(connections.map(async (connection) => {
        await connection.manager.transaction(async (entityManager) => {
            // first set constraints deferred manually
            await entityManager.query("SET CONSTRAINTS ALL DEFERRED");
            // now save office
            const office = new Office_1.Office();
            office.id = 2;
            office.company = { id: 200 };
            office.name = "Barcelona";
            await entityManager.save(office);
            // then save company
            const company = new Company_1.Company();
            company.id = 200;
            company.name = "Emca";
            await entityManager.save(company);
        });
        // now check
        const office = await connection.manager.findOne(Office_1.Office, {
            relations: { company: true },
            where: { id: 2 },
        });
        (0, chai_1.expect)(office).not.to.be.null;
        office.should.be.eql({
            id: 2,
            name: "Barcelona",
            company: {
                id: 200,
                name: "Emca",
            },
        });
    })));
});
//# sourceMappingURL=deferrable.js.map