"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const UserProfile_1 = require("./entity/UserProfile");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("github issues > #8485 second migration is generated for a combination of PrimaryColumn and JoinColumn", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.User, UserProfile_1.UserProfile],
        enabledDrivers: ["mariadb", "mysql", "oracle", "postgres"],
        dropSchema: true,
        schemaCreate: false,
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should not create second migration", () => Promise.all(dataSources.map(async (dataSource) => {
        await dataSource.driver.createSchemaBuilder().build();
        const sqlInMemory = await dataSource.driver
            .createSchemaBuilder()
            .log();
        (0, chai_1.expect)(sqlInMemory.upQueries).to.be.empty;
        (0, chai_1.expect)(sqlInMemory.downQueries).to.be.empty;
    })));
});
//# sourceMappingURL=issue-8485.js.map