"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
// todo: fix this test
describe("github issues > #176 @CreateDateColumn and @UpdateDateColumn does not read back in UTC", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return dates in utc", () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.title = "Hello Post #1";
        post1.date = new Date(1484069886663); // stores "2017-01-10 17:38:06.000" into the database
        // post1.localDate = new Date(1484069886663); // stores "2017-01-10 22:38:06.000" into the database
        // persist
        await connection.manager.save(post1);
        const loadedPosts1 = await connection.manager.findOne(Post_1.Post, {
            where: { title: "Hello Post #1" },
        });
        (0, chai_1.expect)(loadedPosts1).not.to.be.null;
        // loadedPosts1!.date.toISOString().should.be.equal("2017-01-10T17:38:06.000Z");
        // loadedPosts1!.localDate.toISOString().should.be.equal("2017-01-10T17:38:06.000Z");
        // also make sure that local date really was saved as a local date (including timezone)
        // const rawPost = await connection.manager
        //     .createQueryBuilder(Post, "post")
        //     .where("post.title = :title", { title: "Hello Post #1" })
        //     .getRawOne();
        // const date = !(rawPost["post_date"] instanceof Date) ? new Date(rawPost["post_date"]) : rawPost["post_date"];
        // date.toISOString().should.be.equal("2017-01-10T12:38:06.000Z");
        // const localDate = !(rawPost["post_localDate"] instanceof Date) ? new Date(rawPost["post_localDate"]) : rawPost["post_localDate"];
        // localDate.toISOString().should.be.equal("2017-01-10T17:38:06.000Z");
    })));
});
//# sourceMappingURL=issue-176.js.map