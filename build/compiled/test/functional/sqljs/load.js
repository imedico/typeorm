"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const fs = tslib_1.__importStar(require("fs"));
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("sqljs driver > load", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["sqljs"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load from a file", () => Promise.all(connections.map(async (dataSource) => {
        await dataSource.sqljsManager.loadDatabase("test/functional/sqljs/sqlite/test.sqlite");
        const repository = dataSource.getRepository(Post_1.Post);
        const post = await repository.findOneBy({ title: "A post" });
        (0, chai_1.expect)(post).not.to.be.null;
        if (post) {
            (0, chai_1.expect)(post.title).to.be.equal("A post");
        }
        const exportedDatabase = dataSource.sqljsManager.exportDatabase();
        (0, chai_1.expect)(exportedDatabase).not.to.be.undefined;
        const originalFileContent = fs.readFileSync("test/functional/sqljs/sqlite/test.sqlite");
        (0, chai_1.expect)(exportedDatabase.length).to.equal(originalFileContent.length);
    })));
    it("should throw an error if the file doesn't exist", () => Promise.all(connections.map(async (dataSource) => {
        try {
            await dataSource.sqljsManager.loadDatabase("test/functional/sqljs/sqlite/test2.sqlite");
            (0, chai_1.expect)(true).to.be.false;
        }
        catch (error) {
            (0, chai_1.expect)(error.message.match(/File .* does not exist/) !== null).to.equal(true, "Should throw: File does not exist");
        }
    })));
});
//# sourceMappingURL=load.js.map