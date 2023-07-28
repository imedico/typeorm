"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const Company_1 = require("./entity/Company");
const User_1 = require("./entity/User");
describe("github issues > #5684 eager relation skips children relations", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.User, Company_1.Company],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should select children of an eager relation", () => Promise.all(connections.map(async (connection) => {
        const company = new Company_1.Company();
        company.name = "company";
        await connection.getRepository(Company_1.Company).save(company);
        const userAdmin = new User_1.User();
        userAdmin.name = "admin";
        userAdmin.company = company;
        await connection.getRepository(User_1.User).save(userAdmin);
        const userNormal = new User_1.User();
        userNormal.name = "normal";
        userNormal.company = company;
        await connection.getRepository(User_1.User).save(userNormal);
        company.admin = userAdmin;
        await connection.getRepository(Company_1.Company).save(company);
        const assert = (user) => {
            (0, chai_1.expect)(user && user.company && user.company.admin).to.be.a.instanceOf(User_1.User, "loads nested relation of an eager relation");
            (0, chai_1.expect)(user && user.company && user.company.staff).to.have.length(2, "loads nested relation of an eager relation");
            for (const member of (user && user.company.staff) || []) {
                (0, chai_1.expect)(member).to.be.a.instanceOf(User_1.User, "loads nested relation of an eager relation");
                (0, chai_1.expect)(member.company).to.be.a.instanceOf(Company_1.Company, "loads nested relation of an eager relation");
                (0, chai_1.expect)(member.company.admin).to.be.a.instanceOf(User_1.User, "loads nested relation of an eager relation");
                (0, chai_1.expect)(member.company.admin.company).to.be.a.instanceOf(Company_1.Company, "still loads an eager relation");
            }
        };
        const relations = {
            company: {
                admin: true,
                staff: {
                    company: {
                        admin: true,
                    },
                },
            },
            // "company.admin", // <-- can't be loaded without the fix.
            // "company.staff", // <-- can't be loaded without the fix.
            // "company.staff.company", // <-- can't be loaded without the fix.
            // "company.staff.company.admin", // <-- can't be loaded without the fix.
        };
        const user1 = await connection.getRepository(User_1.User).findOne({
            where: { id: userAdmin.id },
            relations: relations,
        });
        assert(user1);
        const user2 = await connection
            .getRepository(User_1.User)
            .findOneOrFail({
            where: { id: userAdmin.id },
            relations: relations,
        });
        assert(user2);
        const users3 = await connection.getRepository(User_1.User).find({
            where: {
                id: userAdmin.id,
            },
            relations: relations,
        });
        assert(users3.pop());
        const [users4] = await connection
            .getRepository(User_1.User)
            .findAndCount({
            where: {
                id: userAdmin.id,
            },
            relations: relations,
        });
        assert(users4.pop());
        const users5 = await connection.getRepository(User_1.User).find({
            where: {
                id: (0, src_1.In)([userAdmin.id]),
            },
            relations: relations,
        });
        assert(users5.pop());
    })));
});
//# sourceMappingURL=issue-5684.js.map