"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const set_1 = require("./set");
describe("github issues > #2779 Could we add support for the MySQL/MariaDB SET data type?", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mariadb", "mysql"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create column with SET datatype", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        table.findColumnByName("roles").type.should.be.equal("set");
        await queryRunner.release();
    })));
    it("should persist and hydrate sets", () => Promise.all(connections.map(async (connection) => {
        const targetValue = [set_1.Role.Support, set_1.Role.Developer];
        const post = new Post_1.Post();
        post.roles = targetValue;
        await connection.manager.save(post);
        post.roles.should.be.deep.equal(targetValue);
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: post.id,
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.roles.should.be.deep.equal(targetValue);
    })));
});
//# sourceMappingURL=issue-2779.js.map