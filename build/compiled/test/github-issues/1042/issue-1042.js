"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const Profile_1 = require("./entity/Profile");
const Information_1 = require("./entity/Information");
const chai_1 = require("chai");
describe("github issues > #1042 EntityMetadata.createPropertyPath does not work properly with objects inside entities (date, json, etc.)", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should update object columns fine, at the same time embedded should work properly", () => Promise.all(connections.map(async (connection) => {
        // create and save a new user
        const user = new User_1.User();
        user.name = "Timber Saw aka Lumberjack";
        user.registeredAt = new Date();
        user.profile = new Profile_1.Profile();
        user.profile.firstName = "Timber";
        user.profile.lastName = "Saw";
        user.profile.age = 25;
        user.information = new Information_1.Information();
        user.information.maritalStatus = "married";
        user.information.gender = "male";
        user.information.address = "Dostoevsky Street";
        await connection.manager.save(user);
        // load and check if saved user is correct
        const loadedUser = await connection.manager.findOne(User_1.User, {
            where: {
                id: 1,
            },
        });
        (0, chai_1.expect)(loadedUser).not.to.be.null;
        loadedUser.should.be.eql({
            id: 1,
            name: "Timber Saw aka Lumberjack",
            registeredAt: user.registeredAt,
            profile: {
                firstName: "Timber",
                lastName: "Saw",
                age: 25,
            },
            information: {
                maritalStatus: "married",
                gender: "male",
                address: "Dostoevsky Street",
            },
        });
        const updatedDate = new Date();
        updatedDate.setFullYear(2016, 1, 1);
        // update some of the user's properties (registration date)
        await connection
            .createQueryBuilder()
            .update(User_1.User)
            .set({
            registeredAt: updatedDate,
        })
            .where({
            id: 1,
        })
            .execute();
        // load and check again
        const loadedUser2 = await connection.manager.findOne(User_1.User, {
            where: {
                id: 1,
            },
        });
        (0, chai_1.expect)(loadedUser2).not.to.be.null;
        loadedUser2.should.be.eql({
            id: 1,
            name: "Timber Saw aka Lumberjack",
            registeredAt: updatedDate,
            profile: {
                firstName: "Timber",
                lastName: "Saw",
                age: 25,
            },
            information: {
                maritalStatus: "married",
                gender: "male",
                address: "Dostoevsky Street",
            },
        });
        // update some of the user's properties (json object)
        await connection
            .createQueryBuilder()
            .update(User_1.User)
            .set({
            profile: {
                firstName: "Lumber",
                lastName: "Jack",
                age: 26,
            },
        })
            .where({
            id: 1,
        })
            .execute();
        // load and check again
        const loadedUser3 = await connection.manager.findOne(User_1.User, {
            where: {
                id: 1,
            },
        });
        (0, chai_1.expect)(loadedUser3).not.to.be.null;
        loadedUser3.should.be.eql({
            id: 1,
            name: "Timber Saw aka Lumberjack",
            registeredAt: updatedDate,
            profile: {
                firstName: "Lumber",
                lastName: "Jack",
                age: 26,
            },
            information: {
                maritalStatus: "married",
                gender: "male",
                address: "Dostoevsky Street",
            },
        });
        // update some of the user's properties (embedded object)
        await connection
            .createQueryBuilder()
            .update(User_1.User)
            .set({
            information: {
                maritalStatus: "divorced",
                gender: "male",
                address: "Chehov Street",
            },
        })
            .where({
            id: 1,
        })
            .execute();
        // load and check again
        const loadedUser4 = await connection.manager.findOne(User_1.User, {
            where: {
                id: 1,
            },
        });
        (0, chai_1.expect)(loadedUser4).not.to.be.null;
        loadedUser4.should.be.eql({
            id: 1,
            name: "Timber Saw aka Lumberjack",
            registeredAt: updatedDate,
            profile: {
                firstName: "Lumber",
                lastName: "Jack",
                age: 26,
            },
            information: {
                maritalStatus: "divorced",
                gender: "male",
                address: "Chehov Street",
            },
        });
    })));
});
//# sourceMappingURL=issue-1042.js.map