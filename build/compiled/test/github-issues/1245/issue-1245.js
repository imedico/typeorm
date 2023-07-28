"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const src_1 = require("../../../src");
describe("github issues > #1245 `findByIds` ignores `FindManyOptions`", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should filter correctly using findByIds", () => Promise.all(connections.map(async (connection) => {
        let post1 = new Post_1.Post();
        post1.name = "some_name";
        let post2 = new Post_1.Post();
        post2.name = "some_name";
        let post3 = new Post_1.Post();
        post3.name = "other_name";
        await connection.manager.save([post1, post2, post3]);
        (0, chai_1.expect)(await connection.manager.findBy(Post_1.Post, {
            id: (0, src_1.In)([post2.id, post3.id]),
            name: "some_name",
        })).to.eql([post2]);
    })));
    it("should filter correctly using findByIds", () => Promise.all(connections.map(async (connection) => {
        let post1 = new Post_1.Post();
        post1.name = "some_name";
        let post2 = new Post_1.Post();
        post2.name = "some_name";
        let post3 = new Post_1.Post();
        post3.name = "other_name";
        await connection.manager.save([post1, post2, post3]);
        (0, chai_1.expect)(await connection.manager.findBy(Post_1.Post, {
            id: (0, src_1.In)([post2.id, post3.id]),
            name: "some_name",
        })).to.eql([post2]);
    })));
});
//# sourceMappingURL=issue-1245.js.map