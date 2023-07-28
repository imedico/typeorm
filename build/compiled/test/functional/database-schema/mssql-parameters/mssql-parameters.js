"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("database schema > mssql-parameters", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mssql"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly insert/update/delete entities on SqlServer driver", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post1 = new Post_1.Post();
        post1.id = 1;
        post1.name = "Post #1";
        post1.category = "posts";
        post1.text = "This is post";
        await postRepository.save(post1);
        let loadedPost1 = (await postRepository.findOneBy({ id: 1 }));
        loadedPost1.id.should.be.equal(post1.id);
        loadedPost1.name.should.be.equal(post1.name);
        loadedPost1.category.should.be.equal(post1.category);
        loadedPost1.text.should.be.equal(post1.text);
        loadedPost1.name = "Updated Post #1";
        loadedPost1.text = "This is updated post";
        await postRepository.save(loadedPost1);
        loadedPost1 = (await postRepository.findOneBy({ id: 1 }));
        loadedPost1.name.should.be.equal("Updated Post #1");
        loadedPost1.text.should.be.equal("This is updated post");
        await postRepository.remove(loadedPost1);
        loadedPost1 = (await postRepository.findOneBy({ id: 1 }));
        (0, chai_1.expect)(loadedPost1).to.not.exist;
        const post2 = new Post_1.Post();
        post2.id = 2;
        post2.name = "Post #2";
        post2.category = "posts";
        post2.text = "This is second post";
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values(post2)
            .execute();
        let loadedPost2 = (await postRepository.findOneBy({ id: 2 }));
        loadedPost2.id.should.be.equal(post2.id);
        loadedPost2.name.should.be.equal(post2.name);
        loadedPost2.category.should.be.equal(post2.category);
        loadedPost2.text.should.be.equal(post2.text);
        await connection
            .createQueryBuilder()
            .update(Post_1.Post)
            .set({ name: "Updated Post #2" })
            .where("id = :id", { id: 2 })
            .execute();
        loadedPost2 = (await postRepository.findOneBy({ id: 2 }));
        loadedPost2.name.should.be.equal("Updated Post #2");
        await connection
            .createQueryBuilder()
            .delete()
            .from(Post_1.Post)
            .where("id = :id", { id: "2" })
            .execute();
        loadedPost2 = (await postRepository.findOneBy({ id: 2 }));
        (0, chai_1.expect)(loadedPost2).to.not.exist;
    })));
});
//# sourceMappingURL=mssql-parameters.js.map