"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("github issues > #1680 Delete & Update applies to all entities in table if criteria is undefined or empty", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("Delete & Update should throw an error when supplied with an empty criteria", () => Promise.all(connections.map(async (connection) => {
        const userA = new User_1.User();
        userA.name = "User A";
        const userB = new User_1.User();
        userB.name = "User B";
        const userC = new User_1.User();
        userC.name = "User C";
        await connection.manager.save([userA, userB, userC]);
        const problematicCriterias = [null, undefined, [], ""];
        // Execute potentially problematic deletes
        for (const criteria of problematicCriterias) {
            let error = null;
            await connection.manager
                .delete(User_1.User, criteria)
                .catch((err) => (error = err));
            (0, chai_1.expect)(error).to.be.instanceof(Error);
        }
        // Execute potentially problematic updates
        for (const criteria of problematicCriterias) {
            let error = null;
            await connection.manager
                .update(User_1.User, criteria, {
                name: "Override Name",
            })
                .catch((err) => (error = err));
            (0, chai_1.expect)(error).to.be.instanceof(Error);
        }
        // Ensure normal deleting works
        await connection.manager.delete(User_1.User, 3);
        // Ensure normal updating works
        await connection.manager.update(User_1.User, 2, {
            name: "User B Updated",
        });
        // All users should still exist except for User C
        await connection.manager
            .find(User_1.User, { order: { id: "asc" } })
            .should.eventually.eql([
            {
                id: 1,
                name: "User A",
            },
            {
                id: 2,
                name: "User B Updated",
            },
        ]);
    })));
});
//# sourceMappingURL=issue-1680.js.map