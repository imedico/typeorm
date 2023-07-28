"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("database schema > custom constraint names > index", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should set custom constraint names", () => Promise.all(dataSources.map(async (dataSource) => {
        let metadata = dataSource.getMetadata(Post_1.Post);
        const nameIndex = metadata.indices.find((it) => it.name === "IDX_NAME");
        const headerIndex = metadata.indices.find((it) => it.name === "IDX_HEADER");
        (0, chai_1.expect)(nameIndex).to.exist;
        (0, chai_1.expect)(headerIndex).to.exist;
    })));
    it("should load constraints with custom names", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        const nameIndex = table.indices.find((it) => it.name === "IDX_NAME");
        const headerIndex = table.indices.find((it) => it.name === "IDX_HEADER");
        (0, chai_1.expect)(nameIndex).to.exist;
        (0, chai_1.expect)(headerIndex).to.exist;
    })));
    it("should not change constraint names when table renamed", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.renameTable("post", "post_renamed");
        const table = await queryRunner.getTable("post_renamed");
        await queryRunner.release();
        const nameIndex = table.indices.find((it) => it.name === "IDX_NAME");
        const headerIndex = table.indices.find((it) => it.name === "IDX_HEADER");
        (0, chai_1.expect)(nameIndex).to.exist;
        (0, chai_1.expect)(headerIndex).to.exist;
    })));
    it("should not change constraint names when column renamed", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        let table = await queryRunner.getTable("post");
        const nameColumn = table.findColumnByName("name");
        const changedNameColumn = nameColumn.clone();
        changedNameColumn.name = "name_renamed";
        await queryRunner.changeColumns(table, [
            {
                oldColumn: nameColumn,
                newColumn: changedNameColumn,
            },
        ]);
        table = await queryRunner.getTable("post");
        await queryRunner.release();
        const nameIndex = table.indices.find((it) => it.name === "IDX_NAME");
        const headerIndex = table.indices.find((it) => it.name === "IDX_HEADER");
        (0, chai_1.expect)(nameIndex).to.exist;
        (0, chai_1.expect)(headerIndex).to.exist;
    })));
});
//# sourceMappingURL=index.js.map