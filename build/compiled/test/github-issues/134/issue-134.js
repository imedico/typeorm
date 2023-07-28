"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #134 Error TIME is converted to 'HH-mm' instead of 'HH:mm", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: [
            "mysql",
            "mariadb",
            "sqlite",
            "better-sqlite3",
            "mssql",
            "postgres",
        ], // Oracle does not support TIME data type.
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should successfully persist the post with creationDate in HH:mm and return persisted entity", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        const currentDate = new Date();
        post.title = "Hello Post #1";
        post.creationDate = currentDate;
        const savedPost = await postRepository.save(post);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .where("post.id=:id", { id: savedPost.id })
            .getOne();
        // create a correct minutes:hours:seconds string
        let hours = String(currentDate.getHours());
        let minutes = String(currentDate.getMinutes());
        let seconds = String(currentDate.getSeconds());
        hours = hours.length === 1 ? "0" + hours : hours;
        minutes = minutes.length === 1 ? "0" + minutes : minutes;
        seconds = seconds.length === 1 ? "0" + seconds : seconds;
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.creationDate.should.be.equal(hours + ":" + minutes + ":" + seconds);
    })));
});
//# sourceMappingURL=issue-134.js.map