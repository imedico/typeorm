"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("sqljs driver > save", () => {
    const pathToSqlite = path.resolve(__dirname, "export.sqlite");
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["sqljs"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should save to file", () => Promise.all(connections.map(async (dataSource) => {
        if (fs.existsSync(pathToSqlite)) {
            fs.unlinkSync(pathToSqlite);
        }
        let post = new Post_1.Post();
        post.title = "The second title";
        const repository = dataSource.getRepository(Post_1.Post);
        await repository.save(post);
        await dataSource.sqljsManager.saveDatabase(pathToSqlite);
        (0, chai_1.expect)(fs.existsSync(pathToSqlite)).to.be.true;
    })));
    it("should load a file that was saved", () => Promise.all(connections.map(async (dataSource) => {
        await dataSource.sqljsManager.loadDatabase(pathToSqlite);
        const repository = dataSource.getRepository(Post_1.Post);
        const post = await repository.findOneBy({
            title: "The second title",
        });
        (0, chai_1.expect)(post).not.to.be.null;
        if (post) {
            (0, chai_1.expect)(post.title).to.be.equal("The second title");
        }
    })));
});
//# sourceMappingURL=save.js.map