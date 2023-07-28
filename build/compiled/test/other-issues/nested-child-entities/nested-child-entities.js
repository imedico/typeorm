"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const TournamentGraph_1 = require("./entity/TournamentGraph");
const SquadBilliardsTournament_1 = require("./entity/SquadBilliardsTournament");
describe("other issues > using nested child entities", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert without error", () => Promise.all(connections.map(async (connection) => {
        const squadBilliardsTournament = new SquadBilliardsTournament_1.SquadBilliardsTournament({
            name: "Squad Tournament",
        });
        await connection.manager.save(squadBilliardsTournament);
        const tournamentGraph = new TournamentGraph_1.TournamentGraph();
        tournamentGraph.tournament = squadBilliardsTournament;
        await connection.manager.save(tournamentGraph);
    })));
});
//# sourceMappingURL=nested-child-entities.js.map