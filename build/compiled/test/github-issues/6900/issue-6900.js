"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const Warn_1 = require("./entity/Warn");
describe('github issues > #6900 MongoDB ConnectionManager doesn\'t select given database, creates new database "test" instead', () => {
    let connections = [];
    afterEach(async () => {
        await (0, test_utils_1.closeTestingConnections)(connections);
        connections.length = 0;
    });
    it("should connect to the expected database", async () => {
        const options = (0, test_utils_1.setupTestingConnections)({ enabledDrivers: ["mongodb"] });
        if (options.length === 0) {
            // Skip if we can't grab the mongodb
            return;
        }
        const host = options[0].host || "localhost";
        const dataSource = new src_1.DataSource({
            ...options[0],
            url: `mongodb://${host}`,
            database: "foo",
        });
        await dataSource.initialize();
        connections.push(dataSource);
        await (0, test_utils_1.reloadTestingDatabases)(connections);
        const mongoDriver = dataSource.driver;
        const client = mongoDriver.queryRunner
            .databaseConnection;
        (0, chai_1.expect)(client.db().databaseName).to.be.equal("foo");
        (0, chai_1.expect)(mongoDriver.database).to.be.equal("foo");
    });
    it("should write data to the correct database", async () => {
        const options = (0, test_utils_1.setupTestingConnections)({ enabledDrivers: ["mongodb"] });
        if (options.length === 0) {
            // Skip if we can't grab the mongodb
            return;
        }
        const host = options[0].host || "localhost";
        const dataSource = new src_1.DataSource({
            ...options[0],
            entities: [Warn_1.Warn],
            url: `mongodb://${host}`,
            database: "foo",
        });
        await dataSource.initialize();
        connections.push(dataSource);
        await (0, test_utils_1.reloadTestingDatabases)(connections);
        const repo = dataSource.getRepository(Warn_1.Warn);
        await repo.insert({
            id: Math.floor(Math.random() * 1000000),
            guild: "Hello",
            user: "WORLD",
            moderator: "Good Moderator",
            reason: "For Mongo not writing correctly to the databsae!",
            createdAt: new Date(),
        });
        const mongoDriver = dataSource.driver;
        const client = mongoDriver.queryRunner
            .databaseConnection;
        (0, chai_1.expect)(await client.db("foo").collection("warnings").count({})).to.be.greaterThan(0);
    });
});
//# sourceMappingURL=issue-6900.js.map