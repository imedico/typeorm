"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Flight_1 = require("./entity/Flight");
const chai_1 = require("chai");
describe.skip("github issues > #838 Time zones for timestamp columns are incorrectly fetched and persisted in PostgreSQL", () => {
    let connections;
    let postgresConnection;
    const testDateString = "1989-08-16T10:00:00+03:00";
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
        });
        postgresConnection = connections.find((connection) => connection.driver.options.type === "postgres");
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return date & time stored in PostgreSQL database correctly", async () => {
        // await postgresConnection.query(`INSERT INTO "flight" ("id", "date") VALUES (1, '1989-08-16 14:00:00.000000 +03:00');`);
        // const results = await postgresConnection.query(`SELECT date FROM "flight" WHERE id = 1`);
        // console.log(results);
        await postgresConnection.query(`INSERT INTO "flight" ("id", "date") VALUES (1, '${testDateString}');`);
        const flight = await postgresConnection.manager.findOneBy(Flight_1.Flight, {
            id: 1,
        });
        (0, chai_1.expect)(flight.date.toISOString()).to.equal(new Date(testDateString).toISOString());
    });
    it("should persist date & time to the PostgreSQL database correctly", async () => {
        const testDate = new Date(testDateString);
        await postgresConnection.manager.save(new Flight_1.Flight(1, testDate));
        const results = await postgresConnection.query(`SELECT "date" FROM "flight" WHERE id = 1`);
        (0, chai_1.expect)(results[0].date.toISOString()).to.equal(testDate.toISOString());
    });
});
//# sourceMappingURL=issue-838.js.map