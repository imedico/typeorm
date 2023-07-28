"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataSource_1 = require("../../../src/data-source/DataSource");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
function isMySql(v) {
    return v.type === "mysql";
}
describe("github issues > #4753 MySQL Replication Config broken", () => {
    let dataSources = [];
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should connect without error when using replication", async () => {
        const connectionOptions = (0, test_utils_1.getTypeOrmConfig)()
            .filter((v) => !v.skip)
            .find(isMySql);
        if (!connectionOptions) {
            // Skip if MySQL tests aren't enabled at all
            return;
        }
        const dataSource = new DataSource_1.DataSource({
            type: "mysql",
            replication: {
                master: {
                    host: connectionOptions.host,
                    username: connectionOptions.username,
                    password: connectionOptions.password,
                    database: connectionOptions.database,
                },
                slaves: [
                    {
                        host: connectionOptions.host,
                        username: connectionOptions.username,
                        password: connectionOptions.password,
                        database: connectionOptions.database,
                    },
                ],
            },
            entities: [User_1.User],
        });
        dataSources.push(dataSource);
        await dataSource.connect();
        dataSource.isInitialized.should.be.true;
    });
});
//# sourceMappingURL=issue-4753.js.map