"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Game_1 = require("./entity/Game");
const Platform_1 = require("./entity/Platform");
const chai_1 = require("chai");
describe("github issues > #163 ManyToMany relation : Cannot read property 'joinColumnName' of undefined", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist class table child successfully", () => Promise.all(connections.map(async (connection) => {
        let battlefront = new Game_1.Game();
        battlefront.name = "SW Battlefront";
        battlefront.searchTerms = "star-wars,arcade";
        battlefront.isReviewed = false;
        let republicCommando = new Game_1.Game();
        republicCommando.name = "SW Republic Commando";
        republicCommando.searchTerms = "star-wars,shooter";
        republicCommando.isReviewed = false;
        await connection.manager.save(battlefront);
        await connection.manager.save(republicCommando);
        const platform = new Platform_1.Platform();
        platform.name = "Windows";
        platform.slug = "windows";
        platform.games = [battlefront, republicCommando];
        await connection.manager.save(platform);
        const loadedPlatform = await connection
            .getRepository(Platform_1.Platform)
            .findOne({ where: { slug: "windows" } });
        let jediAcademy = new Game_1.Game();
        jediAcademy.name = "SW Jedi Academy";
        jediAcademy.searchTerms = "star-wars,arcade";
        jediAcademy.platforms = [loadedPlatform];
        jediAcademy.isReviewed = false;
        await connection.manager.save(jediAcademy);
        const completePlatform = await connection
            .getRepository(Platform_1.Platform)
            .createQueryBuilder("platform")
            .leftJoinAndSelect("platform.games", "game")
            .where("platform.slug=:slug", { slug: "windows" })
            .orderBy("platform.id")
            .addOrderBy("game.id")
            .getOne();
        (0, chai_1.expect)(completePlatform).not.to.be.null;
        completePlatform.should.be.eql({
            id: platform.id,
            name: "Windows",
            slug: "windows",
            games: [
                {
                    id: battlefront.id,
                    name: "SW Battlefront",
                    searchTerms: "star-wars,arcade",
                    isReviewed: false,
                },
                {
                    id: republicCommando.id,
                    name: "SW Republic Commando",
                    searchTerms: "star-wars,shooter",
                    isReviewed: false,
                },
                {
                    id: jediAcademy.id,
                    name: "SW Jedi Academy",
                    searchTerms: "star-wars,arcade",
                    isReviewed: false,
                },
            ],
        });
        // what code shall I put there to completely reproduce your issue?
    })));
});
//# sourceMappingURL=issue-163.js.map