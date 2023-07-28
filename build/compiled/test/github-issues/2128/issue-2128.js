"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
describe("github issues > #2128 skip preparePersistentValue for value functions", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres", "mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to resolve value functions", () => Promise.all(connections.map(async (connection) => {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values({
            title: "First Post",
            meta: {
                keywords: ["important", "fresh"],
            },
        })
            .execute();
        const metaAddition = JSON.stringify({
            author: "John Doe",
        });
        await connection
            .createQueryBuilder()
            .update(Post_1.Post)
            .set({
            meta: () => connection.driver.options.type === "postgres"
                ? `'${metaAddition}'::JSONB || meta::JSONB`
                : `JSON_MERGE('${metaAddition}', meta)`,
        })
            .where("title = :title", {
            title: "First Post",
        })
            .execute();
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOneBy({ title: "First Post" });
        (0, chai_1.expect)(loadedPost.meta).to.deep.equal({
            author: "John Doe",
            keywords: ["important", "fresh"],
        });
    })));
});
//# sourceMappingURL=issue-2128.js.map