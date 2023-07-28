"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const path = tslib_1.__importStar(require("path"));
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../utils/test-utils");
const PlatformTools_1 = require("../../../src/platform/PlatformTools");
describe("sqljs driver > startup", () => {
    let connections;
    const pathToSqlite = path.resolve(__dirname, "startup.sqlite");
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["sqljs"],
        driverSpecific: {
            autoSave: true,
            location: pathToSqlite,
        },
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should startup even if the file doesn't exist", () => Promise.all(connections.map(async (connection) => {
        // if we come this far, test was successful as a connection was established
        (0, chai_1.expect)(connection).to.not.be.null;
    })));
    it("should write a new file after first write operation", () => Promise.all(connections.map(async (connection) => {
        let post = new Post_1.Post();
        post.title = "The title";
        const repository = connection.getRepository(Post_1.Post);
        await repository.save(post);
        (0, chai_1.expect)(PlatformTools_1.PlatformTools.fileExist(pathToSqlite)).to.be.true;
    })));
});
//# sourceMappingURL=startup.js.map