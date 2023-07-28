"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("github issues > #1200 Update multiple nested embeddeds", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should update all embedded entities including the nested ones", () => Promise.all(connections.map(async (connection) => {
        // create and save a new user
        const user = new User_1.User();
        user.userProperty = 1;
        user.group.groupNumber = 2;
        user.group.post.postNumber = 3;
        user.group.post.category.name = 4;
        user.post.postNumber = 5;
        user.post.category.name = 6;
        await connection.manager.save(user);
        // load and check if saved object is correct
        const user1 = await connection.manager.findOneBy(User_1.User, { id: 1 });
        (0, chai_1.expect)(user1).not.to.be.empty;
        user1.should.be.eql({
            id: 1,
            userProperty: 1,
            group: {
                groupNumber: 2,
                post: {
                    postNumber: 3,
                    category: {
                        name: 4,
                    },
                },
            },
            post: {
                postNumber: 5,
                category: {
                    name: 6,
                },
            },
        });
        // update object's properties
        await connection
            .createQueryBuilder()
            .update(User_1.User)
            .set({
            userProperty: 11,
            group: {
                groupNumber: 12,
                post: {
                    postNumber: 13,
                    category: {
                        name: 14,
                    },
                },
            },
            post: {
                postNumber: 15,
                category: {
                    name: 16,
                },
            },
        })
            .where({
            id: 1,
        })
            .execute();
        // load and check again
        const user2 = await connection.manager.findOneBy(User_1.User, { id: 1 });
        (0, chai_1.expect)(user2).not.to.be.empty;
        user2.should.be.eql({
            id: 1,
            userProperty: 11,
            group: {
                groupNumber: 12,
                post: {
                    postNumber: 13,
                    category: {
                        name: 14,
                    },
                },
            },
            post: {
                postNumber: 15,
                category: {
                    name: 16,
                },
            },
        });
    })));
});
//# sourceMappingURL=issue-1200.js.map