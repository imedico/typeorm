"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
describe("github issues > #9272 Fix select on deeply nested embedded entities, using Repository API", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: [
            "better-sqlite3",
            "cockroachdb",
            "mariadb",
            "mssql",
            "mysql",
            "oracle",
            "postgres",
            "spanner",
            "sqlite",
        ],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should be able to pass select options for deeply nested embedded entities", () => Promise.all(dataSources.map(async (dataSource) => {
        // Arrange
        const testUser = new User_1.User();
        testUser.firstName = "Timber";
        testUser.lastName = "Saw";
        testUser.age = 25;
        const latLong = new User_1.LatLong();
        latLong.latitude = -23;
        latLong.longitude = -46;
        const address = new User_1.Address();
        address.latLong = latLong;
        testUser.address = address;
        await dataSource.manager.save(User_1.User, testUser);
        // Act
        const usersWithLatitudeOnly = await dataSource.manager.find(User_1.User, {
            select: {
                id: true,
                address: {
                    latLong: {
                        latitude: true,
                    },
                },
            },
        });
        // Assert
        (0, chai_1.expect)(usersWithLatitudeOnly).to.have.length(1);
        const [user] = usersWithLatitudeOnly;
        user.should.haveOwnProperty("id");
        user.should.haveOwnProperty("address");
        user.should.not.haveOwnProperty("firstName");
        user.should.not.haveOwnProperty("lastName");
        user.should.not.haveOwnProperty("age");
        user.address.latLong.should.haveOwnProperty("latitude");
        user.address.latLong.should.not.haveOwnProperty("longitude");
        user.address.latLong.latitude.should.equal(-23);
    })));
});
//# sourceMappingURL=issue-9272.js.map