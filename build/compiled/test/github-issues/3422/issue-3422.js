"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
describe("github issues > #3422 cannot save to nested-tree table if schema is used in postgres", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not fail when using schema and nested-tree", () => Promise.all(connections.map(async (connection) => {
        await connection.query("CREATE SCHEMA IF NOT EXISTS admin");
        await connection.synchronize();
        const parent = new User_1.User();
        await connection.manager.save(parent);
        const child = new User_1.User();
        child.manager = parent;
        await connection.manager.save(child);
        const user = await connection.manager
            .getRepository(User_1.User)
            .findOne({
            where: {
                id: child.id,
            },
            relations: {
                manager: true,
            },
        });
        user.id.should.be.equal(child.id);
        user.manager.id.should.be.equal(parent.id);
    })));
});
//# sourceMappingURL=issue-3422.js.map