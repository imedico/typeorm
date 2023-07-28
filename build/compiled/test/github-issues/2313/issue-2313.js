"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const EntityNotFoundError_1 = require("../../../src/error/EntityNotFoundError");
describe("github issues > #2313 - BaseEntity has no findOneOrFail() method", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should find the appropriate record when one exists", async () => {
        // These must run sequentially as we have the global context of the `Post` ActiveRecord class
        for (const connection of connections) {
            Post_1.Post.useDataSource(connection); // change connection each time because of AR specifics
            const post1 = new Post_1.Post();
            post1.data = 123;
            await post1.save();
            const post2 = new Post_1.Post();
            post2.data = 456;
            await post2.save();
            const result1 = await Post_1.Post.findOneOrFail({
                where: {
                    id: 1,
                },
            });
            result1.data.should.be.eql(123);
            const result2 = await Post_1.Post.findOneOrFail({
                where: {
                    id: 2,
                },
            });
            result2.data.should.be.eql(456);
        }
    });
    it("should throw no matching record exists", async () => {
        // These must run sequentially as we have the global context of the `Post` ActiveRecord class
        for (const connection of connections) {
            Post_1.Post.useDataSource(connection); // change connection each time because of AR specifics
            try {
                await Post_1.Post.findOneByOrFail({ id: 100 });
                chai_1.expect.fail();
            }
            catch (e) {
                e.should.be.instanceOf(EntityNotFoundError_1.EntityNotFoundError);
            }
        }
    });
});
//# sourceMappingURL=issue-2313.js.map