"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const UserEntity_1 = require("./entity/UserEntity");
describe("github issues > #5275 Enums with spaces are not converted properly.", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [UserEntity_1.User],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly parse enums of strings with spaces", () => Promise.all(connections.map(async (connection) => {
        const userRepository = connection.getRepository(UserEntity_1.User);
        await userRepository.save({
            id: 1,
            roles: [
                UserEntity_1.Role.GuildMaster,
                UserEntity_1.Role.Officer,
                UserEntity_1.Role.Boss,
                UserEntity_1.Role.Warrior,
                UserEntity_1.Role.Number,
                UserEntity_1.Role.PlayerAlt,
            ],
        });
        const user = await userRepository.findOneByOrFail({ id: 1 });
        user.roles.should.deep.equal([
            "Guild Master",
            "Officer",
            'BOSS "LEVEL 80"',
            "Knight\\Rogue",
            1,
            "Player Alt",
        ]);
    })));
    it("should correctly parse non-array enums with spaces", () => Promise.all(connections.map(async (connection) => {
        const userRepository = connection.getRepository(UserEntity_1.User);
        await userRepository.save([
            { id: 1 },
            { id: 2, role: UserEntity_1.Role.Boss },
            { id: 3, role: UserEntity_1.Role.Warrior },
        ]);
        const user1 = await userRepository.findOneByOrFail({ id: 1 });
        user1.role.should.equal("Guild Master");
        const user2 = await userRepository.findOneByOrFail({ id: 2 });
        user2.role.should.equal('BOSS "LEVEL 80"');
        const user3 = await userRepository.findOneByOrFail({ id: 3 });
        user3.role.should.equal("Knight\\Rogue");
    })));
});
//# sourceMappingURL=issue-5275.js.map