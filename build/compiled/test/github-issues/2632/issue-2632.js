"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const chai_1 = require("chai");
describe("github issues > #2632 createQueryBuilder relation remove works only if using ID", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should add and remove relations of an entity if given a mix of ids and objects", () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.title = "post #1";
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "post #2";
        await connection.manager.save(post2);
        const category1 = new Category_1.Category();
        category1.title = "category #1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.title = "category #2";
        await connection.manager.save(category2);
        await connection
            .createQueryBuilder()
            .relation(Post_1.Post, "categories")
            .of(post1)
            .add(1);
        let loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 1 },
            relations: { categories: true },
        });
        (0, chai_1.expect)(loadedPost1.categories).to.deep.include({
            id: 1,
            title: "category #1",
        });
        await connection
            .createQueryBuilder()
            .relation(Post_1.Post, "categories")
            .of(post1)
            .remove(1);
        loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 1 },
            relations: { categories: true },
        });
        (0, chai_1.expect)(loadedPost1.categories).to.be.eql([]);
        await connection
            .createQueryBuilder()
            .relation(Post_1.Post, "categories")
            .of(2)
            .add(category2);
        let loadedPost2 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { categories: true },
        });
        (0, chai_1.expect)(loadedPost2.categories).to.deep.include({
            id: 2,
            title: "category #2",
        });
        await connection
            .createQueryBuilder()
            .relation(Post_1.Post, "categories")
            .of(2)
            .remove(category2);
        loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { categories: true },
        });
        (0, chai_1.expect)(loadedPost1.categories).to.be.eql([]);
    })));
});
//# sourceMappingURL=issue-2632.js.map