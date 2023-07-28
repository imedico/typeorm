"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #2809 afterUpdate subscriber entity argument is undefined", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("if entity has been updated via repository update(), subscriber should get passed entity to change", () => Promise.all(connections.map(async function (connection) {
        let repo = connection.getRepository(Post_1.Post);
        const insertPost = new Post_1.Post();
        await repo.save(insertPost);
        const createdPost = await repo.findOneBy({ id: insertPost.id });
        (0, chai_1.expect)(createdPost).not.to.be.null;
        const { id } = createdPost;
        // test that the in memory post was touched by afterInsert PostSubscriber event
        (0, chai_1.expect)(insertPost.title).to.equal("set in subscriber after created");
        const updatePost = { colToUpdate: 1 };
        // change the entity
        await repo.update(id, updatePost);
        // test that the in memory post was touched by afterUpdate PostSubscriber event
        (0, chai_1.expect)(updatePost.title).to.equal("set in subscriber after updated");
    })));
});
//# sourceMappingURL=issue-2809.js.map