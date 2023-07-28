"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const Role_1 = require("./entity/Role");
const Event_1 = require("./entity/Event");
const EventRole_1 = require("./entity/EventRole");
// todo: fix later (refactor persistence)
describe.skip("github issues > #1926 Update fails for entity with compound relation-based primary key on OneToMany relationship", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("Should update OneToMany entity with compound relation-based primary key", () => Promise.all(connections.map(async (connection) => {
        let role = new Role_1.Role();
        role.title = "The Boss";
        role = await connection.manager.save(role);
        let event = new Event_1.Event();
        event.title = "The Big Event";
        let eventRole = new EventRole_1.EventRole();
        eventRole.description = "Be the boss";
        eventRole.compensation = "All the money!";
        eventRole.roleId = role.id;
        event.roles = [eventRole];
        event = await connection.manager.save(event);
        event.roles[0].description = "Be a good boss";
        // Fails with:
        // QueryFailedError: duplicate key value violates unique constraint "PK_..."
        await connection.manager.save(event);
    })));
});
//# sourceMappingURL=issue-1926.js.map