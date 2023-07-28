"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src/");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
describe("github issues > #8393 When trying to update `update: false` column with `@UpdateDateColumn` the update column is updated", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not update the @UpdateDateColumn column when trying to update un-updatable column", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "Control flow based type analysis";
        post.readOnlyColumn = 1;
        await connection.manager.save(post);
        const updateResultPromise = connection.manager.update(Post_1.Post, post.id, {
            // Make a change to read only column
            readOnlyColumn: 2,
        });
        await (0, chai_1.expect)(updateResultPromise).to.be.rejectedWith(src_1.UpdateValuesMissingError);
        const updatedPost = await connection.manager.findOne(Post_1.Post, {
            where: {
                id: post.id,
            },
        });
        (0, chai_1.expect)(updatedPost).to.be.an("object");
        (0, chai_1.expect)(post.readOnlyColumn).to.be.equal(updatedPost.readOnlyColumn);
        // Gonna be false
        (0, chai_1.expect)(post.lastUpdated.toString()).to.be.eql(updatedPost.lastUpdated.toString());
    })));
});
//# sourceMappingURL=issue-8393.js.map