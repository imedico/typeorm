"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../utils/test-setup");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("find options > opaque-types-over-primitives", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        __dirname,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    async function prepareData(dataSource) {
        const post1 = new Post_1.Post();
        post1.id = 1;
        post1.title = "Hello";
        post1.isEdited = true;
        await dataSource.manager.save(post1);
    }
    it("should work in select", () => Promise.all(dataSources.map(async (dataSource) => {
        await prepareData(dataSource);
        const posts1 = await dataSource
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            select: {
                id: true,
                title: true,
                isEdited: true,
            },
        })
            .getMany();
        posts1.should.be.eql([
            { id: 1, title: "Hello", isEdited: true },
        ]);
    })));
    it("should work in where", () => Promise.all(dataSources.map(async (dataSource) => {
        await prepareData(dataSource);
        const posts = await dataSource
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            where: {
                id: 1,
            },
        })
            .getMany();
        posts.should.be.eql([
            {
                id: 1,
                title: "Hello",
                isEdited: true,
            },
        ]);
    })));
    it("should work in order by", () => Promise.all(dataSources.map(async (dataSource) => {
        await prepareData(dataSource);
        const posts1 = await dataSource
            .createQueryBuilder(Post_1.Post, "post")
            .setFindOptions({
            order: {
                id: "asc",
                title: "asc",
                isEdited: "asc",
            },
        })
            .getMany();
        posts1.should.be.eql([
            {
                id: 1,
                title: "Hello",
                isEdited: true,
            },
        ]);
    })));
});
//# sourceMappingURL=find-options-opaque-types-over-primitives.js.map