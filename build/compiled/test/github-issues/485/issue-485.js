"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #485 If I set the datatype of PrimaryGeneratedColumn to uuid then it is not giving the uuid to the column.", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist uuid correctly when it used as PrimaryGeneratedColumn type", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        const post = new Post_1.Post();
        const savedPost = await postRepository.save(post);
        const loadedPost = await postRepository.findOneBy({
            id: savedPost.id,
        });
        (0, chai_1.expect)(loadedPost).to.be.not.undefined;
        (0, chai_1.expect)(loadedPost.id).to.equal(savedPost.id);
        table.findColumnByName("id").type.should.be.equal("uuid");
    })));
});
//# sourceMappingURL=issue-485.js.map