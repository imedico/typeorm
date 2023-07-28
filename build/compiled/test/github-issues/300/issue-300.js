"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Race_1 = require("./entity/Race");
describe("github issues > #300 support of embeddeds that are not set", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("embedded with custom column name should persist and load without errors", () => Promise.all(connections.map(async (connection) => {
        const race = new Race_1.Race();
        race.name = "National Race";
        await connection.manager.save(race);
        const loadedRace = await connection.manager.findOneBy(Race_1.Race, {
            name: "National Race",
        });
        (0, chai_1.expect)(loadedRace).to.exist;
        (0, chai_1.expect)(loadedRace.id).to.exist;
        loadedRace.name.should.be.equal("National Race");
        (0, chai_1.expect)(loadedRace.duration).to.exist;
        (0, chai_1.expect)(loadedRace.duration.minutes).to.be.null;
        (0, chai_1.expect)(loadedRace.duration.hours).to.be.null;
        (0, chai_1.expect)(loadedRace.duration.days).to.be.null;
    })));
});
//# sourceMappingURL=issue-300.js.map