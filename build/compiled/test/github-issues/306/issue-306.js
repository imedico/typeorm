"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Race_1 = require("./entity/Race");
const Duration_1 = require("./entity/Duration");
describe("github issues > #306 embeddeds with custom column name don't work", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("embedded with custom column name should persist and load without errors", () => Promise.all(connections.map(async (connection) => {
        const race = new Race_1.Race();
        race.name = "National Race";
        race.duration = new Duration_1.Duration();
        race.duration.durationDays = 1;
        race.duration.durationHours = 10;
        race.duration.durationMinutes = 30;
        await connection.manager.save(race);
        const loadedRace = await connection.manager.findOneBy(Race_1.Race, {
            name: "National Race",
        });
        (0, chai_1.expect)(loadedRace).to.be.not.undefined;
        (0, chai_1.expect)(loadedRace.id).to.be.not.undefined;
        (0, chai_1.expect)(loadedRace.duration).to.be.not.undefined;
        loadedRace.name.should.be.equal("National Race");
        loadedRace.duration.should.be.instanceOf(Duration_1.Duration);
        loadedRace.duration.durationDays.should.be.equal(1);
        loadedRace.duration.durationHours.should.be.equal(10);
        loadedRace.duration.durationMinutes.should.be.equal(30);
    })));
});
//# sourceMappingURL=issue-306.js.map