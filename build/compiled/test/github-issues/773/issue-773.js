"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
describe("github issues > #773 @PrimaryGeneratedColumn not returning auto generated id from oracle database", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["oracle"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return auto generated column", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.name = "My post";
        await connection.getRepository(Post_1.Post).save(post);
        (0, chai_1.expect)(post.id).to.be.not.undefined;
        (0, chai_1.expect)(post.createdDate).to.be.not.undefined;
        (0, chai_1.expect)(post.updatedDate).to.be.not.undefined;
    })));
});
//# sourceMappingURL=issue-773.js.map