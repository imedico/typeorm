"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const src_1 = require("../../../src");
const PostCategory_1 = require("./entity/PostCategory");
const IndexMetadata_1 = require("../../../src/metadata/IndexMetadata");
describe("github issues > #8459 Can not create indexes of materialized views", () => {
    const tableIndex = new src_1.TableIndex({
        columnNames: ["name"],
        name: "name-idx",
    });
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should create a materialized view index at runtime", () => Promise.all(dataSources.map(async (dataSource) => {
        const postgresQueryRunner = dataSource.createQueryRunner();
        const view = await postgresQueryRunner.getView("post_category");
        chai_1.assert.deepEqual(view.indices[0], tableIndex);
    })));
    it("should rename a materialized view unique index", () => Promise.all(dataSources.map(async (dataSource) => {
        const postCatMetadata = dataSource.getMetadata(PostCategory_1.PostCategory);
        postCatMetadata.indices[0].name = "renamed-ix";
        await dataSource.synchronize();
        const postgresQueryRunner = dataSource.createQueryRunner();
        const view = await postgresQueryRunner.getView("post_category");
        await postgresQueryRunner.release();
        const index = view.indices.find((i) => i.name === "renamed-ix");
        (0, chai_1.expect)(index).not.be.undefined;
    })));
    it("should delete a materialized view index", () => Promise.all(dataSources.map(async (dataSource) => {
        const postCatMetadata = dataSource.getMetadata(PostCategory_1.PostCategory);
        postCatMetadata.indices.splice(0, 1);
        await dataSource.synchronize();
        const postgresQueryRunner = dataSource.createQueryRunner();
        const view = await postgresQueryRunner.getView("post_category");
        await postgresQueryRunner.release();
        view.indices.length.should.be.equal(0);
    })));
    it("should create a materialized view index", () => Promise.all(dataSources.map(async (dataSource) => {
        const postCatMetadata = dataSource.getMetadata(PostCategory_1.PostCategory);
        const nameColumn = postCatMetadata.findColumnWithPropertyName("name");
        const indexMetadata = new IndexMetadata_1.IndexMetadata({
            entityMetadata: postCatMetadata,
            columns: [nameColumn],
            args: {
                target: PostCategory_1.PostCategory,
                synchronize: true,
                name: "name-ix",
            },
        });
        indexMetadata.build(dataSource.namingStrategy);
        postCatMetadata.indices.push(indexMetadata);
        await dataSource.synchronize();
        const postgresQueryRunner = dataSource.createQueryRunner();
        const view = await postgresQueryRunner.getView("post_category");
        await postgresQueryRunner.release();
        view.indices.length.should.be.equal(1);
        postCatMetadata.indices.splice(postCatMetadata.indices.indexOf(indexMetadata), 1);
    })));
    it("should create a materialized view unique index", () => Promise.all(dataSources.map(async (dataSource) => {
        const postCatMetadata = dataSource.getMetadata(PostCategory_1.PostCategory);
        const nameColumn = postCatMetadata.findColumnWithPropertyName("name");
        const indexMetadata = new IndexMetadata_1.IndexMetadata({
            entityMetadata: postCatMetadata,
            columns: [nameColumn],
            args: {
                target: PostCategory_1.PostCategory,
                synchronize: true,
                name: "name-ix",
                unique: true,
            },
        });
        indexMetadata.build(dataSource.namingStrategy);
        postCatMetadata.indices.push(indexMetadata);
        await dataSource.synchronize();
        const postgresQueryRunner = dataSource.createQueryRunner();
        const view = await postgresQueryRunner.getView("post_category");
        await postgresQueryRunner.release();
        const index = view.indices.find((i) => i.name === "name-ix");
        (0, chai_1.expect)(index === null || index === void 0 ? void 0 : index.isUnique).not.be.false;
        postCatMetadata.indices.splice(postCatMetadata.indices.indexOf(indexMetadata), 1);
    })));
});
//# sourceMappingURL=issue-8459.js.map