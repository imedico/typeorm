"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #922 Support HSTORE column type", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly implement HSTORE type", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const postRepository = connection.getRepository(Post_1.Post);
        const table = await queryRunner.getTable("post");
        const post = new Post_1.Post();
        post.hstoreObj = { name: "Alice", surname: "A", age: 25 };
        post.hstoreStr = "name => Bob, surname => B, age => 30";
        await postRepository.save(post);
        const loadedPost = await postRepository.findOneBy({
            id: 1,
        });
        loadedPost.hstoreObj.name.should.be.equal("Alice");
        loadedPost.hstoreObj.surname.should.be.equal("A");
        loadedPost.hstoreObj.age.should.be.equal("25");
        loadedPost.hstoreStr.should.be.equal(`"age"=>"30", "name"=>"Bob", "surname"=>"B"`);
        table
            .findColumnByName("hstoreObj")
            .type.should.be.equal("hstore");
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-922.js.map