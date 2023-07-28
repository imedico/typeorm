"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #2651 set shouldn't have update statements twice when UpdateDate is in use", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should add and remove relations of an entity if given a mix of ids and objects", () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.title = "post #1";
        await connection.manager.save(post1);
        // within this issue update was failing
        await connection.manager.update(Post_1.Post, {
            id: 1,
        }, {
            title: "updated post",
            updatedAt: new Date(),
        });
        const loadedPost1 = await connection.manager.findOneByOrFail(Post_1.Post, { id: 1 });
        (0, chai_1.expect)(loadedPost1.title).to.be.eql("updated post");
    })));
});
//# sourceMappingURL=issue-2651.js.map