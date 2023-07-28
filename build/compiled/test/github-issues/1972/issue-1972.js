"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
const TournamentUserParticipant_1 = require("./entity/TournamentUserParticipant");
const TournamentSquadParticipant_1 = require("./entity/TournamentSquadParticipant");
describe("github issues > #1972 STI problem - empty columns", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert with userId", () => Promise.all(connections.map(async (connection) => {
        // create user
        const user = new User_1.User({
            name: "test",
        });
        await connection.manager.save(user);
        // create user participant
        const tournamentUserParticipant = new TournamentUserParticipant_1.TournamentUserParticipant({
            user,
        });
        await connection.manager.save(tournamentUserParticipant);
        // find user participant in the DB
        const result = await connection.manager.findOneBy(TournamentUserParticipant_1.TournamentUserParticipant, { id: tournamentUserParticipant.id });
        if (result) {
            (0, chai_1.assert)(result.user instanceof User_1.User);
        }
    })));
    it("should insert with ownerId", () => Promise.all(connections.map(async (connection) => {
        // create user
        const user = new User_1.User({
            name: "test",
        });
        await connection.manager.save(user);
        // create tournament squad participant
        const tournamentSquadParticipant = new TournamentSquadParticipant_1.TournamentSquadParticipant({
            users: [user],
            owner: user,
        });
        await connection.manager.save(tournamentSquadParticipant);
        // find squad participant in the DB
        const result = await connection.manager.findOneBy(TournamentSquadParticipant_1.TournamentSquadParticipant, { id: tournamentSquadParticipant.id });
        if (result) {
            (0, chai_1.assert)(result.owner instanceof User_1.User);
        }
    })));
});
//# sourceMappingURL=issue-1972.js.map