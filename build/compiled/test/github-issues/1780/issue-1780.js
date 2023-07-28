"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("github issues > #1780 Support for insertion ignore on duplicate error", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.User],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    let user1 = new User_1.User();
    user1.first_name = "John";
    user1.last_name = "Lenon";
    user1.is_updated = "no";
    let user2 = new User_1.User();
    user2.first_name = "John";
    user2.last_name = "Lenon";
    user2.is_updated = "yes";
    // let data = [user1, user2];
    // Bulk insertion with duplicated data through same query with duplicate error exception is not supported in PostgreSQL
    // https://doxygen.postgresql.org/nodeModifyTable_8c_source.html : Line 1356
    it("should save one row without duplicate error in MySQL/MariaDB", () => Promise.all(connections.map(async (connection) => {
        try {
            if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
                const UserRepository = connection.manager.getRepository(User_1.User);
                // ignore while insertion duplicated row
                await UserRepository.createQueryBuilder()
                    .insert()
                    .orIgnore()
                    .into(User_1.User)
                    .values(user1)
                    .execute();
                await UserRepository.createQueryBuilder()
                    .insert()
                    .orIgnore()
                    .into(User_1.User)
                    .values(user2)
                    .execute();
                let loadedUser_1 = await UserRepository.find();
                (0, chai_1.expect)(loadedUser_1).not.to.be.eql([]);
                loadedUser_1.length.should.be.equal(1);
                // remove all rows
                await UserRepository.remove(loadedUser_1);
                let loadedUser_2 = await UserRepository.find();
                (0, chai_1.expect)(loadedUser_2).to.be.eql([]);
                // update while insertion duplicated row
                await UserRepository.createQueryBuilder()
                    .insert()
                    .orUpdate(["is_updated"])
                    .into(User_1.User)
                    .values(user1)
                    .execute();
                await UserRepository.createQueryBuilder()
                    .insert()
                    .orUpdate(["is_updated"])
                    .into(User_1.User)
                    .values(user2)
                    .execute();
                let loadedUser_3 = await UserRepository.find();
                (0, chai_1.expect)(loadedUser_3).not.to.be.eql([]);
                loadedUser_3.length.should.be.equal(1);
                (0, chai_1.expect)(loadedUser_3[0]).to.deep.include({
                    first_name: "John",
                    last_name: "Lenon",
                    is_updated: "yes",
                });
            }
        }
        catch (err) {
            throw new Error(err);
        }
    })));
    it("should save one row without duplicate error in PostgreSQL", () => Promise.all(connections.map(async (connection) => {
        try {
            if (connection.driver.options.type === "postgres") {
                const UserRepository = connection.manager.getRepository(User_1.User);
                // ignore while insertion duplicated row
                await UserRepository.createQueryBuilder()
                    .insert()
                    .orIgnore()
                    .into(User_1.User)
                    .values(user1)
                    .execute();
                await UserRepository.createQueryBuilder()
                    .insert()
                    .orIgnore()
                    .into(User_1.User)
                    .values(user2)
                    .execute();
                let loadedUser_1 = await UserRepository.find();
                (0, chai_1.expect)(loadedUser_1).not.to.be.eql([]);
                loadedUser_1.length.should.be.equal(1);
                // remove all rows
                await UserRepository.remove(loadedUser_1);
                let loadedUser_2 = await UserRepository.find();
                (0, chai_1.expect)(loadedUser_2).to.be.eql([]);
                // update while insertion duplicated row via unique columns
                await UserRepository.createQueryBuilder()
                    .insert()
                    .orUpdate(["is_updated"], ["first_name", "last_name"])
                    .into(User_1.User)
                    .values(user1)
                    .execute();
                await UserRepository.createQueryBuilder()
                    .insert()
                    .orUpdate(["is_updated"], ["first_name", "last_name"])
                    .into(User_1.User)
                    .values(user2)
                    .execute();
                let loadedUser_3 = await UserRepository.find();
                (0, chai_1.expect)(loadedUser_3).not.to.be.eql([]);
                loadedUser_3.length.should.be.equal(1);
                (0, chai_1.expect)(loadedUser_3[0]).to.deep.include({
                    first_name: "John",
                    last_name: "Lenon",
                    is_updated: "yes",
                });
                // create unique constraint
                await connection.manager.query('ALTER TABLE "user" ADD CONSTRAINT constraint_unique_idx UNIQUE USING INDEX unique_idx;');
                await UserRepository.remove(loadedUser_3);
                let loadedUser_4 = await UserRepository.find();
                (0, chai_1.expect)(loadedUser_4).to.be.eql([]);
                // update while insertion duplicated row via unique's constraint name
                await UserRepository.createQueryBuilder()
                    .insert()
                    .orUpdate(["is_updated"], "constraint_unique_idx")
                    .into(User_1.User)
                    .values(user1)
                    .execute();
                await UserRepository.createQueryBuilder()
                    .insert()
                    .orUpdate(["is_updated"], "constraint_unique_idx")
                    .setParameter("is_updated", user2.is_updated)
                    .into(User_1.User)
                    .values(user2)
                    .execute();
                let loadedUser_5 = await UserRepository.find();
                (0, chai_1.expect)(loadedUser_5).not.to.be.eql([]);
                loadedUser_5.length.should.be.equal(1);
                (0, chai_1.expect)(loadedUser_3[0]).to.deep.include({
                    first_name: "John",
                    last_name: "Lenon",
                    is_updated: "yes",
                });
            }
        }
        catch (err) {
            throw new Error(err);
        }
    })));
});
//# sourceMappingURL=issue-1780.js.map