"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Player_1 = require("./entity/Player");
const Group_1 = require("./entity/Group");
describe("github issues > #401 special keywords should be escaped in join queries", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should escape 'group' keyword properly", () => Promise.all(connections.map(async (connection) => {
        const group = new Group_1.Group();
        group.name = "about players";
        await connection.manager.save(group);
        const player = new Player_1.Player();
        player.email = "player@gmail.com";
        player.group = group;
        await connection.manager.save(player);
        const loadedPlayer = await connection
            .getRepository(Player_1.Player)
            .createQueryBuilder("player")
            .leftJoinAndSelect("player.group", "group")
            .where("player.email = :email", {
            email: "player@gmail.com",
        })
            .getOne();
        (0, chai_1.expect)(loadedPlayer).to.be.eql({
            email: "player@gmail.com",
            group: {
                id: 1,
                name: "about players",
            },
        });
    })));
});
//# sourceMappingURL=issue-401.js.map