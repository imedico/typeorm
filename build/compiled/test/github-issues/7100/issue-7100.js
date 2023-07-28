"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #7100 MSSQL error when user requests additional columns to be returned", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["mssql"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return user requested columns", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "title";
        post.text = "text";
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values(post)
            .returning(["text"])
            .execute();
        // Locally we have forgotten what text was set to, must re-fetch
        post.text = "";
        await connection
            .createQueryBuilder(Post_1.Post, "post")
            .update()
            .set({ title: "TITLE" })
            .returning(["title", "text"])
            .whereEntity(post)
            .updateEntity(true)
            .execute();
        (0, chai_1.expect)(post.title).to.be.equal("TITLE");
        (0, chai_1.expect)(post.text).to.be.equal("text");
    })));
});
//# sourceMappingURL=issue-7100.js.map