"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
describe("github issues > #2131 InsertResult return the same primary key", () => {
    let connections;
    const posts = [
        {
            id: null,
            title: "Post 1",
        },
        {
            id: null,
            title: "Post 2",
        },
        {
            id: null,
            title: "Post 3",
        },
        {
            id: null,
            title: "Post 4",
        },
    ];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite", "mysql", "aurora-mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should get correct insert ids for multiple entities inserted", () => Promise.all(connections.map(async (connection) => {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values(posts)
            .execute();
        (0, chai_1.expect)(posts[0].id).to.equal(1);
        (0, chai_1.expect)(posts[1].id).to.equal(2);
        (0, chai_1.expect)(posts[2].id).to.equal(3);
        (0, chai_1.expect)(posts[3].id).to.equal(4);
    })));
});
//# sourceMappingURL=issue-2131.js.map