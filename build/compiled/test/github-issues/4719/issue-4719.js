"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #4719 HStore with empty string values", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should handle HStore with empty string keys or values", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const postRepository = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.hstoreObj = {
            name: "Alice",
            surname: "A",
            age: 25,
            blank: "",
            "": "blank-key",
            '"': '"',
            foo: null,
        };
        const { id } = await postRepository.save(post);
        const loadedPost = await postRepository.findOneOrFail({
            where: {
                id: id,
            },
        });
        loadedPost.hstoreObj.should.be.deep.equal({
            name: "Alice",
            surname: "A",
            age: "25",
            blank: "",
            "": "blank-key",
            '"': '"',
            foo: null,
        });
        await queryRunner.release();
    })));
    it("should not allow 'hstore injection'", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const postRepository = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.hstoreObj = { username: `", admin=>"1`, admin: "0" };
        const { id } = await postRepository.save(post);
        const loadedPost = await postRepository.findOneOrFail({
            where: {
                id: id,
            },
        });
        loadedPost.hstoreObj.should.be.deep.equal({
            username: `", admin=>"1`,
            admin: "0",
        });
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-4719.js.map