"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Foo_1 = require("./entities/Foo");
const FooView_1 = require("./entities/FooView");
const customTypeormMetadataTableName = "custom_typeorm_metadata_table_name";
describe("github issues > #7266 rename table typeorm_metadata name.", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Foo_1.Foo, FooView_1.FooView],
        enabledDrivers: ["postgres", "mysql", "mariadb"],
        metadataTableName: customTypeormMetadataTableName,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create the typeorm metadata table with a custom name when provided", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        (0, chai_1.expect)(connection.metadataTableName).to.equal(customTypeormMetadataTableName);
        const hasCustomMetadataTableName = await queryRunner.hasTable(customTypeormMetadataTableName);
        (0, chai_1.expect)(hasCustomMetadataTableName).to.be.true;
        const hasDefaultMetadataTableName = await queryRunner.hasTable("typeorm_metadata");
        (0, chai_1.expect)(hasDefaultMetadataTableName).to.be.false;
        await queryRunner.release();
    })));
    it("should have correct views using the custom named metadata table", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const fooView = await queryRunner.getView("foo_view");
        (0, chai_1.expect)(fooView).to.be.exist;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-7266.js.map