"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const file_entity_1 = require("./entity/file.entity");
describe("github issues > #2518 TreeRepository.findDescendantsTree does not load descendants when relationship id property exist", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        // data type text isn't compatible with oracle
        enabledDrivers: [
            "postgres",
            "cockroachdb",
            "mariadb",
            "mssql",
            "mysql",
            "sqlite",
            "better-sqlite3",
            "sqljs",
        ],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load descendants when findDescendantsTree is called for a tree entity", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getTreeRepository(file_entity_1.File);
        const root = await repo.save({
            id: 1,
            name: "root",
        });
        const child = await repo.save({
            id: 2,
            name: "child",
            parent: root,
        });
        (0, chai_1.expect)(child.parentId).to.be.equal(1);
        const file = await repo
            .createQueryBuilder("file")
            .where("file.id = :id", { id: 1 })
            .getOne();
        await repo.findDescendantsTree(file);
        (0, chai_1.expect)(file.children.length).to.be.greaterThan(0);
    })));
    it("should load descendants when findTrees are called", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getTreeRepository(file_entity_1.File);
        const root = await repo.save({
            id: 1,
            name: "root",
        });
        const child = await repo.save({
            id: 2,
            name: "child",
            parent: root,
        });
        (0, chai_1.expect)(child.parentId).to.be.equal(1);
        const trees = await repo.findTrees();
        (0, chai_1.expect)(trees).to.be.an("array");
        (0, chai_1.expect)(trees[0].children.length).to.be.greaterThan(0);
    })));
});
//# sourceMappingURL=issue-2518.js.map