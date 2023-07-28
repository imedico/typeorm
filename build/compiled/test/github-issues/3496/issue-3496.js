"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #3496 jsonb comparison doesn't work", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("the entity should not be updated a second time", () => Promise.all(connections.map(async (connection) => {
        await connection.synchronize();
        const repository = connection.getRepository(Post_1.Post);
        const problems = [{ message: "", attributeKey: "", level: "" }];
        const post = new Post_1.Post();
        post.problems = problems.slice();
        const savedPost1 = await repository.save(post);
        const savedPost2 = await repository.save(repository.create({
            id: savedPost1.id,
            version: savedPost1.version,
            problems: problems.slice(),
        }));
        savedPost1.version.should.be.equal(savedPost2.version);
    })));
});
//# sourceMappingURL=issue-3496.js.map