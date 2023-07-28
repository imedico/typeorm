"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("benchmark > bulk-sql-build", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            __dirname,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    /**
     * Before optimization (<0.3.12) execution time for 10.000 sqls was ~1.8s
     * After optimization execution time for 10.000 sqls become ~0.380s
     */
    it("testing bulk create of 10.000 sql with joins", () => Promise.all(dataSources.map(async (dataSource) => {
        for (let i = 0; i < 10000; i++) {
            dataSource
                .getRepository(Post_1.Post)
                .createQueryBuilder("post")
                .leftJoinAndSelect("post.categories", "categories1")
                .leftJoinAndSelect("post.categories", "categories2")
                .leftJoinAndSelect("post.categories", "categories3")
                .leftJoinAndSelect("post.categories", "categories4")
                .leftJoinAndSelect("post.categories", "categories5")
                .leftJoinAndSelect("post.categories", "categories6")
                .leftJoinAndSelect("post.categories", "categories7")
                .where("post.id = 1")
                .getQuery();
        }
    })));
});
//# sourceMappingURL=bulk-sql-build.js.map