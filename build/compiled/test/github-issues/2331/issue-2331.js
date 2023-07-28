"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const src_1 = require("../../../src");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #2331 undefined value is nulling column on update", () => {
    let dataSource;
    let repository;
    before(async () => {
        const options = (0, test_utils_1.setupSingleTestingConnection)("postgres", {
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
        if (!options)
            return;
        dataSource = new src_1.DataSource(options);
        await dataSource.initialize();
    });
    beforeEach(async () => {
        if (!dataSource)
            return;
        await (0, test_utils_1.reloadTestingDatabases)([dataSource]);
        repository = dataSource.getRepository(Post_1.Post);
    });
    after(() => (0, test_utils_1.closeTestingConnections)([dataSource]));
    it("should not overwrite column with null when passing undefined", async () => {
        if (!dataSource)
            return;
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Some post";
        post.author = "Some author";
        await repository.save(post);
        await repository.update({
            id: post.id,
        }, {
            title: "Updated post",
            author: undefined,
        });
        const postReloaded = await repository.findOne({
            where: { id: post.id },
        });
        (0, chai_1.expect)(postReloaded).to.exist;
        (0, chai_1.expect)(postReloaded.author).to.be.equal("Some author");
    });
});
//# sourceMappingURL=issue-2331.js.map