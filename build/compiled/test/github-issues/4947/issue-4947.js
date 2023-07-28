"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #4947 beforeUpdate subscriber entity argument is undefined", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("if entity has been updated via repository update(), subscriber should get passed entity to change", () => Promise.all(connections.map(async function (connection) {
        let repo = connection.getRepository(Post_1.Post);
        const newPost = new Post_1.Post();
        await repo.save(newPost);
        const createdPost = await repo.findOne({
            where: {
                id: newPost.id,
            },
        });
        // test that the newly inserted post was touched by beforeInsert PostSubscriber event
        (0, chai_1.expect)(createdPost).not.to.be.null;
        (0, chai_1.expect)(createdPost.title).to.equal("set in subscriber when created");
        // change the entity
        await repo.update(createdPost.id, { colToUpdate: 1 });
        const updatedPost = await repo.findOne({
            where: {
                id: createdPost.id,
            },
        });
        // test that the updated post was touched by beforeUpdate PostSubscriber event
        (0, chai_1.expect)(updatedPost).not.to.be.null;
        (0, chai_1.expect)(updatedPost.title).to.equal("set in subscriber when updated");
    })));
});
//# sourceMappingURL=issue-4947.js.map